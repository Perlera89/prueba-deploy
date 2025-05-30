import { useState } from "react";
import { LibraryBig, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModuleCard } from "./module-card";
import { ModuleDialog } from "./module-form";
import { Module } from "@/types";
import {
  useUpdateVisibilityModule,
  useDeleteModule,
  useSaveModule,
  useUpdateModule,
} from "@/hooks/use-module";
import { ModuleFormValues } from "@/schema/module";
import { useUploadImage } from "@/hooks/use-updoad-image";
import { useModuleStore } from "@/store/module";

interface ModulesSimpleContainerProps {
  isEditable?: boolean;
  initialModules?: Module[];
  role?: string;
  refecth: () => void;
}

export function ModulesContainer({
  isEditable = true,
  initialModules = [],
  role = "manager",
  refecth,
}: ModulesSimpleContainerProps) {
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const modules = initialModules;
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [editMode, setEditMode] = useState<"add" | "edit">("add");

  const { module } = useModuleStore();
  const saveModuleMutation = useSaveModule(module.courseId);
  const updateModuleMutation = useUpdateModule(module.id);
  const updateVisibilityMutation = useUpdateVisibilityModule(module.id);
  const deleteModuleMutation = useDeleteModule(module.id);

  const handleAddModule = () => {
    setEditMode("add");
    setIsModuleDialogOpen(true);
  };

  const handleEditModule = (moduleId: string) => {
    const moduleToEdit = modules.find((m) => m.id === moduleId);
    if (moduleToEdit) {
      setCurrentModule(moduleToEdit);
      setEditMode("edit");
      setIsModuleDialogOpen(true);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    await deleteModuleMutation
      .mutateAsync({
        moduleId,
      })
      .then(() => {
        refecth();
      });
  };

  const handleUpdateVisibility = async (moduleId: string) => {
    await updateVisibilityMutation
      .mutateAsync({
        moduleId,
      })
      .then(() => {
        refecth();
      });
  };

  const handleSaveModule = async (data: ModuleFormValues) => {
    const saveImage = await useUploadImage(data.picture as File)
      .then((res) => res)
      .catch(() => "");

    await saveModuleMutation
      .mutateAsync({
        module: {
          ...data,
          picture: saveImage,
        },
      })
      .then(() => {
        refecth();
        setIsModuleDialogOpen(false);
      });
  };

  const handleSaveUpdateModule = async (data: ModuleFormValues) => {
    const saveImage = await useUploadImage(data.picture as File)
      .then((res) => res)
      .catch(() => (typeof data.picture === "string" ? "" : data.picture));

    await updateModuleMutation
      .mutateAsync({
        module: {
          ...data,
          picture: saveImage,
        },
      })
      .then(() => {
        refecth();
        setIsModuleDialogOpen(false);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Módulos del Curso</h2>
        {isEditable && role === "manager" && modules.length !== 0 && (
          <Button onClick={handleAddModule}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Módulo
          </Button>
        )}
      </div>
      {modules.length > 0 ? (
        <div className="flex flex-col gap-4">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isEditable={isEditable}
              role={role}
              onEdit={handleEditModule}
              onDelete={handleDeleteModule}
              onToggleVisibility={handleUpdateVisibility}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <LibraryBig className="w-16 h-16 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">
            No hay módulos disponibles para este curso.
          </p>
          {isEditable && role === "manager" && (
            <Button onClick={handleAddModule} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Crear el primer módulo
            </Button>
          )}
        </div>
      )}

      {isModuleDialogOpen && (
        <ModuleDialog
          isOpen={isModuleDialogOpen}
          setIsOpen={setIsModuleDialogOpen}
          module={currentModule}
          mode={editMode}
          onAction={(data) => (editMode === "add" ? handleSaveModule(data) : handleSaveUpdateModule(data))}
        />
      )}
    </div>
  );
}
