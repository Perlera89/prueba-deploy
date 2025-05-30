"use client";
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  flexRender,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import SearchBar from "@/components/display/search-bar";
import { DataTableViewOptions } from "./data-table-options";
import { DataTablePagination } from "./data-table-pagination";
import { Inbox } from "lucide-react";

interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  searchColumn: string;
  columnTitles?: Record<string, string>;
  pagination?: PaginationOptions;
  totalCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  searchColumn,
  columnTitles,
  pagination,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: pagination ? pagination.page - 1 : 0,
    pageSize: pagination ? pagination.limit : 10,
  });

  useEffect(() => {
    if (pagination) {
      setPagination({
        pageIndex: pagination.page - 1,
        pageSize: pagination.limit,
      });
    }
  }, [pagination?.page, pagination?.limit]);

  const handlePaginationChange = (updater: any) => {
    setPagination((old) => {
      const newState = typeof updater === "function" ? updater(old) : updater;

      if (pagination) {
        if (old.pageIndex !== newState.pageIndex) {
          pagination.onPageChange(newState.pageIndex + 1);
        }
        if (old.pageSize !== newState.pageSize) {
          pagination.onLimitChange(newState.pageSize);
        }
      }

      return newState;
    });
  };

  const table = useReactTable({
    data,
    columns,
    pageCount: pagination
      ? Math.ceil(pagination.total / pagination.limit)
      : undefined,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: pagination ? undefined : getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: handlePaginationChange,
    manualPagination: !!pagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  return (
    <>
      <div className="flex items-center gap-2 py-4">
        <SearchBar
          placeholder="Buscar nombre..."
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
        />
        <DataTableViewOptions table={table} columnTitles={columnTitles} />
      </div>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-40 text-center"
                >
                  <div className="flex flex-col items-center text-muted-foreground font-semibold gap-1 justify-center h-full">
                    <Inbox />
                    <p>No hay resultados</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} title={title} />
      </div>
    </>
  );
}
