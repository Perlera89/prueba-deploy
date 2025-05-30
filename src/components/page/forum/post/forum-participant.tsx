// components/forum/ParticipantCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/initials";
import { Student } from "@/types";
import { Users } from "lucide-react"; // Importar icono de usuarios

interface ParticipantCardProps {
    participant: Student[];
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Participantes Activos</CardTitle>
            </CardHeader>
            <CardContent>
                {participant.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <div className="bg-muted/40 rounded-full p-3 mb-3">
                            <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                            No hay participantes activos
                        </p>
                        <p className="text-xs text-muted-foreground/70 max-w-[200px]">
                            Los estudiantes aparecerán aquí cuando se registren en el curso
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {participant.map((person, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={
                                            person.imagePerfil
                                        }
                                        alt={person.names}
                                    />
                                    <AvatarFallback>
                                        {getInitials(person.names + person.surnames)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{person.names}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {person.state === "active" ? "Activo" : "Inactivo"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}