import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnnouncementSkeleton() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Anuncios del Curso</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((announcement) => (
            <div
              key={announcement}
              className="border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-2 h-2 rounded-lg" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
              <div className="mt-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  );
}
