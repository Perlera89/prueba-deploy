import { Skeleton } from "@/components/ui/skeleton";

// Exporta el StudentCardSkeleton para poder usarlo individualmente
export function StudentCardSkeleton() {
    return (
        <div className="flex items-center gap-3 p-4 border rounded-lg">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-40" />
            </div>
        </div>
    );
}
