import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CourseFormData } from "@/schema/course";
import { CourseStatus } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Clock,
  CheckCircle,
  CalendarClock,
  UserPlus,
} from "lucide-react";

export default function AddStatus({
  form,
}: {
  form: UseFormReturn<CourseFormData>;
}) {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case CourseStatus.IN_PROGRESS:
        return <Clock className="h-4 w-4 text-yellow-500 mr-2" />;
      case CourseStatus.OPEN_INSCRIPTION:
        return <UserPlus className="h-4 w-4 text-green-500 mr-2" />;
      // case CourseStatus.INACTIVED:
      //  return <FileX className="h-4 w-4 text-red-500 mr-2" />;
      case CourseStatus.COMING_SOON:
        return <CalendarClock className="h-4 w-4 text-blue-500 mr-2" />;
      case CourseStatus.COMPLETED:
        return <CheckCircle className="h-4 w-4 text-green-600 mr-2" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case CourseStatus.IN_PROGRESS:
        return "En progreso";
      case CourseStatus.OPEN_INSCRIPTION:
        return "Inscripción abierta";
      //case CourseStatus.INACTIVED:
      //  return "Cerrado";
      case CourseStatus.COMING_SOON:
        return "Próximamente";
      case CourseStatus.COMPLETED:
        return "Completado";
      default:
        return "Seleccionar estado";
    }
  };

  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Estado del curso</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  {field.value && getStatusIcon(field.value)}
                  {field.value
                    ? getStatusLabel(field.value)
                    : "Seleccionar estado"}
                </div>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={CourseStatus.IN_PROGRESS}>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span>En progreso</span>
                </div>
              </SelectItem>
              <SelectItem value={CourseStatus.OPEN_INSCRIPTION}>
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4 text-green-500" />
                  <span>Inscripción abierta</span>
                </div>
              </SelectItem>
              {/*<SelectItem value={CourseStatus.INACTIVED}>
                <div className="flex items-center gap-2">
                  <FileX className="h-4 w-4 text-red-500" />
                  <span>Cerrado</span>
                </div>
              </SelectItem>*/}
              <SelectItem value={CourseStatus.COMING_SOON}>
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-blue-500" />
                  <span>Próximamente</span>
                </div>
              </SelectItem>
              <SelectItem value={CourseStatus.COMPLETED}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Completado</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
