"use client";
import { useFetchStudents } from "@/hooks/use-student";
import { StudentsList, NoStudents } from "@/components/page/student/students";
import { columns } from "@/components/page/student/columns";
import SkeletonItem from "@/components/page/student/skeleton-table";
import InstructorFormModal from "@/components/page/instructor/instructor-form-modal";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useBreadcrumbStore } from "@/store/breadcrumb";

export default function StudentsPage() {
  const { setItems } = useBreadcrumbStore();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalStudents, setTotalStudents] = useState(0);

  const {
    data: response = { profiles: [], pagination: { total: 0 } },
    isLoading,
    isFetched,
  } = useFetchStudents(page, limit);
  const students = response?.profiles || [];

  useEffect(() => {
    if (response?.pagination) {
      setTotalStudents(response?.pagination.total || 0);
    }
  }, [response]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setItems([
      { label: "Inicio", href: "/home" },
      { label: "Estudiantes", href: "/students" },
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
          <h2 className="text-2xl font-semibold">Estudiante</h2>
        </div>
      </div>
      <InstructorFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
      {isLoading && <SkeletonItem buttonTitle="Estudiante" />}
      {isFetched && students.length > 0 && (
        <StudentsList
          students={students}
          columns={columns}
          pagination={{
            page,
            limit,
            total: totalStudents,
            onPageChange: (newPage) => setPage(newPage),
            onLimitChange: (newLimit) => {
              setLimit(newLimit);
              setPage(1);
            },
          }}
        />
      )}
      {isFetched && students.length === 0 && !isLoading && <NoStudents />}
    </div>
  );
}
