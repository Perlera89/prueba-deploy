import { useState, useEffect } from "react";
import {
  FolderOpen,
  Globe,
  ClipboardList,
  Calendar,
  Clock,
  CheckCircle2,
  Upload,
  Search,
  ArrowUpDown,
  Edit,
  InfoIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/display/video-player";
import {
  type Content,
  type ResourceViewModel,
  mapToViewModel,
  ContentType,
} from "@/types";
import { PDFViewer } from "@/components/display/pdf-viewer";
import { ImageViewer } from "@/components/display/image-viewer";
import { AudioPlayer } from "@/components/display/audio-player";
import { getFileIcon, getFileType } from "@/utils/material";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentViewProps {
  content: Content;
}

export function ContentContainer({
  resource,
}: {
  resource: ResourceViewModel;
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const fileType =
    resource.type === "file"
      ? getFileType(resource.fileExtension, resource.url)
      : "link";

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPreviewOpen) {
        setIsPreviewOpen(false);
      }
    };

    const handleCustomEscape = () => {
      setIsPreviewOpen(false);
    };

    window.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("escapePressed", handleCustomEscape);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("escapePressed", handleCustomEscape);
    };
  }, [isPreviewOpen]);

  const renderCardContent = () => {
    if (resource.type === "file" && fileType === "image") {
      return (
        <div className="relative h-full overflow-hidden">
          <img
            src={resource.url || "/placeholder.svg"}
            alt={resource.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/abstract-colorful-swirls.png";
              (e.target as HTMLImageElement).className =
                "h-full w-full object-cover transition-transform group-hover:scale-105";
            }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
            <p className="text-white p-3 text-sm truncate w-full">
              {resource.title}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full bg-muted flex flex-col items-center justify-center p-4">
        {resource.type === "file" ? (
          getFileIcon(resource.fileExtension)
        ) : (
          <Globe className="h-6 w-6 text-blue-500" />
        )}
        <p className="mt-3 text-sm text-center truncate max-w-full">
          {resource.title}
        </p>
        {resource.type === "link" && (
          <div className="mt-2">
            <p className="text-xs text-gray-600 mb-1 truncate max-w-full">
              {resource.url}
            </p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Visitar enlace
            </a>
          </div>
        )}
        {resource.type === "file" && resource.fileExtension && (
          <Badge variant="outline" className="mt-2 text-xs px-2">
            {resource.fileExtension.toUpperCase()}
          </Badge>
        )}
      </div>
    );
  };

  if (resource.type === "link") {
    return (
      <Card
        className="overflow-hidden border shadow-sm relative group h-[160px] py-0 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all"
        onClick={() => {
          if (resource.url && resource.url.trim() !== "") {
            const url =
              resource.url.startsWith("http://") ||
              resource.url.startsWith("https://")
                ? resource.url
                : `https://${resource.url}`;
            window.open(url, "_blank");
          }
        }}
      >
        <CardContent className="p-0 h-full">{renderCardContent()}</CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card
        className="overflow-hidden border shadow-sm relative group h-[160px] py-0 cursor-pointer hover:border-primary/40 hover:shadow-md transition-all"
        onClick={() => {
          setPreviewKey((prev) => prev + 1);
          setIsPreviewOpen(true);
        }}
      >
        <CardContent className="p-0 h-full">{renderCardContent()}</CardContent>
      </Card>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="p-0 max-w-[95vw] max-h-[95vh] border-none bg-transparent shadow-none">
          {fileType === "image" ? (
            <ImageViewer
              key={`image-${previewKey}`}
              src={resource.url || "/placeholder.svg"}
              alt={resource.title}
            />
          ) : fileType === "pdf" ? (
            <PDFViewer
              key={`pdf-${previewKey}`}
              url={resource.url}
              title={resource.title}
            />
          ) : fileType === "video" ? (
            <VideoPlayer
              key={`video-${previewKey}`}
              src={resource.url}
              title={resource.title}
              poster="/video-thumbnail.png"
            />
          ) : fileType === "audio" ? (
            <AudioPlayer
              key={`audio-${previewKey}`}
              src={resource.url}
              title={resource.title}
            />
          ) : (
            <div className="bg-black/90 p-10 rounded-lg text-center">
              {getFileIcon(resource.fileExtension)}
              <h3 className="text-white text-lg font-medium mb-2 mt-4">
                {resource.title}
              </h3>
              <p className="text-gray-300 mb-6">
                Vista previa no disponible para este tipo de archivo
              </p>
              <Button
                variant="secondary"
                onClick={() => window.open(resource.url, "_blank")}
              >
                Abrir en nueva pestaña
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ContentView({ content }: ContentViewProps) {
  const viewModel = mapToViewModel(content);

  // Si es una asignación (assignment), mostrar la vista de actividad
  if (content.contentType === ContentType.ASSIGNMENT) {
    return <AssignmentView material={content} />;
  }

  // Si no hay recursos, mostrar mensaje
  if (!viewModel.resources || viewModel.resources.length === 0) {
    return (
      <div className="text-center py-20 border border-dotted rounded-lg">
        <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
        <h3 className="mt-3 text-sm font-medium">No hay recursos</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Los recursos subidos aparecerán aquí.
        </p>
      </div>
    );
  }

  // Vista normal de recursos
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-end gap-2">
          Recursos <Badge variant="outline">{viewModel.resources.length}</Badge>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {viewModel.resources.map((resource) => {
          return <ResourceCard key={resource.id} resource={resource} />;
        })}
      </div>
    </div>
  );
}

// Definición de la función AssignmentView
function AssignmentView({ material }: { material: Content }) {
  const [activeTab, setActiveTab] = useState("instructions");
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [bulkGradeValue, setBulkGradeValue] = useState<string>("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Datos simulados
  const students = [
    {
      id: "1",
      name: "Ana Martínez",
      email: "ana.martinez@ejemplo.com",
      avatar: "/diverse-student-studying.png",
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@ejemplo.com",
      avatar: "/diverse-students-studying.png",
    },
    { id: "3", name: "Laura Sánchez", email: "laura.sanchez@ejemplo.com" },
    { id: "4", name: "Miguel Torres", email: "miguel.torres@ejemplo.com" },
    { id: "5", name: "Sofía Ramírez", email: "sofia.ramirez@ejemplo.com" },
    { id: "6", name: "Javier López", email: "javier.lopez@ejemplo.com" },
    { id: "7", name: "Elena Díaz", email: "elena.diaz@ejemplo.com" },
    {
      id: "8",
      name: "Daniel Fernández",
      email: "daniel.fernandez@ejemplo.com",
    },
  ];

  const submissions = [
    {
      id: "sub1",
      studentId: "1",
      materialId: material.id,
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: "graded",
      score: 85,
      feedback: "Buen trabajo, pero falta profundizar en algunos conceptos.",
      files: [
        { name: "entrega_final.pdf", url: "#", type: "pdf" },
        { name: "codigo_fuente.zip", url: "#", type: "zip" },
      ],
    },
    {
      id: "sub2",
      studentId: "2",
      materialId: material.id,
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "submitted",
      files: [{ name: "mi_entrega.docx", url: "#", type: "docx" }],
    },
    {
      id: "sub3",
      studentId: "3",
      materialId: material.id,
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: "late",
      files: [{ name: "entrega_tardia.pdf", url: "#", type: "pdf" }],
    },
    {
      id: "sub4",
      studentId: "4",
      materialId: material.id,
      submittedAt: new Date(),
      status: "graded",
      score: 92,
      feedback: "Excelente trabajo, muy completo y bien estructurado.",
      files: [
        { name: "proyecto_final.pdf", url: "#", type: "pdf" },
        { name: "presentacion.pptx", url: "#", type: "pptx" },
      ],
    },
    {
      id: "sub5",
      studentId: "5",
      materialId: material.id,
      status: "not_submitted",
      submittedAt: new Date(),
    },
    {
      id: "sub6",
      studentId: "6",
      materialId: material.id,
      status: "not_submitted",
      submittedAt: new Date(),
    },
    {
      id: "sub7",
      studentId: "7",
      materialId: material.id,
      submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      status: "graded",
      score: 78,
      feedback: "Buen esfuerzo, pero hay aspectos que mejorar.",
      files: [{ name: "entrega.pdf", url: "#", type: "pdf" }],
    },
    {
      id: "sub8",
      studentId: "8",
      materialId: material.id,
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "submitted",
      files: [{ name: "trabajo_final.docx", url: "#", type: "docx" }],
    },
  ];

  // Estadísticas
  const stats = {
    total: students.length,
    submitted: submissions.filter(
      (s) =>
        s.status === "submitted" || s.status === "graded" || s.status === "late"
    ).length,
    graded: submissions.filter((s) => s.status === "graded").length,
    pending: submissions.filter(
      (s) => s.status === "submitted" || s.status === "late"
    ).length,
    late: submissions.filter((s) => s.status === "late").length,
    notSubmitted: submissions.filter((s) => s.status === "not_submitted")
      .length,
    passed: submissions.filter(
      (s) => s.status === "graded" && (s.score || 0) >= 60
    ).length,
    failed: submissions.filter(
      (s) => s.status === "graded" && (s.score || 0) < 60
    ).length,
  };

  // Filtrar y ordenar las entregas
  const filteredSubmissions = submissions
    .filter((submission) => {
      // Filtrar por estado
      if (statusFilter !== "all" && submission.status !== statusFilter) {
        return false;
      }

      // Filtrar por búsqueda
      if (searchQuery) {
        const student = students.find((s) => s.id === submission.studentId);
        if (!student) return false;
        return (
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      return true;
    })
    .sort((a, b) => {
      // Ordenar por nombre de estudiante
      const studentA = students.find((s) => s.id === a.studentId);
      const studentB = students.find((s) => s.id === b.studentId);
      if (!studentA || !studentB) return 0;

      if (sortOrder === "asc") {
        return studentA.name.localeCompare(studentB.name);
      } else {
        return studentB.name.localeCompare(studentA.name);
      }
    });

  // Encontrar la entrega seleccionada
  const selectedSubmissionData = selectedSubmission
    ? submissions.find((s) => s.id === selectedSubmission)
    : null;
  const selectedStudent = selectedSubmissionData
    ? students.find((s) => s.id === selectedSubmissionData.studentId)
    : null;

  // Manejar la calificación individual
  const handleGradeSubmission = (
    submissionId: string,
    score: number,
    feedback: string
  ) => {
    // En una aplicación real, aquí enviaríamos la calificación a la API
    console.log(
      `Calificando entrega ${submissionId} con nota ${score} y feedback: ${feedback}`
    );
    // Actualizar la UI (simulado)
    alert(`Calificación guardada: ${score}/100`);
  };

  // Manejar la calificación masiva
  const handleBulkGrade = () => {
    const score = Number.parseInt(bulkGradeValue);
    if (isNaN(score) || score < 0 || score > 100) {
      alert("Por favor ingresa una calificación válida entre 0 y 100");
      return;
    }

    // En una aplicación real, aquí enviaríamos las calificaciones a la API
    const submissionsToGrade = filteredSubmissions
      .filter((s) => s.status === "submitted" || s.status === "late")
      .map((s) => s.id);

    console.log(
      `Calificando ${submissionsToGrade.length} entregas con nota ${score}`
    );
    // Actualizar la UI (simulado)
    alert(
      `Se han calificado ${submissionsToGrade.length} entregas con ${score}/100`
    );
  };

  // Renderizar la rúbrica
  const renderRubric = () => {
    if (
      !material.assignment?.rubric ||
      material.assignment.rubric.length === 0
    ) {
      return null;
    }

    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="text-base font-medium flex items-center gap-2 mb-3">
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
            Rúbrica de Evaluación
          </h3>
          <div className="space-y-3">
            {material.assignment.rubric.map((item, index) => (
              <div
                key={item.id || index}
                className="border-b pb-2 last:border-0 last:pb-0"
              >
                <div className="flex justify-between">
                  <span>{item.description}</span>
                  <Badge variant="outline" className="font-mono">
                    {item.points} pts
                  </Badge>
                </div>
              </div>
            ))}
            <div className="pt-2 flex justify-between items-center font-medium">
              <span>Total</span>
              <Badge variant="default" className="font-mono">
                {material.assignment.rubric.reduce(
                  (sum, item) => sum + item.points,
                  0
                )}{" "}
                pts
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Renderizar la pestaña de instrucciones
  const renderInstructionsTab = () => (
    <div className="space-y-6">
      {/* Rúbrica con ancho completo */}
      {renderRubric()}

      {/* Recursos */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          Recursos{" "}
          <Badge variant="outline">{material.files?.length || 0}</Badge>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {material.files?.map((file, index) => (
            <ResourceCard
              key={`file-${index}`}
              resource={{
                id: `file-${index}`,
                title: file.title,
                fileExtension: file.fileExtension,
                url: file.url,
                type: "file",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Renderizar la pestaña de entregas
  const renderSubmissionsTab = () => (
    <div className="space-y-6">
      {/* Botones de acción para la asignación */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => {
            setIsEditMode(false);
            setShowDetailsModal(true);
          }}
        >
          <InfoIcon className="h-4 w-4" />
          Ver detalles
        </Button>
        <Button
          className="flex items-center gap-2"
          onClick={() => {
            setIsEditMode(true);
            setShowDetailsModal(true);
          }}
        >
          <Edit className="h-4 w-4" />
          Editar asignación
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Entregas</p>
                <p className="text-2xl font-bold">
                  {stats.submitted}/{stats.total}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Upload className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <Progress
              value={(stats.submitted / stats.total) * 100}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Calificadas</p>
                <p className="text-2xl font-bold">
                  {stats.graded}/{stats.submitted}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <Progress
              value={(stats.graded / (stats.submitted || 1)) * 100}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold">
                  {stats.pending}/{stats.submitted}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
            </div>
            <Progress
              value={(stats.pending / (stats.submitted || 1)) * 100}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aprobadas</p>
                <p className="text-2xl font-bold">
                  {stats.passed}/{stats.graded}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <Progress
              value={(stats.passed / (stats.graded || 1)) * 100}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar estudiante..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="submitted">Entregados</SelectItem>
              <SelectItem value="late">Entregados tarde</SelectItem>
              <SelectItem value="graded">Calificados</SelectItem>
              <SelectItem value="not_submitted">No entregados</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            title={sortOrder === "asc" ? "Ordenar Z-A" : "Ordenar A-Z"}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabla de entregas */}
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudiante</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de entrega</TableHead>
              <TableHead>Calificación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            ) : (
              filteredSubmissions.map((submission) => {
                const student = students.find(
                  (s) => s.id === submission.studentId
                );
                return (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">
                      {student?.name || "Estudiante"}
                    </TableCell>
                    <TableCell>
                      {submission.status === "submitted" && (
                        <Badge variant="outline">Entregado</Badge>
                      )}
                      {submission.status === "late" && (
                        <Badge variant="outline">Entregado tarde</Badge>
                      )}
                      {submission.status === "graded" && (
                        <Badge variant="default">Calificado</Badge>
                      )}
                      {submission.status === "not_submitted" && (
                        <Badge variant="destructive">No entregado</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {submission.status !== "not_submitted"
                        ? submission.submittedAt.toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {submission.score !== undefined ? (
                        <Badge
                          variant={
                            submission.score >= 60 ? "default" : "destructive"
                          }
                        >
                          {submission.score}/100
                        </Badge>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {submission.status !== "not_submitted" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSubmission(submission.id)}
                        >
                          Ver detalles
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Calificación masiva */}
      {filteredSubmissions.filter(
        (s) => s.status === "submitted" || s.status === "late"
      ).length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium">Calificación Masiva</h3>
                <p className="text-sm text-muted-foreground">
                  Asigna la misma calificación a todas las entregas pendientes (
                  {
                    filteredSubmissions.filter(
                      (s) => s.status === "submitted" || s.status === "late"
                    ).length
                  }{" "}
                  entregas)
                </p>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Input
                  type="number"
                  placeholder="Calificación (0-100)"
                  className="w-full md:w-40"
                  min={0}
                  max={100}
                  value={bulkGradeValue}
                  onChange={(e) => setBulkGradeValue(e.target.value)}
                />
                <Button onClick={handleBulkGrade}>Calificar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal para detalles de la entrega seleccionada */}
      <Dialog
        open={!!selectedSubmission}
        onOpenChange={(open) => !open && setSelectedSubmission(null)}
      >
        <DialogContent className="max-w-4xl">
          {selectedSubmissionData && selectedStudent && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold mb-1">
                    Entrega de {selectedStudent.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedStudent.email} • Entregado:{" "}
                    {selectedSubmissionData.submittedAt.toLocaleString()}
                  </p>
                </div>
                <Badge
                  variant={
                    selectedSubmissionData.status === "submitted"
                      ? "default"
                      : selectedSubmissionData.status === "late"
                        ? "secondary"
                        : selectedSubmissionData.status === "graded"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {selectedSubmissionData.status === "submitted"
                    ? "Entregado"
                    : selectedSubmissionData.status === "late"
                      ? "Entregado tarde"
                      : selectedSubmissionData.status === "graded"
                        ? "Calificado"
                        : "No entregado"}
                </Badge>
              </div>

              {/* Archivos adjuntos */}
              {selectedSubmissionData.files &&
                selectedSubmissionData.files.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium">Archivos adjuntos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedSubmissionData.files.map((file, idx) => (
                        <Card key={idx} className="overflow-hidden">
                          <div className="p-3 flex gap-2 items-center">
                            {getFileIcon(file.type)}
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <a
                                href={file.url}
                                className="text-xs text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Descargar
                              </a>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

              {/* Calificación */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Calificación</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="score" className="block text-sm mb-2">
                      Puntuación (0-100)
                    </label>
                    <Input
                      id="score"
                      type="number"
                      min={0}
                      max={100}
                      defaultValue={
                        selectedSubmissionData.score?.toString() || ""
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="feedback" className="block text-sm mb-2">
                      Retroalimentación
                    </label>
                    <Input
                      id="feedback"
                      defaultValue={selectedSubmissionData.feedback || ""}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={() =>
                      handleGradeSubmission(
                        selectedSubmissionData.id,
                        Number(
                          (document.getElementById("score") as HTMLInputElement)
                            .value
                        ),
                        (
                          document.getElementById(
                            "feedback"
                          ) as HTMLInputElement
                        ).value
                      )
                    }
                  >
                    Guardar calificación
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );

  // Modal para detalles de la asignación
  const renderDetailsModal = () => (
    <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
      <DialogContent className="max-w-3xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-amber-500" />
              {isEditMode ? "Editar asignación" : "Detalles de la asignación"}
            </h2>

            {isEditMode && (
              <Button onClick={() => setIsEditMode(false)} variant="secondary">
                Cancelar
              </Button>
            )}
          </div>

          {isEditMode ? (
            // Modo de edición
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Título
                </label>
                <Input
                  id="title"
                  defaultValue={material.title}
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Descripción
                </label>
                <Input
                  id="description"
                  defaultValue={material.description || ""}
                  className="w-full"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="duedate"
                    className="block text-sm font-medium mb-1"
                  >
                    Fecha de entrega
                  </label>
                  <Input
                    id="duedate"
                    type="datetime-local"
                    defaultValue={
                      material.assignment?.dueDate
                        ? new Date(material.assignment.dueDate)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="score"
                    className="block text-sm font-medium mb-1"
                  >
                    Puntaje
                  </label>
                  <Input
                    id="score"
                    type="number"
                    defaultValue={
                      material.assignment?.score?.toString() || "100"
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button>Guardar cambios</Button>
              </div>
            </div>
          ) : (
            // Modo de visualización
            <div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-muted-foreground">Título</h3>
                  <p className="font-medium">{material.title}</p>
                </div>

                <div>
                  <h3 className="text-sm text-muted-foreground">
                    Fecha de entrega
                  </h3>
                  <p className="font-medium">
                    {material.assignment?.dueDate
                      ? new Date(
                          material.assignment.dueDate
                        ).toLocaleDateString() +
                        " " +
                        new Date(
                          material.assignment.dueDate
                        ).toLocaleTimeString()
                      : "No especificada"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm text-muted-foreground">
                    Puntaje máximo
                  </h3>
                  <p className="font-medium">
                    {material.assignment?.score || 100} puntos
                  </p>
                </div>

                <div>
                  <h3 className="text-sm text-muted-foreground">Estado</h3>
                  <Badge
                    variant={material.isVisible ? "default" : "destructive"}
                    className="mt-1"
                  >
                    {material.isVisible ? "Publicado" : "Oculto"}
                  </Badge>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm text-muted-foreground mb-1">
                  Descripción
                </h3>
                <p>
                  {material.description || "No hay descripción disponible."}
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditMode(true)}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {/* Encabezado con detalles de la asignación */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-muted p-4 rounded-lg">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                Fecha de entrega:{" "}
                {material.assignment?.dueDate
                  ? new Date(material.assignment.dueDate).toLocaleDateString()
                  : "No especificada"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {material.assignment?.dueDate
                  ? new Date(material.assignment.dueDate).toLocaleTimeString()
                  : "No especificada"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <Tabs
        defaultValue="instructions"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="instructions">Instrucciones</TabsTrigger>
          <TabsTrigger value="submissions">
            Entregas ({stats.submitted}/{stats.total})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="instructions" className="pt-6">
          {renderInstructionsTab()}
        </TabsContent>
        <TabsContent value="submissions" className="pt-6">
          {renderSubmissionsTab()}
        </TabsContent>
      </Tabs>

      {/* Modal de detalles */}
      {renderDetailsModal()}
    </>
  );
}

function ResourceCard({ resource }: { resource: ResourceViewModel }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const fileType =
    resource.type === "file"
      ? getFileType(resource.fileExtension, resource.url)
      : "link";

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPreviewOpen) {
        setIsPreviewOpen(false);
      }
    };

    const handleCustomEscape = () => {
      setIsPreviewOpen(false);
    };

    window.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("escapePressed", handleCustomEscape);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("escapePressed", handleCustomEscape);
    };
  }, [isPreviewOpen]);

  const renderCardContent = () => {
    if (resource.type === "file" && fileType === "image") {
      return (
        <div className="relative h-full overflow-hidden">
          <img
            src={resource.url || "/placeholder.svg"}
            alt={resource.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/abstract-colorful-swirls.png";
              (e.target as HTMLImageElement).className =
                "h-full w-full object-cover transition-transform group-hover:scale-105";
            }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
            <p className="text-white p-3 text-sm truncate w-full">
              {resource.title}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full bg-muted flex flex-col items-center justify-center p-4">
        {resource.type === "file" ? (
          getFileIcon(resource.fileExtension)
        ) : (
          <Globe className="h-6 w-6 text-blue-500" />
        )}
        <p className="mt-3 text-sm text-center truncate max-w-full">
          {resource.title}
        </p>
        {resource.type === "link" && (
          <div className="mt-2">
            <p className="text-xs text-gray-600 mb-1 truncate max-w-full">
              {resource.url}
            </p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Visitar enlace
            </a>
          </div>
        )}
        {resource.type === "file" && resource.fileExtension && (
          <Badge variant="outline" className="mt-2 text-xs px-2">
            {resource.fileExtension.toUpperCase()}
          </Badge>
        )}
      </div>
    );
  };
  if (resource.type === "link") {
    return (
      <Card
        className="overflow-hidden border shadow-sm relative group h-[160px] py-0 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all"
        onClick={() => {
          if (resource.url && resource.url.trim() !== "") {
            const url =
              resource.url.startsWith("http://") ||
              resource.url.startsWith("https://")
                ? resource.url
                : `https://${resource.url}`;
            window.open(url, "_blank");
          }
        }}
      >
        <CardContent className="p-0 h-full">{renderCardContent()}</CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card
        className="overflow-hidden border shadow-sm relative group h-[160px] py-0 cursor-pointer hover:border-primary/40 hover:shadow-md transition-all"
        onClick={() => {
          setPreviewKey((prev) => prev + 1);
          setIsPreviewOpen(true);
        }}
      >
        <CardContent className="p-0 h-full">{renderCardContent()}</CardContent>
      </Card>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="p-0 max-w-[95vw] max-h-[95vh] border-none bg-transparent shadow-none">
          {fileType === "image" ? (
            <ImageViewer
              key={`image-${previewKey}`}
              src={resource.url || "/placeholder.svg"}
              alt={resource.title}
            />
          ) : fileType === "pdf" ? (
            <PDFViewer
              key={`pdf-${previewKey}`}
              url={resource.url}
              title={resource.title}
            />
          ) : fileType === "video" ? (
            <VideoPlayer
              key={`video-${previewKey}`}
              src={resource.url}
              title={resource.title}
              poster="/video-thumbnail.png"
            />
          ) : fileType === "audio" ? (
            <AudioPlayer
              key={`audio-${previewKey}`}
              src={resource.url}
              title={resource.title}
            />
          ) : (
            <div className="bg-black/90 p-10 rounded-lg text-center">
              {getFileIcon(resource.fileExtension)}
              <h3 className="text-white text-lg font-medium mb-2 mt-4">
                {resource.title}
              </h3>
              <p className="text-gray-300 mb-6">
                Vista previa no disponible para este tipo de archivo
              </p>
              <Button
                variant="secondary"
                onClick={() => window.open(resource.url, "_blank")}
              >
                Abrir en nueva pestaña
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
