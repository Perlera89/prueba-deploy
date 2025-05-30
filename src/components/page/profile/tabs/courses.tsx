import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Calendar, Eye, FileText, Plus, Users } from "lucide-react";
import Link from "next/link";

export default function CoursesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Cursos</CardTitle>
        <CardDescription>Cursos que impartes actualmente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground">Cursos Activos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">127</p>
              <p className="text-sm text-muted-foreground">Estudiantes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">4.8</p>
              <p className="text-sm text-muted-foreground">Valoración Media</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Cursos Actuales</h3>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Crear Curso
            </Button>
          </div>
          <div className="space-y-4">
            {teachingCourses.map((course, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {course.code} • {course.period}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {course.students} estudiantes
                        </span>
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground ml-2" />
                        <span className="text-xs text-muted-foreground">
                          {course.schedule}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/courses/${course.id}`}>
                          <BookOpen className="h-3.5 w-3.5 mr-1" />
                          Ver Curso
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        Calificaciones
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Cursos Anteriores</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-3 font-medium text-sm">Curso</th>
                  <th className="text-left p-3 font-medium text-sm">Código</th>
                  <th className="text-left p-3 font-medium text-sm">Periodo</th>
                  <th className="text-left p-3 font-medium text-sm">
                    Estudiantes
                  </th>
                  <th className="text-left p-3 font-medium text-sm">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pastCourses.map((course, index) => (
                  <tr
                    key={index}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-3 text-sm font-medium">{course.title}</td>
                    <td className="p-3 text-sm">{course.code}</td>
                    <td className="p-3 text-sm">{course.period}</td>
                    <td className="p-3 text-sm">{course.students}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Datos de ejemplo para cursos que imparte
const teachingCourses = [
  {
    id: 1,
    title: "Introducción a la Informática",
    code: "INF101",
    period: "2025-1",
    students: 45,
    schedule: "Lunes y Miércoles, 10:00 - 12:00",
  },
  {
    id: 2,
    title: "Algoritmos Avanzados",
    code: "INF305",
    period: "2025-1",
    students: 32,
    schedule: "Martes y Jueves, 16:00 - 18:00",
  },
  {
    id: 3,
    title: "Inteligencia Artificial",
    code: "INF401",
    period: "2025-1",
    students: 50,
    schedule: "Viernes, 09:00 - 13:00",
  },
];

// Datos de ejemplo para cursos anteriores
const pastCourses = [
  {
    title: "Programación Orientada a Objetos",
    code: "INF202",
    period: "2024-2",
    students: 38,
  },
  {
    title: "Estructuras de Datos",
    code: "INF203",
    period: "2024-2",
    students: 42,
  },
  {
    title: "Aprendizaje Automático",
    code: "INF402",
    period: "2024-1",
    students: 35,
  },
  {
    title: "Introducción a la Informática",
    code: "INF101",
    period: "2024-1",
    students: 48,
  },
];
