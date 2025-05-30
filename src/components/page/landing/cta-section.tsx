import { ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="w-full px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para comenzar tu viaje de refuerzo y aprendizaje?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Únete a nuestra comunidad de estudiantes y transforma tu futuro
              con conocimientos y habilidades que marcarán la diferencia.
            </p>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="rounded-full">
                Comenzar ahora
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
