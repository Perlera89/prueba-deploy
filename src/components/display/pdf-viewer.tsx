"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize,
  Minimize,
  Search,
  Printer,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PDFViewerProps {
  url: string;
  title?: string;
}

export function PDFViewer({ url, title }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Inicializar el visor
  useEffect(() => {
    const checkIframeLoaded = () => {
      if (iframeRef.current) {
        setIsLoading(false);

        // Aquí habría que implementar una solución para obtener el número real de páginas
        // Por ejemplo, usando la API de PDF.js o algún mensaje de comunicación con el iframe
        // Por ahora, mantenemos un valor por defecto hasta que se pueda implementar
        setTotalPages(0);
      }
    };

    const timer = setTimeout(checkIframeLoaded, 1500);
    return () => clearTimeout(timer);
  }, [url]);

  // Manejar el modo pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Manejar la tecla Escape para cerrar el diálogo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isFullscreen) {
        // Aquí no cerramos directamente, pero podemos disparar un evento personalizado
        // que el componente padre puede escuchar para cerrar el diálogo
        containerRef.current?.dispatchEvent(
          new CustomEvent("escapePressed", { bubbles: true })
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Navegar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // En una implementación real, aquí navegaríamos a la página anterior en el PDF
    }
  };

  // Navegar a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages || totalPages === 0) {
      setCurrentPage(currentPage + 1);
      // En una implementación real, aquí navegaríamos a la página siguiente en el PDF
    }
  };

  // Cambiar el zoom
  const zoomIn = () => {
    setScale(Math.min(scale + 0.25, 3));
  };

  const zoomOut = () => {
    setScale(Math.max(scale - 0.25, 0.5));
  };

  // Rotar el PDF
  const rotate = () => {
    setRotation((rotation + 90) % 360);
  };

  // Ir a una página específica
  const goToPage = (page: number) => {
    if (page >= 1 && (page <= totalPages || totalPages === 0)) {
      setCurrentPage(page);
      // En una implementación real, aquí navegaríamos a la página específica en el PDF
    }
  };

  // Manejar cambio en la barra de progreso
  const handleProgressChange = (value: number[]) => {
    const page = Math.round(value[0]);
    goToPage(page);
  };

  // Manejar la búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // En una implementación real, aquí buscaríamos el texto en el PDF
    }
  };

  // Construir la URL con parámetros para el iframe
  const buildPdfUrl = () => {
    // En una implementación real, podríamos pasar parámetros a PDF.js
    // Por ahora, solo añadimos un parámetro para evitar la caché
    return `${url}#page=${currentPage}&zoom=${scale}&toolbar=0&view=FitH`;
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full h-[80vh] bg-black/90 rounded-md overflow-hidden mt-10"
    >
      {/* Barra de herramientas superior */}
      <div className="flex items-center justify-between bg-black/80 p-3 border-b border-gray-700">
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 text-white mr-2" />
          <h3 className="text-white font-medium truncate max-w-[200px]">
            {title || "Documento PDF"}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Buscar en el documento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={() => window.open(url, "_blank")}
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Imprimir documento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize className="h-4 w-4" />
                  ) : (
                    <Maximize className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isFullscreen
                    ? "Salir de pantalla completa"
                    : "Pantalla completa"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Barra de búsqueda */}
      {showSearch && (
        <div className="bg-black/80 p-3 border-b border-gray-700">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Buscar en el documento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
            />
            <Button type="submit" variant="secondary" size="sm">
              Buscar
            </Button>
          </form>
        </div>
      )}

      {/* Contenedor principal del PDF */}
      <div className="flex-1 relative overflow-hidden bg-gray-900">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={buildPdfUrl()}
          className={cn(
            "w-full h-full border-0 transition-transform duration-300",
            rotation === 90 && "rotate-90",
            rotation === 180 && "rotate-180",
            rotation === 270 && "-rotate-90"
          )}
          style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
          title={title || "PDF Viewer"}
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Barra de herramientas inferior */}
      <div className="bg-black/80 p-3 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/10"
                    onClick={prevPage}
                    disabled={currentPage <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Página anterior</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center space-x-1 text-white text-sm">
              <Input
                type="number"
                min={1}
                value={currentPage}
                onChange={(e) => goToPage(Number.parseInt(e.target.value) || 1)}
                className="w-12 h-8 bg-white/10 border-gray-700 text-center text-white"
              />
              {totalPages > 0 && (
                <span className="whitespace-nowrap">de {totalPages}</span>
              )}
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/10"
                    onClick={nextPage}
                    disabled={totalPages > 0 && currentPage >= totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Página siguiente</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex-1 mx-4">
            {totalPages > 0 && (
              <Slider
                value={[currentPage]}
                min={1}
                max={totalPages}
                step={1}
                onValueChange={handleProgressChange}
                disabled={totalPages <= 1}
                className="h-1"
              />
            )}
          </div>

          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/10"
                    onClick={zoomOut}
                    disabled={scale <= 0.5}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reducir</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="text-white text-xs w-12 text-center">
              {Math.round(scale * 100)}%
            </span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/10"
                    onClick={zoomIn}
                    disabled={scale >= 3}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ampliar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/10"
                    onClick={rotate}
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rotar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
