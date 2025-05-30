import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CourseFormData } from "@/schema/course";
import {
  useFetchCategories,
  useSaveCategory,
  useDeleteCategory,
} from "@/hooks/course/use-category";
import { CourseCategory } from "@/types";
import { CustomSelect } from "@/components/entry/custom-selected";

interface Option {
  value: string;
  label: string;
}

interface AddClasificationProps {
  form: UseFormReturn<CourseFormData>;
}

export default function AddClasification({ form }: AddClasificationProps) {
  const { data = [] } = useFetchCategories();

  const saveCategoryMutation = useSaveCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const categories = data.map((category: CourseCategory) => {
    return {
      id: category.id.toString(),
      name: category.name,
    };
  });

  const handleAddCategory = async (name: string) => {
    await saveCategoryMutation.mutateAsync({
      category: {
        name,
        description: "Sin descripción",
      },
    });
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategoryMutation.mutateAsync({
      id,
    });
  };

  return (
    <div>
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
                initialValue={field.value}
                onCreate={handleAddCategory}
                ondelete={handleDeleteCategory}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
