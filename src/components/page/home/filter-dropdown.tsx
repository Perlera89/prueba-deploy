"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

// Valores predeterminados para los filtros
const DEFAULT_CATEGORY = "Todas";
const DEFAULT_PRICE_RANGE = "all";
const DEFAULT_ENROLLMENT_STATUS = "all";
const DEFAULT_COURSE_STATUS = "all";

interface Category {
  id: string | number;
  name: string;
}

interface FilterDropdownProps {
  tempCategory: string;
  setTempCategory: (category: string) => void;
  tempPriceRange: string;
  setTempPriceRange: (range: string) => void;
  tempEnrollmentStatus: string;
  setTempEnrollmentStatus: (status: string) => void;
  tempCourseStatus: string;
  setTempCourseStatus: (status: string) => void;
  selectedCategory: string;
  priceRange: string;
  enrollmentStatus: string;
  courseStatus: string;
  hasAppliedFilters: boolean;
  applyFilters: () => void;
  resetFilters: () => void;
  categories: Category[];
}

export function FilterDropdown({
  tempCategory,
  setTempCategory,
  tempPriceRange,
  setTempPriceRange,
  tempEnrollmentStatus,
  setTempEnrollmentStatus,
  tempCourseStatus,
  setTempCourseStatus,
  selectedCategory,
  priceRange,
  enrollmentStatus,
  courseStatus,
  hasAppliedFilters,
  applyFilters,
  resetFilters,
  categories,
}: FilterDropdownProps) {
  // Obtener texto para el botón de filtros
  const getFilterButtonText = () => {
    const activeFilters = [];

    if (selectedCategory !== DEFAULT_CATEGORY) {
      activeFilters.push(`Categoría: ${selectedCategory}`);
    }

    if (priceRange !== DEFAULT_PRICE_RANGE) {
      const priceText = {
        free: "Gratis",
        paid: "De pago",
        under30: "Menos de $30",
        "30to50": "$30 - $50",
        over50: "Más de $50",
      }[priceRange];
      activeFilters.push(`Precio: ${priceText}`);
    }

    if (enrollmentStatus !== DEFAULT_ENROLLMENT_STATUS) {
      const statusText = {
        enrolled: "Inscrito",
        "not-enrolled": "No inscrito",
      }[enrollmentStatus];
      activeFilters.push(`Estado: ${statusText}`);
    }

    if (courseStatus !== DEFAULT_COURSE_STATUS) {
      const courseStatusText = {
        coming_soon: "Próximamente",
        open_inscription: "Inscripciones abiertas",
        in_progress: "En progreso",
        completed: "Completado",
      }[courseStatus];
      activeFilters.push(`Estado del curso: ${courseStatusText}`);
    }

    return activeFilters.length > 0 && "Filtros";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span>{getFilterButtonText()}</span>
          {hasAppliedFilters && (
            <Badge
              variant="secondary"
              className="ml-1 rounded-full h-5 w-5 p-0 flex items-center justify-center"
            >
              {(selectedCategory !== DEFAULT_CATEGORY ? 1 : 0) +
                (priceRange !== DEFAULT_PRICE_RANGE ? 1 : 0) +
                (enrollmentStatus !== DEFAULT_ENROLLMENT_STATUS ? 1 : 0) +
                (courseStatus !== DEFAULT_COURSE_STATUS ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4">
        <div className="space-y-4">
          {/* Filtro de Categoría */}
          <div>
            <h4 className="font-medium mb-2">Categoría</h4>
            <Select value={tempCategory} onValueChange={setTempCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Todas">Todas</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro de Precio */}
          <div>
            <h4 className="font-medium mb-2">Precio</h4>
            <Select value={tempPriceRange} onValueChange={setTempPriceRange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Rango de precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos los precios</SelectItem>
                  <SelectItem value="free">Gratis</SelectItem>
                  <SelectItem value="paid">De pago</SelectItem>
                  <SelectItem value="under30">Menos de $30</SelectItem>
                  <SelectItem value="30to50">$30 - $50</SelectItem>
                  <SelectItem value="over50">Más de $50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro de Estado de inscripción */}
          <div>
            <h4 className="font-medium mb-2">Estado de inscripción</h4>
            <Select
              value={tempEnrollmentStatus}
              onValueChange={setTempEnrollmentStatus}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Estado de inscripción" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos los cursos</SelectItem>
                  <SelectItem value="enrolled">Inscrito</SelectItem>
                  <SelectItem value="not-enrolled">No inscrito</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro de Estado del curso */}
          <div>
            <h4 className="font-medium mb-2">Estado del curso</h4>
            <Select
              value={tempCourseStatus}
              onValueChange={setTempCourseStatus}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Estado del curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="coming_soon">Próximamente</SelectItem>
                  <SelectItem value="open_inscription">
                    Inscripciones abiertas
                  </SelectItem>
                  <SelectItem value="in_progress">En progreso</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Restablecer
            </Button>
            <Button size="sm" onClick={applyFilters}>
              Aplicar filtros
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
