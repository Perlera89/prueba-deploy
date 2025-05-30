import { MessageSquare } from "lucide-react";

export function NoReplies() {
  return (
    <div className="py-8 flex flex-col items-center justify-center text-center">
      <MessageSquare className="h-10 w-10 text-muted-foreground/50 mb-3" />
      <p className="text-muted-foreground font-medium">No hay respuestas todavía</p>
      <p className="text-sm text-muted-foreground mt-1">¡Sé el primero en responder a esta discusión!</p>
    </div>
  );
}