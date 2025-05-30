"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { InstructorProfile } from "@/types";

import { DataTableColumnHeader } from "@/components/display/data-table-column";
import { Button } from "@/components/ui/button";
import InstructorFormModal from "./instructor-form-modal";
import InstructorDetailModal from "./instructor-detail-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<InstructorProfile>[] = [
  {
    id: "imagePerfil",
    accessorKey: "Perfil",
    accessorFn: (row) => row.imagePerfil,
    cell: ({ row }) => {
      const instructor = row.original;
      const initials = instructor.names
        ? instructor.names.charAt(0) +
          (instructor.surnames ? instructor.surnames.charAt(0) : "")
        : "IN";

      return (
        <div className="flex justify-start">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={instructor.imagePerfil || ""}
              alt={`${instructor.names} ${instructor.surnames}`}
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
    accessorKey: "instructorCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("instructorCode") as string;
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
    accessorKey: "thelephone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("thelephone") as string;
      return value || "-";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const instructor = row.original;
      const [openViewModal, setOpenViewModal] = useState(false);
      const [openEditModal, setOpenEditModal] = useState(false);
      const [isOpenMenu, setIsOpenMenu] = useState(false);

      return (
        <>
          <div className="flex gap-1 justify-end">
            <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setOpenViewModal(true);
                    setIsOpenMenu(false);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver detalles
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setOpenEditModal(true);
                    setIsOpenMenu(false);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {openEditModal && (
            <InstructorFormModal
              instructor={instructor}
              isOpen={openEditModal}
              onClose={() => setOpenEditModal(false)}
              onSuccess={() => setOpenEditModal(false)}
            />
          )}

          {openViewModal && (
            <InstructorDetailModal
              instructor={instructor}
              isOpen={openViewModal}
              onClose={() => setOpenViewModal(false)}
            />
          )}
        </>
      );
    },
  },
];
