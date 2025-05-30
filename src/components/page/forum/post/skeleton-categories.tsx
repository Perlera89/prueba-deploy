import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCategoriesCard() {
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Categorías</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {/* Simular 4 categorías en carga */}
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-between p-2">
                            {/* Nombre de categoría */}
                            <Skeleton className="h-4 w-24 rounded-sm" />

                            {/* Badge de contador */}
                            <Skeleton className="h-5 w-8 rounded-full" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}