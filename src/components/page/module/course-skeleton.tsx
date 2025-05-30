"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CourseHeaderSkeleton() {
  return (
    <Card className="mb-6 py-0 relative">
      <CardContent className="p-0 rounded-t-xl">
        <div className="w-full h-32 bg-gray-200 animate-pulse rounded-t-xl relative" />

        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <div className="flex flex-wrap gap-2 mt-2">
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ModuleCardSkeleton() {
  return (
    <Card className="mb-4 hover:border-primary/50 transition-all">
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex flex-col items-end gap-2 min-w-[100px]">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CoursePageSkeleton() {
  return (
    <div className="w-full px-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-28" />
      </div>

      <CourseHeaderSkeleton />

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <ModuleCardSkeleton key={index} />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}
