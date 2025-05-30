"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInitials } from "@/utils/initials";
import { useFetchActiveStudets } from "@/hooks/use-active-student";
import { useCourseStore } from "@/store/course";
import { StudentCardSkeleton } from "../../courses/skeleton/merbers-skeleton";
import { Users, Mail } from "lucide-react";

interface PaginationMeta {
  total: number;
  active: number;
  inactive: number;
  page: number;
  limit: number;
  pages: number;
}

interface Student {
  id: string | number;
  names: string;
  email: string;
  state: string;
  imagePerfil?: string;
}

interface StudentsResponse {
  students: Student[];
  meta: PaginationMeta;
}

export default function StudentsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const courseCode = useCourseStore((state) => state.course.courseCode);
  const {
    data = {
      students: [],
      meta: { total: 0, pages: 1, active: 0, inactive: 0, page: 1, limit: 10 },
    } as StudentsResponse,
    isLoading,
  } = useFetchActiveStudets(currentPage, itemsPerPage, courseCode);

  const students = data.students || [];
  const pagination = data.meta || {
    total: 0,
    pages: 1,
    active: 0,
    inactive: 0,
    page: 1,
    limit: 10,
  };

  const [totalEstudiantes, setTotalEstudiantes] = useState<number>(0);
  useEffect(() => {
    if (pagination.total > 0 && pagination.total !== totalEstudiantes) {
      setTotalEstudiantes(pagination.total);
    }
  }, [pagination.total, totalEstudiantes]);

  const totalStudents = pagination.total || students.length;

  const totalPages =
    pagination.pages || Math.ceil(totalStudents / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("ellipsis");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("ellipsis");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle>Estudiantes</CardTitle>{" "}
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  Total: {totalStudents}
                </Badge>
                &nbsp;
                <Badge variant="secondary">
                  <span className="inline-flex items-center justify-center w-1.5 h-1.5 text-xs font-bold text-white bg-green-500 rounded-full mr-1"></span>
                  Activos:&nbsp;
                  {pagination.active ||
                    students.filter(
                      (status: Student) => status.state === "active"
                    ).length}
                </Badge>
              </div>
            </div>
            <CardDescription>
              Estudiantes inscritos en este curso
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array(9)
              .fill(null)
              .map((_, index) => <StudentCardSkeleton key={index} />)
            : students.map((student: Student) => (
              <StudentCard key={student.id} student={student} />
            ))}
        </div>
        {pagination.pages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Mostrar</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={handleItemsPerPageChange}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground text-sm">por página</span>
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {getPageNumbers().map(
                  (pageNum: number | string, idx: number) =>
                    pageNum === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${idx}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => handlePageChange(pageNum as number)}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    )
                )}{" "}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < (pagination.pages || totalPages) &&
                      handlePageChange(currentPage + 1)
                    }
                    className={
                      currentPage === (pagination.pages || totalPages)
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>{" "}
            <div className="text-muted-foreground text-sm">
              Mostrando{" "}
              {pagination.page
                ? (pagination.page - 1) * pagination.limit + 1
                : 1}
              -
              {pagination.page
                ? Math.min(pagination.page * pagination.limit, pagination.total)
                : Math.min(itemsPerPage, totalStudents)}{" "}
              de {pagination.total} estudiantes
              {pagination.limit && (
                <span> ({pagination.limit} por página)</span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StudentCard({ student }: { student: Student }) {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg">
      <Avatar className="h-12 w-12">
        <AvatarImage
          className="object-cover"
          src={student.imagePerfil || "/avatar-fallback.png"}
          alt={student.names}
        />
        <AvatarFallback>{getInitials(student.names)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{student.names}</p>
          {student.state === "active" ? (
            <Badge variant="outline">
              <span className="inline-flex items-center justify-center w-1.5 h-1.5 text-xs font-bold text-white bg-green-500 rounded-full mr-1"></span>
              Activo
            </Badge>
          ) : (
            <Badge variant="outline">
              <span className="inline-flex items-center justify-center w-1.5 h-1.5 text-xs font-bold text-white bg-red-500 rounded-full mr-1"></span>
              Inactivo
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1.5 flex-1">
            <Mail className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
            <span className="text-sm text-muted-foreground truncate">
              {student.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
