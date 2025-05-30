import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
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
import {
  AnnouncementFormData,
  announcementFormSchema,
} from "@/schema/announcement";
import { useSaveAnnouncement } from "@/hooks/use-announcement";
import { useModuleStore } from "@/store/module";
import { useAnnouncementStore } from "@/store/announcement";
import SubmitButton from "@/components/entry/button-submit";
import { AnnouncementPriority } from "@/types";

interface AnnouncementProps {
  onSubmit: (data: AnnouncementFormData) => void;
}

export default function AddAnnouncementDialog({ onSubmit }: AnnouncementProps) {
  const {
    isAddAnnouncementDialogOpen,
    setIsAddAnnouncementDialogOpen,
    announcement,
  } = useAnnouncementStore();

  const form = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: announcement,
  });

  const { selectedModuleId } = useModuleStore();

  const isSubmiting = form.formState.isSubmitting;

  return (
    <Dialog
      open={isAddAnnouncementDialogOpen}
      onOpenChange={setIsAddAnnouncementDialogOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Crear Anuncio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Anuncio</DialogTitle>
          <DialogDescription>
            Publique un anuncio para todos los estudiantes del curso.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="announcement-title">Título</FormLabel>
                  <FormControl>
                    <Input
                      id="announcement-title"
                      placeholder="Ej: Cambio en la fecha de entrega"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="announcement-content">
                    Contenido
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="announcement-content"
                      placeholder="Escriba el contenido del anuncio..."
                      maxLength={1000}
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="announcement-importance">
                    Importancia
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger id="announcement-importance">
                        <SelectValue placeholder="Seleccionar nivel de importancia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={AnnouncementPriority.INFORMATION}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                            <span>Información</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={AnnouncementPriority.LOW}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                            <span>Baja</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={AnnouncementPriority.MEDIUM}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400" />
                            <span>Normal</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={AnnouncementPriority.HIGH}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>Alta</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={AnnouncementPriority.URGENT}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span>Urgente</span>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddAnnouncementDialogOpen(false)}
              >
                Cancelar
              </Button>
              <SubmitButton
                title="Publicar Anuncio"
                isSubmiting={isSubmiting}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
