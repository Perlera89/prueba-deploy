"use client";
import * as React from "react";
import {
  Calendar,
  GraduationCap,
  HelpCircleIcon,
  Home,
  LibraryBig,
  ListIcon,
  SearchIcon,
  Users,
} from "lucide-react";

// import { NavDocuments } from "@/components/layout/nav-documents";
import { NavMain } from "@/components/layout/nav-main";
import { NavSecondary } from "@/components/layout/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const role = useAuthStore((state) => state.user?.role);

  const data = {
    user: {
      name: "username",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Inicio",
        url: "/home",
        icon: Home,
      },
      {
        title: "Mis Cursos",
        url: "/courses",
        icon: ListIcon,
      },
      {
        title: "Calendario",
        url: "/calendar",
        icon: Calendar,
      },
      ...(role === "manager"
        ? [
            {
              title: "Instructores",
              url: "/instructor",
              icon: Users,
            },
            {
              title: "Estudiantes",
              url: "/student",
              icon: GraduationCap,
            },
          ]
        : []),
    ],
    navSecondary: [
      {
        title: "Ayuda",
        url: "#",
        icon: HelpCircleIcon,
      },
      {
        title: "Buscar",
        url: "#",
        icon: SearchIcon,
      },
    ],
    // documents: [
    //   {
    //     name: "Librería",
    //     url: "#",
    //     icon: DatabaseIcon,
    //   },
    //   {
    //     name: "Reportes",
    //     url: "#",
    //     icon: ClipboardListIcon,
    //   },
    //   {
    //     name: "Asistente",
    //     url: "#",
    //     icon: FileIcon,
    //   },
    // ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/home" className="flex items-center gap-2 font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <LibraryBig className="size-5" />
                </div>
                BrainsLearn
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
