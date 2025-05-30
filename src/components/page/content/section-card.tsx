import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Album,
  Calendar,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Edit,
  Eye,
  EyeOff,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useCallback, useState } from "react";
import { Section } from "@/types";
import { useSectionStore } from "@/store/section";
import {
  useDeleteSection,
  useUpdateVisibilitySection,
} from "@/hooks/use-section";
import AlertDialogComponent from "@/components/display/alert-dialog";
import ContentCard from "./content-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useCourseStore } from "@/store/course";
import { useModuleStore } from "@/store/module";
import { useAuthStore } from "@/store/auth";

interface ContentCardProps {
  section: Section;
  page: (secitionId: string) => number;
  limit: number;
  onMutation?: () => void;
}

export default function SectionCard({
  section,
  page,
  limit,
  onMutation = () => {},
}: ContentCardProps) {
  const router = useRouter();
  const courseId = useCourseStore((state) => state.course.id);
  const moduleId = useModuleStore((state) => state.module.id);
  const role = useAuthStore((state) => state.user?.role);
  const isInstructor = useModuleStore((state) => state.module.isInstructor);

  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [openDeleteAlertDialog, setOpenDeleteAlertDialog] = useState(false);
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const {
    setIsAddSectionDialogOpen,
    setSection,
    setAction,
    setSelectedSectionId,
  } = useSectionStore();

  const deleteSectionMutation = useDeleteSection(
    moduleId,
    page(section.id as string),
    limit
  );
  const updateVisibilityMutation = useUpdateVisibilitySection(
    moduleId,
    page(section.id as string),
    limit
  );

  const isSectionEmpty = () => {
    const sectionContent = section.courseContents.length > 0;

    return !sectionContent;
  };

  const handleDeleteSection = async (sectionId: string) => {
    onMutation();
    await deleteSectionMutation.mutateAsync({ sectionId });
  };

  const handleEditSection = useCallback(() => {
    setSection({
      ...section,
      sectionNumber: section.sectionNumber.toString(),
      dateRange: {
        startDate:
          section.dateRange.startDate instanceof Date
            ? section.dateRange.startDate.toISOString()
            : section.dateRange.startDate,
        endDate:
          section.dateRange.endDate instanceof Date
            ? section.dateRange.endDate.toISOString()
            : section.dateRange.endDate,
      },
    });
    setAction("edit");
    setDropdownMenuOpen(false);

    setTimeout(() => {
      setIsAddSectionDialogOpen(true);
    }, 300);
  }, [
    dropdownMenuOpen,
    setIsAddSectionDialogOpen,
    setSection,
    setAction,
    section,
  ]);

  const handleVisibilitytoggle = async () => {
    onMutation();
    await updateVisibilityMutation.mutateAsync({
      sectionId: section.id ?? "",
    });
  };

  const handleAddMaterial = () => {
    setSelectedSectionId(section.id ?? "");
    router.push(`/courses/${courseId}/${moduleId}/add-content/material`);
  };

  const handleAddAssignment = () => {
    setSelectedSectionId(section.id ?? "");
    router.push(`/courses/${courseId}/${moduleId}/add-content/assignment`);
  };

  const toggleSectionExpansion = (weekId: number) => {
    setSelectedSectionId(section.id ?? "");
    setExpandedSections((prev) =>
      prev.includes(weekId)
        ? prev.filter((id) => id !== weekId)
        : [...prev, weekId]
    );
  };

  return (
    <Card
      key={section.id}
      className={`overflow-hidden p-0 flex flex-col !gap-0 ${section.isVisible ? "" : "opacity-75"}`}
    >
      <CardHeader className="bg-muted/50 p-4 group transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {section.sectionNumber}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{section.title}</CardTitle>
                {!section.isVisible && (
                  <Badge variant="outline">
                    <EyeOff className="h-4 w-4" />
                  </Badge>
                )}
              </div>
              <CardDescription className="flex gap-1 items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {section.dateRange.startDate && section.dateRange.endDate
                  ? `${dayjs(section.dateRange.startDate).format("D")} de ${dayjs(section.dateRange.startDate).locale("es").format("MMMM")} - ${dayjs(section.dateRange.endDate).format("D")} de ${dayjs(section.dateRange.endDate).locale("es").format("MMMM")}, ${dayjs(section.dateRange.startDate).format("YYYY")}`
                  : ""}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(isInstructor || role === "manager") && (
              <div className="opacity-0 group-hover:opacity-100">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleAddMaterial}>
                      <Album className="h-4 w-4 mr-2 text-green-600" />
                      Material
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAddAssignment}>
                      <ClipboardList className="h-4 w-4 mr-2 text-orange-500" />
                      Actividad
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu
                  open={dropdownMenuOpen}
                  onOpenChange={setDropdownMenuOpen}
                  modal={false}
                >
                  <DropdownMenuTrigger
                    asChild
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleVisibilitytoggle}>
                      {section.isVisible ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Ocultar
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Mostrar
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleEditSection}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Sección
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => {
                        setOpenDeleteAlertDialog(true);
                      }}
                      disabled={!isSectionEmpty()}
                      className={
                        !isSectionEmpty()
                          ? "text-muted-foreground cursor-not-allowed"
                          : "text-destructive"
                      }
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Eliminar Sección
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {!isSectionEmpty() && (
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={() => toggleSectionExpansion(section.sectionNumber)}
              >
                {expandedSections.includes(section.sectionNumber) ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 m-0">
        {expandedSections.includes(section.sectionNumber) &&
          section.courseContents.length > 0 && (
            <div className="divide-y divide-border">
              {section.courseContents.map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          )}
        <CardFooter>
          {openDeleteAlertDialog && (
            <AlertDialogComponent
              openAlertDialog={openDeleteAlertDialog}
              setOpenAlertDialog={setOpenDeleteAlertDialog}
              title="Eliminar Sección"
              description="¿Estás seguro de que deseas eliminar esta sección? Esta acción no se puede deshacer."
              onConfirm={() => handleDeleteSection(section.id ?? "")}
            />
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
