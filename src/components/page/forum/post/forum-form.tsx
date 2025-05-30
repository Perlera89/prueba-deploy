// components/forum/NewDiscussionDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/entry/rich-text-editor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PostForm, postSchema } from "@/schema/post";
import { CustomSelect, Option } from "../../../entry/custom-selected";
import {
  useDeleteCategoryPost,
  useSaveCategoryPost,
} from "@/hooks/forum/use-category-post";
import { Loader2 } from "lucide-react";
import { usePostStore } from "@/store/post";
import { useModuleStore } from "@/store/module";

interface NewDiscussionDialogProps {
  initialValues?: PostForm;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: PostForm) => Promise<void>;
}
export function NewDiscussionDialog({
  initialValues,
  open,
  onOpenChange,
  onSubmit,
}: NewDiscussionDialogProps) {
  const { categories, saveCategory } = usePostStore();
  const moduleId = useModuleStore((state) => state.module.id);
  const useCreateCategoryPostMutation = useSaveCategoryPost(saveCategory);

  const form = useForm<PostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      categoryId: initialValues?.categoryId,
    },
  });

  const useDeleteCategoryMutation = useDeleteCategoryPost(moduleId);

  const handleCreateCategory = async (name: string) => {
    await useCreateCategoryPostMutation.mutateAsync({
      name,
      moduleId,
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    useDeleteCategoryMutation.mutateAsync({ categoryId });
  };

  const handleSubmit = async (values: PostForm) => {
    await onSubmit(values);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] w-[90vw]">
        <DialogHeader>
          <DialogTitle>Crear nueva discusión</DialogTitle>
          <DialogDescription>
            Comparte tus dudas o ideas con tus alumnos de curso.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 py-4"
          >
            {/* Campo Título */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Título descriptivo de tu discusión"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Categoría */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>

                  <FormControl>
                    <CustomSelect
                      placeholder="Selecciona una categoría"
                      initialOptions={categories.map((category) => ({
                        label: category.name || "",
                        value: category.id || "",
                      }))}
                      onchange={(value: Option) => {
                        field.onChange(value.value);
                      }}
                      initialValue={initialValues?.categoryId}
                      onCreate={handleCreateCategory}
                      ondelete={handleDeleteCategory}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Contenido */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido</FormLabel>
                  <FormControl>
                    <div
                      className="rich-editor-container"
                      style={{ minHeight: "180px", maxHeight: "300px" }}
                    >
                      <RichTextEditor
                        placeholder="Escribe el contenido de tu discusión aquí..."
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-2 pt-2 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                }}
                disabled={form.formState.isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publicando...
                  </>
                ) : (
                  "Publicar discusión"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
