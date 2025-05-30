import { MessageSquare } from "lucide-react";
import { Card } from "../../../ui/card";

export function NotFoundDiscussion() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden p-8 text-center">
        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium mb-2">
          No se encontró la discusión
        </h3>
      </Card>
    </div>
  );
}
