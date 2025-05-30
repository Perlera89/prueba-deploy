import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Course } from "./home-container";
import { CourseDialog } from "./course-dialog";
import { Eye, CheckCircle, Clock, LockOpen, LoaderCircle } from "lucide-react";
import { PaymentButtonWithLoading } from "./payment-button-with-loading";
import { truncateText } from "@/utils/truncate-text";

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string | number) => void;
  processingCourseId?: string | number | null;
  userRole?: string;
}

export function CourseCard({
  course,
  onEnroll,
  processingCourseId,
  userRole,
}: CourseCardProps) {
  const showPriceButton = userRole === "student";
  return (
    <Card className="overflow-hidden py-0 hover:bg-muted hover:transition-colors flex flex-col !gap-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-32 relative overflow-hidden">
        <Image
          src={course.picture?.url ? course.picture.url : "/placeholder.svg"}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-background/80">
            {course.category?.name || "Sin categoría"}
          </Badge>
        </div>
        {course.enrolled && (
          <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
            Inscrito
          </div>
        )}
        <div className="absolute bottom-2 right-2">
          <Badge
            variant="secondary"
            className="bg-black/70 text-white border-none"
          >
            {course.modulesCount || 0} módulos
          </Badge>
        </div>
      </div>
      <CardHeader className="px-4 pb-1 pt-3">
        <CardTitle className="text-base whitespace-nowrap overflow-hidden text-ellipsis">
          {truncateText(course.title, 25)}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-1.5">
        <CardDescription className="text-xs flex items-center gap-1.5 w-full">
          {(() => {
            switch (course.status) {
              case "completed":
                return <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />;
              case "in_progress":
                return <LoaderCircle className="h-3.5 w-3.5 flex-shrink-0" />;
              case "open_inscription":
                return <LockOpen className="h-3.5 w-3.5 flex-shrink-0" />;
              case "coming_soon":
                return <Clock className="h-3.5 w-3.5 flex-shrink-0" />;
              default:
                return <LockOpen className="h-3.5 w-3.5 flex-shrink-0" />;
            }
          })()}
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {(() => {
              switch (course.status) {
                case "completed":
                  return "Curso completado";
                case "in_progress":
                  return "En progreso";
                case "open_inscription":
                  return "Inscripción abierta";
                case "coming_soon":
                  return "Próximamente";
                default:
                  return "Inscripción abierta";
              }
            })()}
          </span>
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-auto px-4 py-3">
        {course.enrolled ? (
          <Button variant="outline" className="w-full h-9" asChild>
            <Link href={`/courses/${course.id}`}>Ir al curso</Link>
          </Button>
        ) : (
          <div className="flex w-full gap-2">
            {course.status !== "coming_soon" && showPriceButton && (
              <PaymentButtonWithLoading
                price={course.price}
                onClick={() => Promise.resolve(onEnroll(course.id))}
                className="flex-grow shrink min-w-0 h-9"
              />
            )}
            <CourseDialog course={course} onEnroll={onEnroll}>
              <Button
                variant="outline"
                size="default"
                className={`flex items-center gap-1 px-3 h-9 ${course.status === "coming_soon" || !showPriceButton ? "w-full" : "flex-shrink-0 whitespace-nowrap"}`}
                disabled={processingCourseId === course.id}
              >
                <Eye className="h-4 w-4" />
                <span>Ver</span>
              </Button>
            </CourseDialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
