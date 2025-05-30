import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Calendar, Eye, EyeOff, Book } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UserRole, type Content } from "@/types";
import { ContentView } from "./content-view";
import { CommentSection } from "./commet-section";
import dayjs from "dayjs";
import { MarkdownRenderer } from "@/components/display/markdown-renderer";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth";
import { useCourseStore } from "@/store/course";
import { useModuleStore } from "@/store/module";

interface ContentContainerProps {
  content: any;
}

export default function ContentContainer({ content }: ContentContainerProps) {
  const router = useRouter();

  const roleUser = useAuthStore((state) => state.user?.role);
  const isStudent = roleUser === UserRole.STUDENT;
  const courseId = useCourseStore((state) => state.course.id);
  const moduleId = useModuleStore((state) => state.module.id);
  const handleEdit = () => {
    if (content) {
      router.push(
        `/courses/${courseId}/${moduleId}/edit-material/${content.id}`
      );
    }
  };

  return (
    <main className="w-full px-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al Módulo
        </Button>
        {!isStudent && (
          <div className="flex items-center gap-3">
            <Button onClick={handleEdit} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar Material
            </Button>
          </div>
        )}
      </div>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <div className="bg-muted p-6 flex justify-between items-center">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Book className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{content.title}</h1>
              <div className="flex items-center text-muted-foreground text-sm gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    Actualizado:&nbsp;
                    {dayjs(content.updatedAt)
                      .locale("es")
                      .format("D [de] MMMM YYYY")}
                    &nbsp;•&nbsp;
                    {dayjs(content.updatedAt).locale("es").format("HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-blue-500/10 text-blue-500 border-blue-500/20"
            >
              {content.assignment?.score} pts
            </Badge>
            <Badge variant={content.isVisible ? "default" : "destructive"}>
              {content.isVisible ? (
                <>
                  <Eye className="h-6 w-6" />
                  Visible
                </>
              ) : (
                <>
                  <EyeOff className="h-6 w-6" />
                  Oculto
                </>
              )}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          {content.description && (
            <>
              <MarkdownRenderer>{content.description}</MarkdownRenderer>
              <Separator className="my-6" />
            </>
          )}

          <ContentView content={content} />
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border p-6">
        <CommentSection contentId={content.id} contentType={content.contentType} />
      </div>
    </main>
  );
}
