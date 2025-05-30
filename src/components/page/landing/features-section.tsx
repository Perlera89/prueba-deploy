import { motion } from "framer-motion";
import { Award, BookOpen, Clock, GraduationCap, Users } from "lucide-react";

const features = [
  {
    title: "Cursos Interactivos",
    description:
      "Aprende con contenido multimedia, ejercicios prácticos y evaluaciones en tiempo real.",
    icon: <BookOpen className="size-5" />,
    color:
      "from-blue-500/20 to-blue-600/20 dark:from-blue-500/10 dark:to-blue-600/10",
    iconColor: "text-blue-600 dark:text-blue-500",
  },
  {
    title: "Profesores Expertos",
    description:
      "Aprende de profesionales y académicos con amplia experiencia en sus campos.",
    icon: <GraduationCap className="size-5" />,
    color:
      "from-blue-700/20 to-blue-800/20 dark:from-blue-700/10 dark:to-blue-800/10",
    iconColor: "text-blue-700 dark:text-blue-600",
  },
  {
    title: "Comunidad Estudiantil",
    description:
      "Conecta con otros estudiantes para colaborar, resolver dudas y formar grupos de estudio.",
    icon: <Users className="size-5" />,
    color:
      "from-sky-500/20 to-sky-600/20 dark:from-sky-500/10 dark:to-sky-600/10",
    iconColor: "text-sky-600 dark:text-sky-500",
  },
  {
    title: "Certificaciones Oficiales",
    description:
      "Obtén certificados reconocidos que potenciarán tu currículum académico y profesional.",
    icon: <Award className="size-5" />,
    color:
      "from-blue-400/20 to-blue-500/20 dark:from-blue-400/10 dark:to-blue-500/10",
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    title: "Aprendizaje Flexible",
    description:
      "Estudia a tu ritmo con acceso 24/7 a todos los materiales del curso desde cualquier dispositivo.",
    icon: <Clock className="size-5" />,
    color:
      "from-blue-600/20 to-blue-700/20 dark:from-blue-600/10 dark:to-blue-700/10",
    iconColor: "text-blue-600 dark:text-blue-500",
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

  // Dividir las características en dos filas cuando hay exactamente 5 elementos
  const firstRow = features.length === 5 ? features.slice(0, 3) : features;
  const secondRow = features.length === 5 ? features.slice(3) : [];

  return (
    <section
      id="caracteristicas"
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
          <h2 className="text-3xl font-bold mb-4">
            Características Principales
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nuestra plataforma ofrece todo lo que necesitas para una experiencia
            de aprendizaje completa y efectiva.
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
          {firstRow.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="p-6 rounded-xl border border-border/40 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div
                className={`mb-4 mx-auto p-4 rounded-full bg-gradient-to-br ${feature.color} w-fit`}
              >
                <div className={`${feature.iconColor}`}>{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
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
            {secondRow.map((feature, index) => (
              <motion.div
                key={index + firstRow.length}
                variants={item}
                className="p-6 rounded-xl border border-border/40 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div
                  className={`mb-4 mx-auto p-4 rounded-full bg-gradient-to-br ${feature.color} w-fit`}
                >
                  <div className={`${feature.iconColor}`}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
