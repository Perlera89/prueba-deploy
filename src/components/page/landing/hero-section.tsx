import { ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import FloatingIconsBackground from "../../display/floating-icons";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 dark:from-blue-950/20 dark:via-background dark:to-blue-950/10 py-20 md:py-32">
      <div className="absolute inset-0">
        <FloatingIconsBackground />
      </div>
      <div className="w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Potencia tu aprendizaje con&nbsp;
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-700 to-primary/70">
              BrainsLearn
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Plataforma educativa diseñada para estudiantes que buscan expandir y
            reforzar sus conocimientos y habilidades con cursos interactivos y
            certificaciones reconocidas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="rounded-full">
                Explorar Cursos
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/help">
              <Button size="lg" variant="outline" className="rounded-full">
                Conocer más
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-0 right-[10%] w-72 h-72 bg-blue-400/30 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-[20%] w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-[50%] w-72 h-72 bg-indigo-600/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
}
