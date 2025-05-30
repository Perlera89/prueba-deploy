import { motion } from "framer-motion";
import { PenTool, Video, Users, Lightbulb, Laptop } from "lucide-react";

const methodologies = [
  {
    title: "Metodologías de Enseñanza",
    description:
      "Combinamos métodos modernos y herramientas interactivas para lograr un aprendizaje efectivo y duradero.",
    icon: <Lightbulb className="size-6" />,
    color:
      "from-blue-500/20 to-blue-600/20 dark:from-blue-500/10 dark:to-blue-600/10",
    iconColor: "text-[#3b82f6] dark:text-[#4f46e5]",
  },
  {
    title: "Aprendizaje Colaborativo",
    description:
      "Un método que permite que los estudiantes puedan aprender a través de la participación en la resolución de problemas de la vida real.",
    icon: <Users className="size-6" />,
    color:
      "from-indigo-500/20 to-indigo-600/20 dark:from-indigo-500/10 dark:to-indigo-600/10",
    iconColor: "text-[#6366f1] dark:text-[#8b5cf6]",
  },
  {
    title: "Aprendizaje Basado en Proyectos",
    description:
      "Permite a los estudiantes poder desarrollarse a través del desarrollo de actividades de la vida real",
    icon: <PenTool className="size-6" />,
    color:
      "from-violet-500/20 to-violet-600/20 dark:from-violet-500/10 dark:to-violet-600/10",
    iconColor: "text-[#8b5cf6] dark:text-[#7c3aed]",
  },
  {
    title: "Contenido Multimedia",
    description:
      "A través de diferentes componentes digitales, ya sean audios, vídeos, animaciones, entre otros recursos, los estudiantes van adquirir conocimiento y mejorar su comprensión.",
    icon: <Video className="size-6" />,
    color:
      "from-sky-500/20 to-sky-600/20 dark:from-sky-500/10 dark:to-sky-600/10",
    iconColor: "text-[#0ea5e9] dark:text-[#0284c7]",
  },
  {
    title: "Tutorías Personalizadas",
    description:
      "Permite que cada estudiante pueda recibir atención personalizada acorde a sus necesidades.",
    icon: <Laptop className="size-6" />,
    color:
      "from-blue-600/20 to-blue-700/20 dark:from-blue-600/10 dark:to-blue-700/10",
    iconColor: "text-[#2563eb] dark:text-[#1d4ed8]",
  },
];

export default function MethodologySection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Dividir las metodologías en dos filas cuando hay exactamente 5 elementos
  const firstRow =
    methodologies.length === 5 ? methodologies.slice(0, 3) : methodologies;
  const secondRow = methodologies.length === 5 ? methodologies.slice(3) : [];

  return (
    <section
      id="metodologia"
      className="py-20 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-gray-950 dark:via-indigo-950/10 dark:to-gray-950"
    >
      <div className="w-full px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Metodologías de Enseñanza</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nuestros métodos educativos combinan lo mejor de la pedagogía
            moderna para garantizar un aprendizaje efectivo y duradero.
          </p>
        </motion.div>

        {/* Primera fila */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          {firstRow.map((methodology, index) => (
            <motion.div
              key={index}
              variants={item}
              className="p-6 rounded-xl border border-border/40 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div
                className={`mb-4 mx-auto p-4 rounded-full bg-gradient-to-br ${methodology.color} w-fit`}
              >
                <div className={`${methodology.iconColor}`}>
                  {methodology.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {methodology.title}
              </h3>
              <p className="text-muted-foreground">{methodology.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Segunda fila (solo se muestra cuando hay 5 elementos) */}
        {secondRow.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            {secondRow.map((methodology, index) => (
              <motion.div
                key={index + firstRow.length}
                variants={item}
                className="p-6 rounded-xl border border-border/40 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div
                  className={`mb-4 mx-auto p-4 rounded-full bg-gradient-to-br ${methodology.color} w-fit`}
                >
                  <div className={`${methodology.iconColor}`}>
                    {methodology.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {methodology.title}
                </h3>
                <p className="text-muted-foreground">
                  {methodology.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
