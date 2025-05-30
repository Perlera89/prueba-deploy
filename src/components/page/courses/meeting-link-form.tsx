import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { meetingLinkSchema, MeetingLinkFormData } from "@/schema/course";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModuleStore } from "@/store/module";
import { Input } from "../../ui/input";
import { useUpdateMeetingLink } from "@/hooks/use-module";
import SubmitButton from "../../entry/button-submit";

interface ScheduleFormProps {
  initialData?: MeetingLinkFormData;
  isEditing?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MeetingLinkFormDialog({
  initialData,
  open,
  onOpenChange,
}: ScheduleFormProps) {
  const moduleId = useModuleStore((state) => state.module.id);
  const updateMeetingLinkMutation = useUpdateMeetingLink(moduleId);

  const defaultValues = initialData || {
    meetingLink: "",
  };

  const form = useForm<MeetingLinkFormData>({
    resolver: zodResolver(meetingLinkSchema),
    defaultValues,
    mode: "onChange",
  });

  //const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: MeetingLinkFormData) => {
    await updateMeetingLinkMutation
      .mutateAsync({
        meetingLink: data.meetingLink,
      })
      .then(() => {
        onOpenChange(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurar Enlace de Reunión</DialogTitle>
          <DialogDescription>
            Configure el Enlace de Reunión para este curso
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="meetingLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enlace de la reunión</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://meet.google.com"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <SubmitButton
                title="Guardar Reunión"
                isSubmiting={isSubmitting}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
