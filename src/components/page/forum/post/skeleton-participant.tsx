import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonParticipantCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Participantes Activos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {/* Simular 5 participantes en carga */}
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {/* Avatar en carga */}
                            <Skeleton className="h-8 w-8 rounded-full" />

                            <div className="flex-1">
                                {/* Nombre en carga */}
                                <Skeleton className="h-4 w-24 mb-1 rounded-sm" />

                                {/* Estado en carga */}
                                <Skeleton className="h-3 w-16 rounded-sm" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}