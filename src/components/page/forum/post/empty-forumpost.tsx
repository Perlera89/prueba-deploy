// components/forum/EmptyForumState.tsx
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useModuleStore } from "@/store/module";
interface EmptyForumStateProps {
  onCreateDiscussion: () => void;
}

export function EmptyForumState({ onCreateDiscussion }: EmptyForumStateProps) {
  const isInstructor = useModuleStore((state) => state.module.isInstructor);
  const role = useAuthStore((state) => state.user?.role);

  return (
    <div className="text-center py-8">
      <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">Aún no hay discusiones</h3>

      {(isInstructor || role === "manager") && (
        <>
          <Button onClick={onCreateDiscussion}>Crear nueva discusión</Button>
        </>
      )}
    </div>
  );
}
