import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  placeholder = "Buscar cursos...",
  debounceTime = 400,
}: SearchBarProps) {
  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, debounceTime);

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        defaultValue={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-8 w-full"
      />
    </div>
  );
}
