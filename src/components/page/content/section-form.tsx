import { DatePickerWithRange } from "@/components/entry/date-picker-range";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sectionSchema, SectionFormData } from "@/schema/section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSaveSection } from "@/hooks/use-section";
import { useCourseStore } from "@/store/course";
import { useSectionStore } from "@/store/section";
import { useEffect } from "react";
import SubmitButton from "@/components/entry/button-submit";
import { useModuleStore } from "@/store/module";

interface AddSectionDialogProps {
  page: number;
  limit: number;
  onMutation?: () => void;
}
export default function AddSectionDialog({
  page,
  limit,
  onMutation = () => { },
}: AddSectionDialogProps) {
  const moduleId = useModuleStore((state) => state.module.id);
  const {
    isAddSectionDialogOpen,
    setIsAddSectionDialogOpen,
    action,
    section,
    setSection,
  } = useSectionStore();

  const saveSectionMutation = useSaveSection(moduleId, page, limit);

  const form = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    defaultValues: section,
  });

  const onSubmit = async (data: SectionFormData) => {
    await saveSectionMutation
      .mutateAsync({
        section: data,
      })
      .then(() => {
        onMutation();
        setIsAddSectionDialogOpen(false);
      });
  };

  useEffect(() => {
    setSection({
      sectionNumber: "",
      title: "",
      dateRange: { startDate: "", endDate: "" },
      isVisible: true,
    });
  }, []);

  const isSubmitting = form.formState.isSubmitting;
  return (
    <Dialog
      open={isAddSectionDialogOpen}
      onOpenChange={setIsAddSectionDialogOpen}
      modal={false}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {action === "add" ? "Agregar Nueva Sección" : "Editar Sección"}
          </DialogTitle>
          <DialogDescription>
            {action === "add"
              ? "Complete los campos para agregar una nueva sección al curso."
              : "Edita la sección del curso."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="sectionNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Sección</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ej: 4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Título de la Sección" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango de fechas</FormLabel>
                  <FormControl>
                    <DatePickerWithRange
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isVisible"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Checkbox
                        id="visible-section"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="visible-section" className="text-sm">
                        Visible para estudiantes
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="justify-end flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddSectionDialogOpen(false)}
              >
                Cancelar
              </Button>
              <SubmitButton
                title={
                  action === "add" ? "Agregar Seción" : "Actualizar Sección"
                }
                isSubmiting={isSubmitting}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
