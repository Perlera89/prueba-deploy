"use client";

import { useTheme } from "next-themes";
import { Home, BookOpen, ArrowLeft, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FloatingIconsBackground from "@/components/display/floating-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-2xl h-[600px] bg-muted/50 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <FloatingIconsBackground>
        <div className="flex items-center justify-center min-h-screen w-full px-4">
          <Card className="max-w-2xl w-full bg-card/95 backdrop-blur-sm border-border rounded-lg overflow-hidden shadow-xl">
            <CardHeader className="flex flex-col items-center space-y-0 pb-0">
              <h1 className="text-8xl font-bold text-foreground/80 mb-4">
                404
              </h1>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent mb-6"></div>
            </CardHeader>

            <CardContent className="flex flex-col items-center space-y-6 pt-2">
              <h2 className="text-3xl font-bold text-foreground">
                Página no encontrada
              </h2>

              <p className="text-muted-foreground text-center max-w-lg">
                Parece que la página que está buscando no existe. El
                conocimiento que buscas podría estar en otro lugar de nuestra
                plataforma.
              </p>

              <blockquote className="border border-border bg-muted/30 rounded-lg p-4 italic text-muted-foreground text-center w-full">
                "El aprendizaje es un camino con muchas rutas. A veces
                necesitamos explorar un nuevo sendero para encontrar lo que
                buscamos."
              </blockquote>

              <div className="flex flex-wrap justify-center gap-4 w-full">
                <Button onClick={() => router.push("/home")}>
                  <Home className="mr-2 h-4 w-4" />
                  Inicio
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/courses")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Mis Cursos
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Regresar
                </Button>
              </div>

              <div className="text-center space-y-2 w-full">
                <p className="text-sm text-muted-foreground">
                  ¿Buscabas algo específico?
                </p>
                <div className="flex items-center justify-center relative">
                  <Search className="h-4 w-4 text-muted-foreground absolute left-3" />
                  <input
                    type="text"
                    placeholder="Prueba usando el buscador en la página principal"
                    className="pl-10 pr-4 py-2 w-full max-w-md bg-muted/30 border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center pt-2">
              <div className="text-center text-xs text-muted-foreground">
                © 2025 Brainup • Plataforma de Aprendizaje
              </div>
            </CardFooter>
          </Card>
        </div>
      </FloatingIconsBackground>
    </div>
  );
}
