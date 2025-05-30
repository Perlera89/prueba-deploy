import { useState } from "react";
import { Camera, Upload, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/initials";

interface ChangeImageProps {
  currentImage?: string;
  userName: string;
  onImageUpdated?: () => void;
}

export default function ChangeImageDialog({
  currentImage,
  userName,
}: ChangeImageProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setImageUrl("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
          title="Cambiar foto de perfil"
        >
          <Camera className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar foto de perfil</DialogTitle>
          <DialogDescription>
            Selecciona una imagen desde tu dispositivo o proporciona una URL.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center my-4">
          <Avatar className="h-24 w-24">
            {previewUrl || (activeTab === "url" && imageUrl) ? (
              <AvatarImage src={previewUrl || imageUrl} alt="Vista previa" />
            ) : currentImage ? (
              <AvatarImage src={currentImage} alt={userName} />
            ) : (
              <AvatarFallback className="text-lg">
                {getInitials(userName)}
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        <Tabs
          defaultValue="upload"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Subir imagen
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center">
              <LinkIcon className="mr-2 h-4 w-4" />
              URL de imagen
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="picture">Seleccionar archivo</Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <p className="text-xs text-muted-foreground">
                Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="url" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="image-url">URL de imagen</Label>
              <Input
                id="image-url"
                placeholder="https://ejemplo.com/mi-imagen.jpg"
                value={imageUrl}
                onChange={handleUrlChange}
              />
              <p className="text-xs text-muted-foreground">
                Introduce la dirección web donde se encuentra tu imagen.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleSave}
            disabled={
              isSubmitting ||
              (activeTab === "upload" && !selectedFile) ||
              (activeTab === "url" && !imageUrl)
            }
          >
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
