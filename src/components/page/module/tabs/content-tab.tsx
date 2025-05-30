import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSectionStore } from "@/store/section";
import { useFetchSections } from "@/hooks/use-section";
import SectionSkeleton from "../../courses/skeleton/section-skeleton";
import { useState, useEffect } from "react";
import SectionCard from "../../content/section-card";
import ActivitiesCard from "../../content/activities-card";
import AnnouncementCard from "../../content/announcement-card";
import AddSectionDialog from "../../content/section-form";
import { useModuleStore } from "@/store/module";
import LoaderSpin from "@/components/display/loader-spin";
import { useAuthStore } from "@/store/auth";

export default function ContentTab() {
  const LIMIT = 10;
  const { isAddSectionDialogOpen, setIsAddSectionDialogOpen } =
    useSectionStore();
  const moduleId = useModuleStore((state) => state.module.id);
  const isInstructor = useModuleStore((state) => state.module.isInstructor);
  const role = useAuthStore((state) => state.user?.role);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [allSections, setAllSections] = useState<any[]>([]);

  const {
    data: sectionsData = {
      sections: [],
      meta: { total: 0, totalPages: 1, page: 1 },
    },
    isLoading,
    isFetching
  } = useFetchSections(moduleId, currentPage, LIMIT);

  const getPositionById = (sectionId: string) => {
    const index = allSections.findIndex((section) => section.id === sectionId);
    if (index === -1) return -1;
    const page = Math.floor(index / LIMIT) + 1;
    return page;
  };

  const sections = sectionsData.sections || [];


  const handleActionMutation = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    if (sections.length > 0) {
      if (currentPage === 1) {
        setAllSections(sections);
      } else {
        setAllSections((prev) => [...prev, ...sections]);
      }
      setHasMore(sections.length === LIMIT);
    } else if (sections.length === 0 && currentPage === 1) {
      setAllSections([]);
      setHasMore(false);
    }
  }, [moduleId, currentPage, isFetching]);

  const loadMoreSections = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Contenido del Módulo</h2>
          {(isInstructor || role === "manager") && allSections?.length > 0 && (
            <Button onClick={() => setIsAddSectionDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Sección
            </Button>
          )}
        </div>
        <div className="space-y-4">
          {isLoading && currentPage === 1 ? (
            <SectionSkeleton />
          ) : allSections?.length > 0 ? (
            <>
              {allSections.map((section: any) => (
                <SectionCard
                  key={section.id}
                  section={{
                    ...section,
                    sectionNumber: section.sectionNumber,
                    title: section.title || "",
                    dateRange: section.dateRange,
                  }}
                  page={getPositionById}
                  limit={LIMIT}
                  onMutation={handleActionMutation}
                />
              ))}
              {hasMore && allSections.length > 0 && (
                <div className="flex justify-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={loadMoreSections}
                    disabled={isLoading && currentPage > 1}
                    className="text-sm"
                  >
                    {isLoading && currentPage > 1 ? (
                      <LoaderSpin title="Cargando" />
                    ) : (
                      "Ver más secciones"
                    )}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed px-12 py-24 text-center animate-in fade-in-50">
              <div className="text-center space-y-3">
                <h3 className="text-xl font-medium">
                  No hay secciones disponibles
                </h3>
                <p className="text-muted-foreground">
                  Este módulo todavía no tiene secciones de contenido
                  organizadas.
                </p>

                {(isInstructor || role === "manager") && (
                  <Button
                    onClick={() => {
                      setIsAddSectionDialogOpen(true);
                    }}
                    className="mt-2"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Sección
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <ActivitiesCard />
        <AnnouncementCard />
      </div>
      {isAddSectionDialogOpen && (
        <AddSectionDialog
          page={currentPage}
          limit={LIMIT}
          onMutation={handleActionMutation}
        />
      )}
    </div>
  );
}
