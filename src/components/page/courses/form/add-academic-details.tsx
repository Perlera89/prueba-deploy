import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ModuleInfoFormData } from "@/schema/module";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddAcademicDetails({
  form,
}: {
  form: UseFormReturn<ModuleInfoFormData>;
}) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descripción</FormLabel>
            <FormControl>
              <Textarea
                maxLength={500}
                placeholder="Descripción relevante del curso"
                className="min-h-[100px] w-full"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <h3 className="text-lg font-medium">Objetivos</h3>
      <FormField
        control={form.control}
        name="objectives.general"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Objetivo General</FormLabel>
            <FormControl>
              <Textarea
                maxLength={500}
                placeholder="Objetivo general del curso"
                className="min-h-[100px] w-full"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Objetivos específicos con agregar/eliminar */}
      <div className="space-y-2">
        <Label className="mb-2 block">Objetivos Específicos</Label>
        <div className="space-y-3">
          {form.watch("objectives.specific")?.map((_, index) => (
            <div
              key={index}
              className="flex flex-row gap-3 p-3 border rounded-md"
            >
              <FormField
                control={form.control}
                name={`objectives.specific.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">
                      Objetivo específico
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Objetivo específico"
                        className="w-full"
                        {...field}
                      />
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
                  const currentObjectives = [
                    ...(form.getValues("objectives.specific") || []),
                  ];
                  currentObjectives.splice(index, 1);
                  form.setValue("objectives.specific", currentObjectives);
                }}
                className="flex-shrink-0 w-8 h-8 self-center"
              >
                <span className="sr-only">Eliminar objetivo</span>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            className="w-full mt-2"
            onClick={() => {
              const currentObjectives = [
                ...(form.getValues("objectives.specific") || []),
              ];
              form.setValue("objectives.specific", [...currentObjectives, ""]);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar objetivo específico
          </Button>
        </div>
        {form.formState.errors.objectives?.specific?.message && (
          <p className="text-sm font-medium text-destructive mt-1">
            {form.formState.errors.objectives?.specific?.message}
          </p>
        )}
      </div>

      <FormField
        control={form.control}
        name="methodology"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Metodología</FormLabel>
            <FormControl>
              <Textarea
                maxLength={500}
                placeholder="Metodología del curso"
                className="min-h-[100px] w-full"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="preRequisite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prerrequisitos</FormLabel>
            <FormControl>
              <Input
                placeholder="Ej: Ninguno, o códigos de cursos separados por comas"
                className="w-full"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
