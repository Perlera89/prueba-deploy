import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonItem({ buttonTitle }: { buttonTitle: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          className="max-w-sm"
          placeholder="Buscar nombre..."
          type="search"
          disabled
        />
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-7 gap-4 p-4 border-b bg-muted/50">
          {[1, 2, 3, 4, 5, 6, 7].map((header) => (
            <div key={header} className="font-medium">
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
        {[1, 2, 3].map((row) => (
          <div key={row} className="grid grid-cols-7 gap-4 p-4 border-b">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <Skeleton className="h-8 w-16" />
          </Select>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((btn) => (
              <Skeleton key={btn} className="h-8 w-8" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
