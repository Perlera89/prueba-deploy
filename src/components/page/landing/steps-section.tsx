import { ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function StepsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 dark:from-blue-950/20 dark:via-background dark:to-blue-950/10">
      <div className="w-full px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">¿Cómo funciona?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comienza tu viaje de aprendizaje en Brainup en simples pasos
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center relative w-full md:w-1/4"
          >
            <div className="mb-4 mx-auto">
              <div className="size-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
                <div className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <div className="hidden md:block absolute top-8 left-[calc(50%+1rem)] right-0 h-1 bg-blue-500"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              Regístrate
            </h3>
            <p className="text-muted-foreground">
              Crea tu cuenta en minutos y accede a nuestra plataforma educativa
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center relative w-full md:w-1/4"
          >
            <div className="mb-4 mx-auto">
              <div className="size-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto">
                <div className="size-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <div className="hidden md:block absolute top-8 left-[calc(50%+1rem)] right-0 h-1 bg-indigo-500"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
              Explora cursos
            </h3>
            <p className="text-muted-foreground">
              Navega por nuestro catálogo y encuentra los cursos que te
              interesan
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center relative w-full md:w-1/4"
          >
            <div className="mb-4 mx-auto">
              <div className="size-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto">
                <div className="size-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div className="hidden md:block absolute top-8 left-[calc(50%+1rem)] right-0 h-1 bg-purple-500"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-400">
              Inscríbete
            </h3>
            <p className="text-muted-foreground">
              Selecciona tus cursos, inscríbete y comienza tu aprendizaje
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center relative w-full md:w-1/4"
          >
            <div className="mb-4 mx-auto">
              <div className="size-16 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mx-auto">
                <div className="size-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
                  4
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-pink-600 dark:text-pink-400">
              Obtén certificación
            </h3>
            <p className="text-muted-foreground">
              Completa los cursos y recibe certificados reconocidos para validar
              tu conocimiento
            </p>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/auth/register">
            <Button size="lg" className="rounded-full">
              Comenzar ahora
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
