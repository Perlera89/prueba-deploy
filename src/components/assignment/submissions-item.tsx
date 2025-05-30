import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileDown, MessageSquare, Clock, Award, ExternalLink, FileText } from "lucide-react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { AssignmentSubmission } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/initials";

export function SubmissionDetails(details: AssignmentSubmission) {
    const nombreCompleto = `${details.studentProfile?.names} ${details.studentProfile?.surnames}`;

    const getStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50">Pendiente</Badge>;
            case "graded":
                return <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Calificado</Badge>;
            case "late":
                return <Badge className="bg-rose-50 text-rose-700 hover:bg-rose-50">Entrega tardía</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <Card className="w-full border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-3 pt-4">
                <div className="flex items-center gap-3">
                    {details.studentProfile && (
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                {details.studentProfile.imagePerfil ? (
                                    <AvatarImage src={details.studentProfile.imagePerfil} alt={nombreCompleto} />
                                ) : (
                                    <AvatarFallback>{getInitials(nombreCompleto)}</AvatarFallback>
                                )}
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    {nombreCompleto}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {details.studentProfile.email || "Estudiante"}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                {getStatusBadge(details.status)}
            </CardHeader>

            <CardContent className="px-6 pb-5 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-muted/30 rounded-md p-3">
                        <div className="flex items-center mb-1.5 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            <span className="text-xs font-medium">Fecha de entrega</span>
                        </div>
                        <span className="text-sm">
                            {dayjs(details.submittedAt).format("DD MMM YYYY, HH:mm")}
                        </span>
                    </div>

                    <div className="bg-muted/30 rounded-md p-3">
                        <div className="flex items-center mb-1.5 text-muted-foreground">
                            <Award className="h-3.5 w-3.5 mr-1.5" />
                            <span className="text-xs font-medium">Calificación</span>
                        </div>
                        <span className={`text-sm font-medium ${details.quailification ?
                            (details.quailification >= 6 ? "text-emerald-600" : "text-amber-600") : ""
                            }`}>
                            {details.quailification !== null && details.quailification !== undefined
                                ? `${details.quailification}/10`
                                : "Sin calificar"}
                        </span>
                    </div>

                    <div className="bg-muted/30 rounded-md p-3 flex flex-col justify-between">
                        <div className="flex items-center mb-1.5 text-muted-foreground">
                            <FileText className="h-3.5 w-3.5 mr-1.5" />
                            <span className="text-xs font-medium">Acción</span>
                        </div>
                        <Button
                            variant="default"
                            size="sm"
                            className="mt-0.5 w-full justify-center"
                            onClick={() => window.location.href = `/assignments/${details.assignmentId}`}
                        >
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            Ir a tarea
                        </Button>
                    </div>
                </div>

                {details.attachment && (
                    <div className="bg-muted/20 rounded-md p-3 mt-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="text-xs text-muted-foreground mr-1.5 font-medium">Archivo adjunto:</span>
                                <span className="text-xs">
                                    {typeof details.attachment === 'string'
                                        ? details.attachment.split('/').pop()
                                        : 'archivo'}
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => window.open(details.attachment?.toString(), '_blank')}
                            >
                                <FileDown className="h-3.5 w-3.5 mr-1.5" />
                                Descargar
                            </Button>
                        </div>
                    </div>
                )}

                {details.feedback && (
                    <div className="bg-muted/10 rounded-md p-4 border-l-2 border-primary/50 mt-4">
                        <div className="flex items-center mb-2">
                            <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground font-medium">Retroalimentación</span>
                        </div>
                        <div className="text-sm leading-relaxed pl-1">
                            {details.feedback}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
