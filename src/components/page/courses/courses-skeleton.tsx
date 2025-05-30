"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden py-0">
      <div className="h-32 relative bg-gradient-to-r from-blue-400/30 to-blue-500/30 animate-pulse">
        <div className="absolute bottom-2 left-2">
          <Skeleton className="h-6 w-24 rounded" />
        </div>
      </div>

      <CardHeader className="pb-8">
        <Skeleton className="h-5 w-4/5 mb-2" />

        <div className="space-y-1">
          <Skeleton className="h-3 w-3/5" />
        </div>
      </CardHeader>
    </Card>
  );
}
