"use client";
import { useFetchInstructors } from "@/hooks/use-instructor";
import {
  InstructorList,
  NoInstructors,
} from "@/components/page/instructor/instructors";
import { columns } from "@/components/page/instructor/columns";
import SkeletonItem from "@/components/page/instructor/skeleton-table";
import InstructorFormModal from "@/components/page/instructor/instructor-form-modal";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useBreadcrumbStore } from "@/store/breadcrumb";

export default function StudentsPage() {
  const { setItems } = useBreadcrumbStore();

  const {
    data: instructors = [],
    isLoading,
    isFetched,
  } = useFetchInstructors();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setItems([
      { label: "Inicio", href: "/home" },
      { label: "Instructores", href: "/instructor" },
    ]);

    return () => {
      useBreadcrumbStore.getState().resetItems();
    };
  }, []);

  return (
    <div className="w-full px-6">
      <div className="flex gap-2 items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <Users />
          <h2 className="text-2xl font-semibold">Instructores</h2>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Agregar Instructor
        </Button>
      </div>

      <InstructorFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
      {isLoading && <SkeletonItem buttonTitle="Instructor" />}
      {isFetched && instructors.length > 0 && (
        <InstructorList instructors={instructors} columns={columns} />
      )}
      {isFetched && instructors.length === 0 && !isLoading && <NoInstructors />}
    </div>
  );
}
