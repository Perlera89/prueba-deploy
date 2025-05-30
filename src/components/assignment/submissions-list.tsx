import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AssignmentSubmission } from "@/types";
import { SubmissionDetails } from "./submissions-item";
import { useAuthStore } from "@/store/auth";
import { ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { InputSearch } from "../entry/input-search";

interface SubmissionsListProps {
  submissions: AssignmentSubmission[];
  title?: string;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  isStudent?: boolean;
}

export function SubmissionsList({
  submissions,
  title = "Entregas de estudiantes",
  isOpen,
  setIsOpen,
}: SubmissionsListProps) {
  const [submissionsFilter, setSubmissionsFilter] =
    useState<AssignmentSubmission[]>(submissions);

  useEffect(() => {
    setSubmissionsFilter(submissions || []);
  }, [submissions]);

  const isStudent = useAuthStore((state) => state.user?.role) === "student";

  const handleSearch = (result: AssignmentSubmission[]) => {
    setSubmissionsFilter(result);
  };

  const hasSubmissions =
    submissionsFilter &&
    Array.isArray(submissionsFilter) &&
    submissionsFilter.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[700px] md:max-w-[850px] lg:max-w-[950px] max-h-[90vh] flex flex-col p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>

        {!isStudent && (
          <div className="relative mb-6">
            <InputSearch
              keys={["studentProfile.names", "studentProfile.surnames"]}
              placeholder="Buscar por nombre o apellidos"
              onSearch={handleSearch}
              options={submissions}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        )}

        {!hasSubmissions ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-muted/40 rounded-full p-4 mb-4">
              <ClipboardList className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-muted-foreground mb-2">
              {isStudent ?
                "No has realizado entregas aún" :
                "No hay entregas para mostrar"
              }
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-[350px]">
              {isStudent ?
                "Cuando completes una tarea, tus entregas aparecerán aquí" :
                "Los estudiantes aún no han realizado entregas para esta tarea"
              }
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1 pr-6 max-h-[calc(90vh-220px)]">
            <div className="space-y-5">
              {/* Usamos las submissions filtradas */}
              {submissionsFilter?.map((submission, index) => (
                <div
                  key={index}
                  className="shadow-sm hover:shadow-md rounded-lg overflow-hidden border border-border transition-all duration-200"
                >
                  <SubmissionDetails key={index} {...submission} />
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
