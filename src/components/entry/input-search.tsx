import Fuse from "fuse.js";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface inputSearchProps {
  keys: string[];
  placeholder: string;
  onSearch: (query: any[]) => void;
  options: any[];
  className?: string;
}

export const InputSearch = ({
  keys,
  placeholder,
  onSearch,
  options,
  className,
}: inputSearchProps) => {
  const handleSearch = useDebouncedCallback((e) => {
    if (e.target.value) {
      const useFunse = new Fuse(options, {
        keys,
        threshold: 0.3,
      });

      const result = useFunse.search(e.target.value);

      onSearch(result.map((item) => item.item));
    } else {
      onSearch(options);
    }
  }, 200);

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={handleSearch}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};
