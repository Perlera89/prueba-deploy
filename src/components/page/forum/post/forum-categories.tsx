// components/forum/ForumCategoriesCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2Icon, Tag } from "lucide-react";
import { useState } from "react";
import AlertDialogComponent from "@/components/display/alert-dialog";
import { useDeleteCategoryPost } from "@/hooks/forum/use-category-post";
import { usePostStore } from "@/store/post";
import { useModuleStore } from "@/store/module";
import { useAuthStore } from "@/store/auth";

export function ForumCategoriesCard() {
  const { categories } = usePostStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    id: string;
  }>();
  const moduleId = useModuleStore((state) => state.module.id);
  const roleId = useAuthStore((state) => state.user?.role)
  const isNotStudent = roleId !== "student";

  const useDeleteCategoryMutation = useDeleteCategoryPost(moduleId);

  const handleOpenDialog = (
    e: React.MouseEvent,
    category: { name: string; id: string }
  ) => {
    e.stopPropagation();
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-6">
              <Tag className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <h3 className="mt-3 text-sm font-medium">No hay categorías</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Los categorías para las discusiones del foro aparecerán aquí.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                >
                  <span className="text-sm">{category.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{category.forumCount}</Badge>
                    {(category.forumCount === 0 && isNotStudent) && (
                      <Trash2Icon
                        className="h-4 w-4 text-destructive/70 hover:text-destructive transition-colors cursor-pointer"
                        onClick={(e) =>
                          handleOpenDialog(e, {
                            name: category.name || "",
                            id: category.id || "",
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedCategory && (
        <AlertDialogComponent
          title="Eliminar categoría"
          description={`¿Estás seguro que deseas eliminar la categoría "${selectedCategory.name}"? Esta acción no se puede deshacer.`}
          onConfirm={() => {
            useDeleteCategoryMutation.mutateAsync({
              categoryId: selectedCategory.id,
            });
            setOpenDialog(false);
          }}
          openAlertDialog={openDialog}
          setOpenAlertDialog={setOpenDialog}
        />
      )}
    </>
  );
}
