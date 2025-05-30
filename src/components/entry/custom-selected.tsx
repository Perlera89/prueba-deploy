"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type Option = {
  value: string;
  label: string;
};

interface CustomSelectProps {
  placeholder?: string;
  initialOptions: Option[];
  initialValue?: string;
  onchange: (value: Option) => void;
  ondelete?: (value: string) => void;
  onCreate?: (value: string) => void;
}

export function CustomSelect({
  placeholder,
  initialOptions = [],
  initialValue,
  onchange,
  ondelete,
  onCreate,
}: CustomSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue || "");
  const [inputValue, setInputValue] = React.useState("");
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [currentEditOption, setCurrentEditOption] =
    React.useState<Option | null>(null);
  const [editValue, setEditValue] = React.useState("");
  // Filtrar opciones basadas en el valor de entrada
  const filteredOptions = inputValue
    ? initialOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )
    : initialOptions;

  // Verificar si el valor de entrada existe en las opciones
  const optionExists = initialOptions.some(
    (option) => option.label.toLowerCase() === inputValue.toLowerCase()
  );

  // Agregar nueva opción
  const addNewOption = () => {
    if (!inputValue.trim()) return;

    const newOption = {
      value: "",
      label: inputValue.trim(),
    };

    onCreate?.(newOption.label);
    //setOptions((prev) => [...prev, newOption])
    onchange(newOption);
    //setValue(newOption.value)
    setInputValue("");
  };

  // Eliminar opción
  const deleteOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    ondelete?.(optionValue);
  };

  // Guardar edición
  const saveEdit = () => {
    if (!currentEditOption || !editValue.trim()) return;

    if (value === currentEditOption.value) {
      const selectedOption = initialOptions.find(
        (option) => option.value === value
      );
      if (selectedOption) {
        setValue(selectedOption.value);
      }
    }

    setEditDialogOpen(false);
    setCurrentEditOption(null);
    setEditValue("");
  };

  // Manejar la tecla Enter para agregar un nuevo elemento
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue && !optionExists) {
      e.preventDefault();
      addNewOption();
    }
  };

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? initialOptions.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={handleKeyDown}
            />
            <CommandList>
              <CommandEmpty>
                {inputValue && !optionExists ? (
                  <div className="px-2 py-3">
                    <button
                      type="button"
                      onClick={addNewOption}
                      className="flex w-full items-center gap-2 rounded-md bg-primary/5 px-3 py-3 text-sm transition-colors hover:bg-primary/10"
                    >
                      <Plus className="h-4 w-4 text-primary" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-foreground">
                          {inputValue}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          No se encontró. Haz clic para agregar
                        </span>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    No se encontraron elementos.
                  </div>
                )}
              </CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      onchange(option);
                      setOpen(false);
                    }}
                    className="group relative"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}

                    <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={(e) => deleteOption(option.value, e)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Diálogo de edición */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar elemento</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Nombre
              </Label>
              <Input
                id="edit-name"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="col-span-3"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveEdit}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
