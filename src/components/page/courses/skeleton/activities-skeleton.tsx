import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActivitySkeleton() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <h3 className="text-lg font-medium">Próximas Actividades</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((activity) => (
            <div key={activity} className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-md" />
              <div className="flex-1">
                <Skeleton className="h-5 w-full max-w-[200px] mb-1" />
                <Skeleton className="h-4 w-24" />
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
