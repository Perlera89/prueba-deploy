import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonAssignment() {
    return (
        <Card>
            <CardContent>
                <div className="space-y-6">
                    {/* Tarjeta de calificación general */}
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                            <Skeleton className="h-5 w-[180px] mb-2" />
                            <Skeleton className="h-4 w-[240px]" />
                        </div>
                        <div className="text-right">
                            <Skeleton className="h-8 w-16 mb-2 ml-auto" />
                            <Skeleton className="h-4 w-8 ml-auto" />
                        </div>
                    </div>

                    {/* Buscador */}
                    <Skeleton className="h-10 w-full rounded-md" />

                    {/* Tabla de calificaciones */}
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-muted/70">
                                    <th className="p-3">
                                        <Skeleton className="h-4 w-24" />
                                    </th>
                                    <th className="p-3">
                                        <Skeleton className="h-4 w-16" />
                                    </th>
                                    <th className="p-3">
                                        <Skeleton className="h-4 w-28" />
                                    </th>
                                    <th className="p-3">
                                        <Skeleton className="h-4 w-20" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {Array(5).fill(0).map((_, index) => (
                                    <tr key={index}>
                                        <td className="p-3">
                                            <Skeleton className="h-5 w-[140px]" />
                                        </td>
                                        <td className="p-3">
                                            <Skeleton className="h-5 w-[80px]" />
                                        </td>
                                        <td className="p-3">
                                            <Skeleton className="h-5 w-[60px]" />
                                        </td>
                                        <td className="p-3">
                                            <Skeleton className="h-8 w-[100px] rounded-md" />
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