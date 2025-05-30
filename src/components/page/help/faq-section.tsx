import {
  HelpCircle,
  BookOpen,
  CreditCard,
  GraduationCap,
  Users,
  Laptop,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

// Tipo para cada pregunta
type FAQQuestion = {
  question: string;
  answer: string;
};

// Tipo para cada categoría de preguntas
type FAQCategory = {
  id: string;
  label: string;
  icon: React.ReactNode;
  questions: FAQQuestion[];
};

interface FAQSectionProps {
  categories?: FAQCategory[];
}

export default function FAQSection({ categories }: FAQSectionProps) {
  // Si no se proporcionan categorías, usar las predeterminadas
  const faqCategories: FAQCategory[] = categories || [
    {
      id: "general",
      label: "General",
      icon: <HelpCircle className="h-4 w-4" />,
      questions: [
        {
          question: "¿Qué es BrainsLearn?",
          answer:
            "BrainsLearn es una plataforma educativa diseñada específicamente para estudiantes universitarios que buscan complementar su formación académica, mejorar sus habilidades y destacar en su carrera. Ofrecemos cursos interactivos, tutorías personalizadas y certificaciones reconocidas en diversas áreas de estudio.",
        },
        {
          question: "¿Cómo funciona la plataforma?",
          answer:
            "Nuestra plataforma funciona mediante un sistema de aprendizaje flexible que te permite acceder a contenido educativo de alta calidad en cualquier momento y desde cualquier dispositivo. Puedes registrarte, explorar nuestro catálogo de cursos, inscribirte en los que te interesen y comenzar a aprender a tu propio ritmo.",
        },
        {
          question:
            "¿Necesito algún conocimiento previo para usar BrainsLearn?",
          answer:
            "No, BrainsLearn está diseñado para ser accesible para todos los estudiantes universitarios, independientemente de su nivel de conocimiento previo. Ofrecemos cursos para principiantes, intermedios y avanzados, por lo que puedes encontrar contenido adecuado para tu nivel de experiencia.",
        },
        {
          question: "¿Puedo acceder a BrainsLearn desde cualquier dispositivo?",
          answer:
            "Sí, BrainsLearn es completamente responsivo y está optimizado para funcionar en ordenadores, tablets y smartphones. Puedes acceder a tu cuenta y continuar tu aprendizaje desde cualquier dispositivo con conexión a internet.",
        },
      ],
    },
    {
      id: "cursos",
      label: "Cursos",
      icon: <BookOpen className="h-4 w-4" />,
      questions: [
        {
          question: "¿Qué tipos de cursos ofrece BrainsLearn?",
          answer:
            "BrainsLearn ofrece una amplia variedad de cursos en diferentes áreas académicas, incluyendo ingeniería, ciencias, economía, humanidades, diseño, tecnología, y más. Nuestros cursos están diseñados para complementar la educación universitaria y desarrollar habilidades prácticas valoradas en el mercado laboral.",
        },
        {
          question: "¿Cuánto tiempo tengo para completar un curso?",
          answer:
            "Una vez inscrito en un curso, tienes acceso ilimitado a su contenido. No hay plazos estrictos para completarlos, lo que te permite avanzar a tu propio ritmo y adaptar el aprendizaje a tu horario personal y académico.",
        },
        {
          question: "¿Los cursos incluyen proyectos prácticos?",
          answer:
            "Sí, la mayoría de nuestros cursos incluyen proyectos prácticos, ejercicios interactivos y evaluaciones que te permiten aplicar lo aprendido en situaciones reales. Creemos firmemente en el aprendizaje basado en proyectos como método efectivo para consolidar conocimientos.",
        },
        {
          question:
            "¿Puedo descargar el material del curso para estudiarlo sin conexión?",
          answer:
            "Sí, muchos de nuestros cursos ofrecen la posibilidad de descargar materiales como PDFs, presentaciones y recursos complementarios para su estudio sin conexión. Sin embargo, las evaluaciones y actividades interactivas generalmente requieren conexión a internet.",
        },
      ],
    },
    {
      id: "pagos",
      label: "Pagos",
      icon: <CreditCard className="h-4 w-4" />,
      questions: [
        {
          question: "¿Cuánto cuestan los cursos?",
          answer:
            "El precio de los cursos varía según su duración, nivel de especialización y contenido. Ofrecemos opciones desde $39.99 hasta $69.99, con descuentos frecuentes para estudiantes. También contamos con algunos cursos gratuitos y la posibilidad de suscripción mensual para acceso ilimitado.",
        },
        {
          question: "¿Qué métodos de pago aceptan?",
          answer:
            "Aceptamos pagos con tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal, y en algunos países ofrecemos opciones de pago locales. Todas las transacciones están protegidas con encriptación SSL para garantizar la seguridad de tus datos.",
        },
        {
          question: "¿Ofrecen algún tipo de descuento para estudiantes?",
          answer:
            "Sí, ofrecemos descuentos especiales para estudiantes universitarios. Al verificar tu correo electrónico institucional, puedes acceder a precios reducidos en todos nuestros cursos y planes de suscripción.",
        },
        {
          question: "¿Cuál es la política de reembolso?",
          answer:
            "Ofrecemos una garantía de satisfacción con posibilidad de reembolso dentro de los primeros 7 días después de la compra, siempre que no hayas completado más del 30% del contenido del curso. Para solicitar un reembolso, debes contactar a nuestro equipo de soporte.",
        },
      ],
    },
    {
      id: "certificaciones",
      label: "Certificaciones",
      icon: <GraduationCap className="h-4 w-4" />,
      questions: [
        {
          question: "¿Los certificados de BrainsLearn tienen validez oficial?",
          answer:
            "Nuestros certificados son reconocidos por numerosas empresas e instituciones como prueba de desarrollo de habilidades específicas. Si bien no reemplazan títulos universitarios oficiales, son un complemento valioso para tu currículum que demuestra iniciativa y aprendizaje continuo.",
        },
        {
          question: "¿Cómo obtengo un certificado?",
          answer:
            "Para obtener un certificado, debes completar todas las lecciones, aprobar las evaluaciones requeridas y alcanzar la puntuación mínima establecida para el curso. Una vez cumplidos estos requisitos, podrás descargar tu certificado digital inmediatamente desde tu perfil.",
        },
        {
          question: "¿Los certificados tienen fecha de caducidad?",
          answer:
            "No, los certificados no tienen fecha de caducidad. Una vez obtenidos, son tuyos permanentemente y puedes utilizarlos en tu currículum o perfil profesional sin limitaciones temporales.",
        },
        {
          question: "¿Puedo obtener un certificado físico?",
          answer:
            "Actualmente ofrecemos certificados digitales que puedes imprimir en alta calidad. Por un costo adicional, también podemos enviar certificados físicos impresos en papel premium a tu dirección postal.",
        },
      ],
    },
    {
      id: "cuenta",
      label: "Cuenta",
      icon: <Users className="h-4 w-4" />,
      questions: [
        {
          question: "¿Cómo creo una cuenta en BrainsLearn?",
          answer:
            "Crear una cuenta es muy sencillo. Haz clic en 'Registrarse' en la página principal, completa el formulario con tus datos personales y dirección de correo electrónico, crea una contraseña segura y acepta los términos y condiciones. También puedes registrarte rápidamente usando tu cuenta de Google o Microsoft.",
        },
        {
          question: "¿Cómo puedo recuperar mi contraseña?",
          answer:
            "Si olvidaste tu contraseña, haz clic en 'Olvidé mi contraseña' en la página de inicio de sesión. Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña. Por seguridad, este enlace expira después de 24 horas.",
        },
        {
          question: "¿Puedo cambiar mi dirección de correo electrónico?",
          answer:
            "Sí, puedes cambiar tu dirección de correo electrónico desde la configuración de tu cuenta. Ten en cuenta que deberás verificar la nueva dirección antes de que el cambio sea efectivo, y que algunas funciones pueden estar temporalmente limitadas durante este proceso.",
        },
        {
          question: "¿Cómo puedo eliminar mi cuenta?",
          answer:
            "Si deseas eliminar tu cuenta, puedes hacerlo desde la configuración de tu perfil. Ten en cuenta que esta acción es irreversible y perderás acceso a todos tus cursos, certificados y progreso. Te recomendamos descargar tus certificados antes de proceder con la eliminación.",
        },
      ],
    },
    {
      id: "tecnico",
      label: "Soporte Técnico",
      icon: <Laptop className="h-4 w-4" />,
      questions: [
        {
          question: "¿Qué hago si un curso no carga correctamente?",
          answer:
            "Si experimentas problemas con la carga de un curso, te recomendamos: 1) Actualizar la página, 2) Borrar la caché del navegador, 3) Probar con otro navegador, 4) Verificar tu conexión a internet. Si el problema persiste, contacta a nuestro equipo de soporte técnico con detalles específicos del problema.",
        },
        {
          question: "¿Qué navegadores son compatibles con BrainsLearn?",
          answer:
            "BrainsLearn es compatible con las versiones recientes de Chrome, Firefox, Safari, Edge y Opera. Para una experiencia óptima, recomendamos mantener tu navegador actualizado a la última versión disponible.",
        },
        {
          question: "¿La plataforma funciona bien en conexiones lentas?",
          answer:
            "Hemos optimizado BrainsLearn para funcionar incluso con conexiones de internet moderadas. Los videos se adaptan automáticamente a la velocidad de tu conexión, y muchos recursos pueden descargarse para uso sin conexión. Sin embargo, para funcionalidades interactivas y streaming de video, recomendamos una conexión estable.",
        },
        {
          question: "¿Tienen una aplicación móvil?",
          answer:
            "Actualmente, BrainsLearn está disponible como una aplicación web responsiva que funciona perfectamente en dispositivos móviles a través del navegador. Estamos desarrollando aplicaciones nativas para iOS y Android que estarán disponibles próximamente, con funcionalidades adicionales como aprendizaje sin conexión.",
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-4 inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Preguntas Frecuentes
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-4 text-3xl font-bold"
        >
          Resolviendo tus dudas
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-muted-foreground"
        >
          Encuentra respuestas a las preguntas más comunes sobre nuestra
          plataforma, cursos, pagos y más. Si no encuentras lo que buscas, no
          dudes en contactarnos.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-6">
        <div className="md:col-span-2">
          <div className="mb-6 space-y-4 rounded-xl p-6 bg-muted/30">
            <h3 className="text-lg font-semibold">Categorías</h3>
            <nav className="space-y-2">
              {faqCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <span>{category.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="space-y-12">
            {faqCategories.map((category) => (
              <motion.div
                key={category.id}
                id={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{category.label}</h3>
                </div>

                <div className="rounded-lg border bg-card">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.id}-item-${index}`}
                      >
                        <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3 pt-1 text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
