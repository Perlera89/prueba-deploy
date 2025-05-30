import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Star, Users } from "lucide-react";

const stats = [
  { value: "5K+", label: "Estudiantes", icon: <Users className="size-5" /> },
  { value: "10+", label: "Cursos", icon: <BookOpen className="size-5" /> },
  { value: "95%", label: "Satisfacción", icon: <Star className="size-5" /> },
  {
    value: "20+",
    label: "Profesores",
    icon: <GraduationCap className="size-5" />,
  },
];

export default function StatsSection() {
  return (
    <section className="py-12 bg-white dark:bg-gray-950 border-y border-border/40">
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 p-3 rounded-full bg-blue-100/50 dark:bg-blue-900/20">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
