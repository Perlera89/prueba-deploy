"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetPage?: () => void;
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  resetPage,
}: SearchBarProps) {
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Si existe la función resetPage, la llamamos cuando cambia la búsqueda
    if (resetPage) {
      resetPage();
    }
  };

  return (
    <div className="relative flex-1 md:flex-none">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar cursos..."
        className="pl-8 w-full md:w-64"
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  );
}
