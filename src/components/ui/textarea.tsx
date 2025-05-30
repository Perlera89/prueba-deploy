import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  maxLength,
  onChange,
  ...props
}: React.ComponentProps<"textarea"> & { maxLength?: number }) {
  const [charCount, setCharCount] = React.useState(0);

  // Inicializar el conteo de caracteres con el valor inicial
  React.useEffect(() => {
    if (props.value && typeof props.value === "string") {
      setCharCount(props.value.length);
    } else if (props.defaultValue && typeof props.defaultValue === "string") {
      setCharCount(props.defaultValue.length);
    }
  }, [props.value, props.defaultValue]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(event.target.value.length);
    // Llamar al onChange original si existe
    onChange?.(event);
  };

  return (
    <div className="relative">
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 aria-invalid:outline-destructive/60 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none md:text-sm dark:aria-invalid:focus-visible:ring-4",
          className
        )}
        maxLength={maxLength}
        onChange={handleChange}
        {...props}
      />
      {maxLength && (
        <div className="absolute bottom-1 right-2 text-sm text-muted-foreground">
          {charCount}/{maxLength}
        </div>
      )}
    </div>
  );
}

export { Textarea };
