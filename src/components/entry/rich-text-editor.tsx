"use client";

import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import { Markdown } from "tiptap-markdown"; // Corregido: importación con llaves
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  LinkIcon,
  Eye,
  Edit,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

// Extensión personalizada para manejar mejor las listas
const CustomKeymap = () => {
  return {
    name: "customKeymap",
    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          // Si estamos en una lista vacía, salir de ella
          if (editor.isActive("listItem") && editor.state.selection.empty) {
            const { $from } = editor.state.selection;
            const node = $from.node();

            // Si el nodo está vacío, salir de la lista
            if (node.content.size === 0) {
              return editor.commands.liftListItem("listItem");
            }
          }

          // Comportamiento normal para Enter
          return false;
        },
      };
    },
  };
};

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  markdownMode?: boolean; // Nuevo prop para indicar si queremos guardar en Markdown
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Escribe aquí...",
  className,
  minHeight = "200px",
  markdownMode = true, // Por defecto, usamos modo Markdown
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkPopover, setShowLinkPopover] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-primary underline underline-offset-2 hover:text-primary/80",
        },
        validate: (href) =>
          /^https?:\/\//.test(href) ||
          href.startsWith("/") ||
          href.startsWith("#"),
      }),
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
      }),
      // Añadimos la extensión de Markdown
      Markdown.configure({
        html: false,
        tightLists: true,
        bulletListMarker: "-",
        linkify: true,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      // Si estamos en modo Markdown, guardamos el contenido como Markdown
      if (markdownMode) {
        const markdown = editor.storage.markdown.getMarkdown();
        onChange(markdown);
      } else {
        // Si no, guardamos como HTML (comportamiento anterior)
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: "outline-none w-full text-base leading-relaxed",
      },
      handleKeyDown: (view, event) => {
        // Mejorar el manejo de espacios
        if (event.key === " " && event.repeat) {
          return true; // Prevenir espacios repetidos
        }
        return false;
      },
    },
    enableInputRules: true,
    enablePasteRules: true,
  });

  // Sincronizar el valor externo con el editor
  useEffect(() => {
    if (editor && value !== undefined) {
      // Si el editor ya tiene el mismo contenido, no hacemos nada
      if (markdownMode) {
        const currentMarkdown = editor.storage.markdown?.getMarkdown() || "";
        if (currentMarkdown !== value) {
          // Establecemos el contenido como Markdown
          editor.commands.setContent(value, true); // true para indicar que es Markdown
        }
      } else {
        // Comportamiento anterior para HTML
        if (editor.getHTML() !== value) {
          editor.commands.setContent(value || "<p></p>");
        }
      }
    }
  }, [editor, value, markdownMode]);

  // Función para agregar un enlace
  const addLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl) {
      // Si la URL no tiene protocolo, añadir https://
      const url = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`;

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }

    setLinkUrl("");
    setShowLinkPopover(false);
  }, [editor, linkUrl]);

  // Función para salir de una lista
  const exitList = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().liftListItem("listItem").run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "edit" | "preview")}
      >
        <div className="flex items-center justify-between border-b p-1 bg-muted/20">
          {/* Pestañas de edición/vista previa */}
          <TabsList className="grid grid-cols-2 w-20 bg-transparent">
            <TabsTrigger
              value="edit"
              className="flex items-center justify-center"
            >
              <Edit className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="flex items-center justify-center"
            >
              <Eye className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          {/* Barra de herramientas */}
          {activeTab === "edit" && (
            <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-thin">
              <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                aria-label="Negrita"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                aria-label="Cursiva"
              >
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("underline")}
                onPressedChange={() =>
                  editor.chain().focus().toggleUnderline().run()
                }
                aria-label="Subrayado"
              >
                <UnderlineIcon className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                aria-label="Título 1"
              >
                <Heading1 className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                aria-label="Título 2"
              >
                <Heading2 className="h-4 w-4" />
              </Toggle>
              <div className="flex items-center">
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bulletList")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  aria-label="Lista"
                >
                  <List className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("orderedList")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  aria-label="Lista numerada"
                >
                  <ListOrdered className="h-4 w-4" />
                </Toggle>
              </div>
              <Toggle
                size="sm"
                pressed={editor.isActive("blockquote")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBlockquote().run()
                }
                aria-label="Cita"
              >
                <Quote className="h-4 w-4" />
              </Toggle>
              <div className="flex items-center">
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "left" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  aria-label="Alinear a la izquierda"
                >
                  <AlignLeft className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "center" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  aria-label="Centrar"
                >
                  <AlignCenter className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "right" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  aria-label="Alinear a la derecha"
                >
                  <AlignRight className="h-4 w-4" />
                </Toggle>
              </div>
              <Popover open={showLinkPopover} onOpenChange={setShowLinkPopover}>
                <PopoverTrigger asChild>
                  <Toggle
                    size="sm"
                    pressed={editor.isActive("link")}
                    onPressedChange={() => {
                      if (editor.isActive("link")) {
                        editor.chain().focus().unsetLink().run();
                      } else {
                        setShowLinkPopover(true);
                        setLinkUrl(
                          editor.isActive("link")
                            ? editor.getAttributes("link").href
                            : ""
                        );
                      }
                    }}
                    aria-label="Enlace"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Toggle>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Insertar enlace</h4>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://ejemplo.com"
                        className="flex-1"
                      />
                      <Button size="sm" onClick={addLink}>
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <div className="border-l h-6 mx-1" />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="px-2"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="px-2"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="edit" className="p-0 mt-0">
          <div
            className="p-4 prose prose-sm dark:prose-invert max-w-none"
            style={{ minHeight }}
          >
            <EditorContent
              editor={editor}
              className="w-full focus:outline-none min-h-full"
            />
          </div>
        </TabsContent>
        <TabsContent value="preview" className="p-0 mt-0">
          <div
            className={cn(
              "p-4 prose prose-base dark:prose-invert max-w-none",
              "prose-headings:mt-4 prose-headings:mb-2",
              "prose-p:my-2 prose-p:text-base",
              "prose-ul:my-2 prose-ol:my-2",
              "prose-blockquote:my-2 prose-blockquote:pl-4 prose-blockquote:border-l-2 prose-blockquote:border-muted-foreground/30 prose-blockquote:italic"
            )}
            style={{ minHeight }}
          >
            {/* En la vista previa, mostramos el contenido renderizado */}
            <EditorContent
              editor={editor}
              className="w-full focus:outline-none min-h-full"
              editable={false}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Menú flotante */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center rounded-md border bg-background shadow-md">
            <Toggle
              size="sm"
              pressed={editor.isActive("bold")}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
              className="rounded-none"
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("italic")}
              onPressedChange={() =>
                editor.chain().focus().toggleItalic().run()
              }
              className="rounded-none"
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("underline")}
              onPressedChange={() =>
                editor.chain().focus().toggleUnderline().run()
              }
              className="rounded-none"
            >
              <UnderlineIcon className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("link")}
              onPressedChange={() => {
                if (editor.isActive("link")) {
                  editor.chain().focus().unsetLink().run();
                } else {
                  setShowLinkPopover(true);
                  setLinkUrl(
                    editor.isActive("link")
                      ? editor.getAttributes("link").href
                      : ""
                  );
                }
              }}
              className="rounded-none"
            >
              <LinkIcon className="h-4 w-4" />
            </Toggle>
          </div>
        </BubbleMenu>
      )}
    </div>
  );
}
