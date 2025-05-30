// components/forum/ForumPostSkeleton.tsx
export function ForumPostSkeleton() {
    return (
        <div className="p-4 border border-border rounded-lg">
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                    <div>
                        <div className="h-4 w-24 bg-muted rounded animate-pulse mb-1"></div>
                        <div className="h-3 w-16 bg-muted rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="h-5 w-16 bg-muted rounded-full animate-pulse"></div>
            </div>
            <div className="h-5 w-3/4 bg-muted rounded animate-pulse mb-2 mt-2"></div>
            <div className="space-y-1.5 mb-3">
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
            </div>
        </div>
    );
}