import type React from "react";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseScheduleSchema, CourseScheduleFormData } from "@/schema/course";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../../ui/label";
import { dayOptions } from "@/utils/date";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModuleStore } from "@/store/module";
import { useSaveCourseSchedules } from "@/hooks/use-schedule";
import SubmitButton from "../../entry/button-submit";
import { Input } from "../../ui/input";

interface ScheduleFormProps {
  initialData?: CourseScheduleFormData;
  isEditing?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScheduleFormDialog({
  initialData,
  isEditing = false,
  open,
  onOpenChange,
}: ScheduleFormProps) {
  const moduleId = useModuleStore((state) => state.module.id);
  const { refetchedModule } = useModuleStore();

  const saveSchedulesMutation = useSaveCourseSchedules();

  const [originalData, setOriginalData] = useState<
    CourseScheduleFormData | undefined
  >(initialData);
  const [hasChanges, setHasChanges] = useState(false);

  const defaultValues = initialData || {
    schedules: [
      {
        day: "monday",
        startTime: "",
        endTime: "",
      },
    ],
  };

  const form = useForm<CourseScheduleFormData>({
    resolver: zodResolver(courseScheduleSchema),
    defaultValues,
    mode: "onChange",
  });

  //const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      setOriginalData(initialData);
    }
  }, [initialData, form]);

  useEffect(() => {
    const currentValues = form.getValues();

    if (isEditing) {
      const changed =
        JSON.stringify(currentValues) !== JSON.stringify(originalData);
      setHasChanges(changed);
    } else {
      const hasCompletedSchedule = currentValues.schedules?.some(
        (schedule) => schedule.day && schedule.startTime && schedule.endTime
      );
      setHasChanges(hasCompletedSchedule);
    }
  }, [form.watch(), originalData, isEditing, form]);

  const onSubmit = async (data: CourseScheduleFormData) => {
    const schedules = data.schedules.map((schedule) => ({
      day: `${schedule.day}`,
      startTime: `${schedule.startTime}:00`,
      endTime: `${schedule.endTime}:00`,
    }));

    await saveSchedulesMutation
      .mutateAsync({
        moduleId: moduleId,
        schedule: { schedules },
      })
      .then(() => {
        refetchedModule?.(true);
        onOpenChange(false);
      })
      .finally(() => refetchedModule?.(false));
  };

  const handleDiscardChanges = () => {
    if (isEditing) {
      form.reset(originalData);
    } else {
      form.reset(defaultValues);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Horarios" : "Configurar Horarios"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los horarios del curso."
              : "Configure los horarios para este curso."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">
                  Horarios<span className="ml-2 text-red-600">*</span>
                </Label>
                <div className="space-y-3">
                  {form.watch("schedules")?.map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row gap-3 p-3 border rounded-md"
                    >
                      <FormField
                        control={form.control}
                        name={`schedules.${index}.day`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="sr-only">Día</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Día" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  {dayOptions.map((day) => (
                                    <SelectItem key={day.key} value={day.key}>
                                      {day.value}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`schedules.${index}.startTime`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="sr-only">
                              Hora de inicio
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="00:00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`schedules.${index}.endTime`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="sr-only">
                              Hora de fin
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="00:00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          if (form.getValues("schedules")?.length > 1) {
                            const currentSchedules = [
                              ...form.getValues("schedules"),
                            ];
                            currentSchedules.splice(index, 1);
                            form.setValue("schedules", currentSchedules);
                          }
                        }}
                        disabled={form.getValues("schedules")?.length <= 1}
                        className="flex-shrink-0 w-8 h-8"
                      >
                        <span className="sr-only">Eliminar horario</span>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    className="w-full mt-2"
                    onClick={() => {
                      const currentSchedules = [
                        ...(form.getValues("schedules") || []),
                      ];
                      form.setValue("schedules", [
                        ...currentSchedules,
                        {
                          day: "monday",
                          startTime: "",
                          endTime: "",
                        },
                      ]);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar horario
                  </Button>
                </div>
                {form.formState.errors.schedules?.message && (
                  <p className="text-sm font-medium text-destructive mt-1">
                    {form.formState.errors.schedules.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6">
              {hasChanges && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDiscardChanges}
                  className="mr-auto"
                >
                  Descartar cambios
                </Button>
              )}
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <SubmitButton
                title="Guardar Horarios"
                isSubmiting={isSubmitting}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
