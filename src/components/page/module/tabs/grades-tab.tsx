import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFetchAssignments } from "@/hooks/use-assignment";
import { useCourseStore } from "@/store/course";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { SubmissionsList } from "@/components/assignment/submissions-list";
import { useAuthStore } from "@/store/auth";
import { Plus } from "lucide-react";
import { Search } from "lucide-react";
import { InputSearch } from "@/components/entry/input-search";
import { Assignment } from "@/types";
import { SkeletonAssignment } from "@/components/assignment/skeleton-assingment";

export default function GradesTab() {
  const courseCode = useCourseStore((state) => state.course.courseCode);
  const role = useAuthStore((state) => state.user?.role);
  const { data: assignament = [], isLoading: dataLoading } =
    useFetchAssignments(courseCode);
  const [submission, setSubmission] = useState<any>([]);
  const [assignmentsFilter, setAssignmentsFilter] = useState<any>(assignament);
  const [isOpenSubmission, setIsOpenSubmission] = useState(false);
  const isStudent = role === "student";

  const handleOpenSubmission = (index: number) => {
    setIsOpenSubmission(true);
    setSubmission(assignament[index]);
  };
  useEffect(() => {
    if (assignament && assignament.length > 0) {
      setAssignmentsFilter(assignament);
    }
  }, [assignament]);
  const handleSearch = (value: Assignment[]) => {
    setAssignmentsFilter(value);
  };

  if (dataLoading) {
    return <SkeletonAssignment />;
  } else {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Calificaciones</CardTitle>
              <CardDescription>
                Resumen de evaluaciones en este curso
              </CardDescription>
            </div>
            {!isStudent && (
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Calificación
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Calificación General</p>
                <p className="text-sm text-muted-foreground">
                  Basada en todas las evaluaciones completadas
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">B+</p>
              </div>
            </div>

            {/* Buscador */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <InputSearch
                keys={["title"]}
                placeholder="Buscar por nombre de evaluación"
                onSearch={handleSearch}
                options={assignament}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 font-medium text-sm">
                      Evaluación
                    </th>
                    <th className="text-left p-3 font-medium text-sm">Fecha</th>
                    <th className="text-left p-3 font-medium text-sm">
                      Calificación
                    </th>
                    <th className="text-left p-3 font-medium text-sm">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {assignmentsFilter.map((item: Assignment, index: number) => (
                    <tr key={index}>
                      <td className="p-3 text-sm font-medium">{item.title}</td>
                      <td className="p-3 text-sm">
                        {dayjs(item.dueDate).format("DD-MMM")}
                      </td>
                      <td className="p-3 text-sm font-medium">{item.score}</td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            handleOpenSubmission(index);
                          }}
                        >
                          {"Ver Detalles"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SubmissionsList
            submissions={submission.assignmentSubmissions}
            title="Detalles de la entrega"
            isOpen={isOpenSubmission}
            setIsOpen={setIsOpenSubmission}
            isStudent={isStudent}
          />
        </CardContent>
      </Card>
    );
  }
}
