import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  title: string;
}

export function DataTablePagination<TData>({
  table,
  title,
}: DataTablePaginationProps<TData>) {
  //const totalRows = table.getPageCount() * table.getState().pagination.pageSize;
  const isManualPagination = table.options.manualPagination;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between mt-4 px-2">
      <div className="flex-1 text-sm text-muted-foreground my-2 lg:my-0">
        {isManualPagination
          ? `Página ${table.getState().pagination.pageIndex + 1} de ${Math.max(1, table.getPageCount())}`
          : `${table.getFilteredRowModel().rows.length} ${title}`}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por página</p>{" "}
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              const newSize = Number(value);
              table.setPageSize(newSize);
              if (table.options.manualPagination) {
                // Para paginación manual, establecemos también la página a 0
                table.setPageIndex(0);
              }
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ArrowLeftToLine className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ArrowRightToLine className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
