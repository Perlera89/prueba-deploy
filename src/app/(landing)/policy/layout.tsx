"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/display/mode-toggle";

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Asegurar que la página se cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Montar componente para tema
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 flex items-center border-b border-gray-100 dark:border-gray-800 sticky top-0 backdrop-blur-md z-30">
        <div className="container max-w-screen-xl mx-auto flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Brain className="size-4" />
            </div>
            Brainup
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/policy/terms"
              className={`text-sm font-medium border-b-2 transition-colors ${
                pathname === "/policy/terms"
                  ? "border-primary text-foreground"
                  : "border-transparent hover:border-primary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              Términos
            </Link>
            <Link
              href="/policy/privacy"
              className={`text-sm font-medium border-b-2 transition-colors ${
                pathname === "/policy/privacy"
                  ? "border-primary text-foreground"
                  : "border-transparent hover:border-primary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              Privacidad
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Botón para volver arriba */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 size-10 rounded-full bg-primary/10 text-primary shadow-sm flex items-center justify-center hover:bg-primary/20 transition-colors"
            onClick={scrollToTop}
          >
            <ArrowUp className="size-4" />
            <span className="sr-only">Volver arriba</span>
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="mt-auto py-8 px-6 border-t border-gray-100 dark:border-gray-800">
        <div className="container max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2 font-medium mb-4"
              >
                <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                  B
                </div>
                <span>Brainup</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                Plataforma educativa diseñada para estudiantes universitarios
                que buscan expandir sus conocimientos.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cursos"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cursos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre-nosotros"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/policy/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policy/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policy/cookies"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Política de cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Brainup. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
