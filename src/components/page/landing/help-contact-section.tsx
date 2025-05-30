import { ArrowRight, Mail, MessageSquare, Users } from "lucide-react";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HelpContactSection() {
  return (
    <section id="ayuda-contacto" className="py-20 bg-white dark:bg-gray-950">
      <div className="w-full px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Ayuda y Contacto</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para apoyarte en cada paso de tu viaje de aprendizaje.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-border/40 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="mb-4 mx-auto p-3 rounded-full bg-blue-100/50 dark:bg-blue-900/20 w-fit">
              <MessageSquare className="size-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Preguntas Frecuentes</h3>
            <p className="text-muted-foreground mb-4">
              Encuentra respuestas a las dudas más comunes sobre nuestra
              plataforma y cursos.
            </p>
            <Link href="/help#faq">
              <Button variant="outline" className="rounded-full">
                Ver FAQ
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-border/40 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="mb-4 mx-auto p-3 rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 w-fit">
              <Users className="size-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sobre Nosotros</h3>
            <p className="text-muted-foreground mb-4">
              Conoce nuestra misión, visión y el equipo detrás de Brainup.
            </p>
            <Link href="/help#equipo">
              <Button variant="outline" className="rounded-full">
                Conócenos
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-border/40 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="mb-4 mx-auto p-3 rounded-full bg-purple-100/50 dark:bg-purple-900/20 w-fit">
              <Mail className="size-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Contacto</h3>
            <p className="text-muted-foreground mb-4">
              ¿Tienes alguna pregunta específica? Nuestro equipo está listo para
              ayudarte.
            </p>
            <Link href="/help#contacto">
              <Button variant="outline" className="rounded-full">
                Contáctanos
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
