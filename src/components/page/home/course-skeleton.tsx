"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden py-0 flex flex-col !gap-0">
      <Skeleton className="h-32 w-full" />

      <CardHeader className="py-6">
        <Skeleton className="h-5 w-full mb-2" />

        <Skeleton className="h-3 w-2/3" />
      </CardHeader>

      <CardFooter className="mt-auto pt-0 pb-4">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

export function CourseListItemSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex">
        <Skeleton className="w-16 h-full" />

        <div className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <Skeleton className="h-5 w-full mb-2 max-w-md" />

              <div className="flex items-center gap-2 mt-1">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>

            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </div>
    </Card>
  );
}
