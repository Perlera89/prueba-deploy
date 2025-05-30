"use client";

import { ModeToggle } from "@/components/display/mode-toggle";
import LandingFooter from "@/components/layout/landing-footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, ChevronRight, LibraryBig } from "lucide-react";
import Link from "next/link";
import FloatingIconsBackground from "@/components/display/floating-icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col relative">
      <FloatingIconsBackground />

      <header className="sticky top-0 z-50 w-full px-6 sm:px-12 transition-all duration-300 bg-transparent">
        <div className="w-full flex h-16 items-center justify-between">
          <Link href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LibraryBig className="size-5" />
            </div>
            BrainsLearn
          </Link>

          <div className="flex gap-4 items-center">
            <ModeToggle />

            <Link
              href="/auth/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Iniciar sesión
            </Link>

            <Link href="/auth/register">
              <Button className="rounded-full">
                Registrarse
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center z-10">
        <div className="p-6 md:p-8 max-w-md w-full mx-auto shadow-sm rounded-lg bg-background/80 backdrop-blur-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
