import { Card, CardHeader } from "../../../ui/card";

// components/discussion/DiscussionSkeleton.tsx
export function DiscussionSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="pb-4 border-b">
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-muted"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
          </div>
        </CardHeader>
        <div className="p-4">
          <div className="h-5 bg-muted rounded w-1/3 mb-4"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-muted"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full mb-1"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
