import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit } from "lucide-react";

export function PersonalTabSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>
                        Actualiza tu información personal y de contacto
                    </CardDescription>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    disabled
                >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-sm font-medium mb-3">Información Básica</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">Nombre</Label>
                            <Skeleton className="h-5 w-full max-w-[200px]" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Apellido</Label>
                            <Skeleton className="h-5 w-full max-w-[180px]" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="title">Título</Label>
                            <Skeleton className="h-5 w-full max-w-[150px]" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Skeleton className="h-5 w-full max-w-[220px]" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Skeleton className="h-5 w-full max-w-[140px]" />
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-lg font-medium mb-3">Información de Contacto</h3>
                    <div className="space-y-2 mb-4">
                        <Label htmlFor="office">Oficina</Label>
                        <Skeleton className="h-5 w-full max-w-[250px]" />
                    </div>

                    <div className="space-y-2 mb-4">
                        <Label htmlFor="office-hours">Horario de Atención</Label>
                        <Skeleton className="h-5 w-full max-w-[300px]" />
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-lg font-medium mb-3">Biografía Profesional</h3>
                    <div className="space-y-2">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
                <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">Última actualización:</span>
                    <Skeleton className="h-4 w-[180px]" />
                </div>
            </CardFooter>
        </Card>
    );
}

export default PersonalTabSkeleton;