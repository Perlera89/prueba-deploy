import type { ColumnDef } from "@tanstack/react-table";
import type { InstructorProfile } from "@/types";
import { H3, Muted } from "@/components/display/typography";
import { Plus, Users } from "lucide-react";
import { Button } from "../../ui/button";
import { DataTable } from "../../display/data-table";
import InstructorFormModal from "./instructor-form-modal";
import { useState } from "react";

interface InstructorListProps {
  instructors: InstructorProfile[];
  columns: ColumnDef<InstructorProfile>[];
}

export function InstructorList({ instructors, columns }: InstructorListProps) {
  return (
    <>
      <DataTable
        columns={columns}
        data={instructors}
        title="Instructores"
        searchColumn="names"
        columnTitles={{
          imagePerfil: "Imagen",
          instructorCode: "Código",
          names: "Nombres",
          surnames: "Apellidos",
          thelephone: "Número de Teléfono",
          email: "Correo Electrónico",
        }}
      />
    </>
  );
}

export function NoInstructors() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed shadow-sm h-[78vh] mt-4">
      <div className="flex flex-col items-center gap-1 justify-center h-full">
        <Users className="h-12 w-12 text-muted-foreground" />
        <H3>No tienes Instructores</H3>
        <Muted>Agrega un nuevo Instructor para comenzar</Muted>{" "}
        <Button className="mt-4">
          <Plus className="mr-2 h-4 w-4" /> Agregar
        </Button>
      </div>

      {openModal && (
        <InstructorFormModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}
