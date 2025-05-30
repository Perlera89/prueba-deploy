import type { ColumnDef } from "@tanstack/react-table";
import type { Student } from "@/types";
import { H3, Muted } from "@/components/display/typography";
import { DataTable } from "../../display/data-table";

interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

interface StudentsListProps {
  students: Student[];
  columns: ColumnDef<Student>[];
  pagination?: PaginationOptions;
}

export function StudentsList({
  students,
  columns,
  pagination,
}: StudentsListProps) {
  return (
    <>
      <DataTable
        columns={columns}
        data={students}
        title="Estudiantes"
        searchColumn="names"
        columnTitles={{
          imagePerfil: "Imagen",
          studentCode: "Código",
          names: "Nombres",
          surnames: "Apellidos",
          email: "Correo Electrónico",
          isActive: "Activo",
        }}
        pagination={pagination}
        totalCount={pagination?.total || 0}
      />
    </>
  );
}

export function NoStudents() {
  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed shadow-sm h-[87vh] mt-4">
      <div className="flex flex-col items-center gap-1 justify-center h-full">
        <H3>No tienes Estudiantes</H3>
        <Muted>Los estudiantes que se registren aparecerán aquí</Muted>
      </div>
    </div>
  );
}
