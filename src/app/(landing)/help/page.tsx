"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, Users } from "lucide-react";
import FloatingIconsBackground from "@/components/display/floating-icons";
import FAQSection from "@/components/page/help/faq-section";
import ContactSection from "@/components/page/help/contact-section";
import TeamSection from "@/components/page/help/team-section";

export default function AyudaContactoPage() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 px-20 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              B
            </div>
            <span>BrainsLearn</span>
          </Link>

          <nav className="hidden gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Inicio
            </Link>
            <Link
              href="/#cursos"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Cursos
            </Link>
            <Link
              href="/#metodologia"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Metodología
            </Link>
            <Link
              href="/help"
              className="border-b-2 border-primary text-sm font-medium text-foreground transition-colors"
            >
              Ayuda y Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:block"
            >
              Iniciar sesión
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="rounded-full">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pl-40 pr-20 overflow-hidden bg-muted/10 py-16 md:py-24">
          <div className=""></div>
          <FloatingIconsBackground />

          {/* Animated background elements */}
          <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-blob rounded-full bg-primary/5 opacity-70 mix-blend-multiply blur-3xl filter"></div>
          <div className="absolute bottom-1/3 right-1/4 h-72 w-72 animate-blob animation-delay-2000 rounded-full bg-blue-300/10 opacity-70 mix-blend-multiply blur-3xl filter dark:bg-blue-800/10"></div>

          <div className="w-full relative px-4 md:px-6">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="order-2 flex flex-col space-y-4 text-center md:order-1 md:text-left">
                <Badge
                  variant="secondary"
                  className="mx-auto w-fit rounded-full px-4 py-1.5 text-sm font-medium md:mx-0"
                >
                  Ayuda y Contacto
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  ¿Cómo podemos ayudarte?
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground">
                  Encuentra respuestas a tus preguntas, contacta con nuestro
                  equipo o conoce a las personas detrás de BrainsLearn.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-3 md:justify-start">
                  <a
                    href="#faq"
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Preguntas frecuentes</span>
                  </a>
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contacto</span>
                  </a>
                  <a
                    href="#equipo"
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    <Users className="h-4 w-4" />
                    <span>Nuestro equipo</span>
                  </a>
                </div>
              </div>
              <div className="order-1 flex justify-center md:order-2">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/30 to-blue-600/30 opacity-75 blur-lg"></div>
                  <div className="relative rounded-lg border border-border/40 bg-card p-6 shadow-lg">
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <HelpCircle className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="mx-auto h-2.5 w-24 rounded-full bg-primary/20"></div>
                      <div className="h-2 w-full rounded-full bg-muted"></div>
                      <div className="h-2 w-full rounded-full bg-muted"></div>
                      <div className="h-2 w-3/4 rounded-full bg-muted"></div>
                      <div className="mt-4 h-8 w-full rounded-full bg-primary/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="w-full py-12 md:py-16" id="contenido">
          <div className="w-full px-4 md:px-6">
            <Tabs defaultValue="faq" className="w-full">
              <div className="mb-12 flex justify-center">
                <TabsList>
                  <TabsTrigger
                    value="faq"
                    id="faq"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">
                      Preguntas Frecuentes
                    </span>
                    <span className="sm:hidden">FAQ</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="contacto"
                    id="contacto"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Contacto</span>
                    <span className="sm:hidden">Contacto</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="equipo"
                    id="equipo"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Nuestro Equipo</span>
                    <span className="sm:hidden">Equipo</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* FAQ Content */}
              <TabsContent value="faq" className="w-full">
                <div className="mx-auto max-w-5xl">
                  <FAQSection />
                </div>
              </TabsContent>

              {/* Contacto Content */}
              <TabsContent value="contacto" className="w-full">
                <div className="mx-auto max-w-5xl">
                  <ContactSection />
                </div>
              </TabsContent>

              {/* Equipo Content */}
              <TabsContent value="equipo" className="w-full">
                <div className="mx-auto max-w-6xl">
                  <TeamSection />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 py-10 px-4 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  B
                </div>
                <span>BrainsLearn</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Potencia tu aprendizaje con nuestra plataforma educativa
                diseñada para estudiantes universitarios. Mejora tus habilidades
                y destaca en tu carrera académica.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Plataforma</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/#cursos"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Cursos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#metodologia"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Metodología
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Certificaciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Para Instituciones
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/ayuda-contacto"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Tutoriales
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Blog Educativo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ayuda-contacto"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Soporte
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/ayuda-contacto?tab=equipo"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Trabaja con Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policy/privacy"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policy/terms"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Términos de Servicio
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} BrainsLearn. Todos los derechos
              reservados.
            </p>
            <div className="flex gap-4">
              <Link
                href="/policy/privacy"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/policy/terms"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Términos de Servicio
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
