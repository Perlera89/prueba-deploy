import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "../../../ui/button";
import {
  ArrowLeft,
  FileText,
  Info,
  MessageSquare,
  Users,
} from "lucide-react";
import SectionSkeleton from "./section-skeleton";
import ActivitySkeleton from "./activities-skeleton";
import AnnouncementSkeleton from "./announcement-skeleton";

export default function CourseLoading() {
  return (
    <div className="w-full px-6">
      <div className="flex justify-between mb-6">
        <Link href="/courses" passHref>
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al Curso
          </Button>
        </Link>
        <Skeleton className="h-10 w-40" />
      </div>
      <Card className="mb-6 pt-0">
        <CardContent className="p-0">
          <Skeleton className="w-full h-32" />
          <div className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
              <div>
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Profesor</p>
                <Skeleton className="h-5 w-32 mt-1" />
              </div>
              <div>
                <p className="text-muted-foreground">Horario</p>
                <Skeleton className="h-5 w-40 mt-1" />
              </div>
              <div>
                <p className="text-muted-foreground">Progreso</p>
                <div className="flex items-center gap-2 mt-1">
                  <Skeleton className="h-2 flex-1" />
                  <Skeleton className="h-5 w-10" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pestañas */}
      <Tabs defaultValue="contenido" className="mb-6">
        <div className="overflow-x-auto">
          <TabsList className="mb-1">
            <TabsTrigger value="content">
              <FileText />
              Contenido
            </TabsTrigger>
            {/* <TabsTrigger value="rating">
              <SquareCheckBig />
              Calificaciones
            </TabsTrigger> */}
            <TabsTrigger value="forum">
              <MessageSquare />
              Foro
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users />
              Estudiantes
            </TabsTrigger>
            <TabsTrigger value="info">
              <Info />
              Información
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Contenido de las pestañas */}
        <TabsContent value="contenido">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Contenido del Módulo</h2>
                <Skeleton className="h-9 w-32" />
              </div>

              <SectionSkeleton />

              <div className="flex justify-center mt-4">
                <Skeleton className="h-9 w-48" />
              </div>
            </div>

            <div>
              <ActivitySkeleton />

              <AnnouncementSkeleton />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
