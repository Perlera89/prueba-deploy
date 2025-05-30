import React, { useState } from "react";
import { SlidersHorizontal, Check, X, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CourseCategory } from "@/types";

interface CategoryFilterProps {
  selectedCategories: number[];
  allCategories: CourseCategory[];
  toggleCategory: (categoryId: number) => void;
  clearFilters: () => void;
}

export function CategoryFilter({
  selectedCategories,
  allCategories,
  toggleCategory,
  clearFilters,
}: CategoryFilterProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (categoryId: number, e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCategory(categoryId);
  };

  const handleClearFilters = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearFilters();
  };

  const activeFiltersCount = selectedCategories.length;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filtros</span>
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 rounded-full h-5 w-5 p-0 flex items-center justify-center"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-4">
        {allCategories.length > 0 ? (
          <div className="space-y-1">
            <div className="max-h-[240px] overflow-y-auto">
              <DropdownMenuGroup>
                {allCategories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onSelect={(e) => handleSelect(category.id, e)}
                    className="cursor-pointer flex items-center justify-between"
                  >
                    <span>{category.name}</span>
                    {selectedCategories.includes(category.id) && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleClearFilters}
              variant="destructive"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Borrar filtros
            </DropdownMenuItem>
          </div>
        ) : (
          <div className="text-center py-6">
            <Tag className="h-8 w-8 mx-auto text-muted-foreground opacity-50" />
            <h3 className="mt-3 text-sm font-medium text-muted-foreground">
              No hay categorías
            </h3>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
