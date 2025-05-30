"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { Student } from "@/types";

import { DataTableColumnHeader } from "@/components/display/data-table-column";
import { Button } from "@/components/ui/button";
import InstructorDetailModal from "./student-detail-modal";

import { Eye } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Student>[] = [
  {
    id: "imagePerfil",
    accessorKey: "Perfil",
    cell: ({ row }) => {
      const student = row.original;
      const initials = student.names
        ? student.names.charAt(0) +
          (student.surnames ? student.surnames.charAt(0) : "")
        : "IN";

      return (
        <div className="flex justify-start">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={student.imagePerfil}
              alt={`${student.names} ${student.surnames}`}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "studentCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("studentCode") as string;
      return value || "-";
    },
  },
  {
    accessorKey: "names",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombres" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("names") as string;
      return value || "-";
    },
  },
  {
    accessorKey: "surnames",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellidos" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("surnames") as string;
      return value || "-";
    },
  },
  {
    accessorKey: "email",
    accessorFn: (row) => row.user?.email,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correo" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("email") as string;
      return value || "-";
    },
  },
  {
    accessorKey: "isActive",
    accessorFn: (row) => row.user?.isActive,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const isActive = row.original.user?.isActive ?? false;
      return (
        <Badge
          variant={isActive ? "default" : "destructive"}
          className="flex items-center gap-1"
        >
          <span>{isActive ? "Activo" : "Inactivo"}</span>
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      const [openViewModal, setOpenViewModal] = useState(false);

      return (
        <>
          <div className="flex items-center justify-center">
            <Button
              onClick={() => setOpenViewModal(true)}
              variant="ghost"
              size="icon"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>

          {openViewModal && (
            <InstructorDetailModal
              student={student}
              isOpen={openViewModal}
              onClose={() => setOpenViewModal(false)}
            />
          )}
        </>
      );
    },
  },
];
