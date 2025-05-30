import Image from "next/image";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import CourseInfoDialog from "./course-info-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

interface Course {
  title: string;
  category: string;
  image?: string;
  level: string;
  duration: string;
  description: string;
  outcomes: string[];
}

const courses = [
  {
    title: "Biología",
    category: "Ciencias Naturales",
    image: "/courses/biologia.jpg",
    level: "Intermedio",
    duration: "5 meses",
    description:
      "Curso que introduce los principios fundamentales de la biología, el método científico y el estudio de la célula, fomentando el pensamiento científico y analítico. Se abordan temas como la estructura y función de los seres vivos, genética, evolución y ecología, permitiendo comprender la diversidad y complejidad de la vida.",
    outcomes: [
      "Comprender los principios fundamentales de la biología y su importancia en la vida cotidiana.",
      "Identificar las características y funciones de los seres vivos.",
      "Explicar los conceptos básicos de genética y herencia.",
      "Analizar los procesos evolutivos y su impacto en la biodiversidad.",
      "Aplicar conocimientos de ecología para interpretar relaciones entre organismos y su entorno.",
    ],
  },
  {
    title: "Curso de Inglés",
    category: "Idiomas",
    image: "/courses/english.png",
    level: "Básico",
    duration: "15 semanas",
    description:
      "Curso para principiantes enfocado en desarrollar habilidades comunicativas en inglés, con énfasis en la interacción oral y comprensión auditiva en situaciones cotidianas. Incluye actividades prácticas, vocabulario esencial y ejercicios de pronunciación para facilitar el aprendizaje.",
    outcomes: [
      "Comprender y usar expresiones básicas para comunicarse en situaciones comunes.",
      "Participar en conversaciones sencillas sobre temas cotidianos con confianza.",
      "Reconocer y aplicar estructuras gramaticales elementales para expresarse adecuadamente.",
      "Desarrollar habilidades de escucha mediante material audiovisual auténtico.",
      "Mostrar una actitud positiva hacia el aprendizaje continuo del inglés, perdiendo el miedo al error.",
    ],
  },
  {
    title: "Estadística",
    category: "Ciencias Exactas",
    image: "/courses/estadistica.jpg",
    level: "Avanzado",
    duration: "10 semanas",
    description:
      "Curso sobre recolección, organización, análisis e interpretación de datos para la toma de decisiones informadas en diversos campos. Se exploran conceptos de probabilidad, variables, gráficos y métodos estadísticos aplicados a problemas reales.",
    outcomes: [
      "Clasificación de variables discretas y continuas.",
      "Población y muestra.",
      "Tabulación de datos tablas de frecuencia para datos simples y agrupados.",
      "Medidas de tendencia central media, moda y mediana.",
      "Medidas de dispersión.",
      "Coeficiente de variación.",
      "Representación gráfica de datos",
      "Probabilidad",
      "espacio muestral y evento, probabilidad teórica, eventos mutuamente excluyentes, axiomas de Kolmogórov, probabilidad condicional, experimentos repetidos.",
      "Principios de suma y multiplicación",
      "Permutaciones y combinaciones",
      "Diagramas de árbol",
    ],
  },
  {
    title: "Física",
    category: "Ciencias Exactas",
    image: "/courses/fisica.jpg",
    level: "Intermedio",
    duration: "5 meses",
    description:
      "Curso que estudia los fenómenos naturales del universo mediante la observación y medición, abordando conceptos básicos de la física clásica. Incluye temas como el movimiento, fuerzas, energía, leyes de Newton y principios de la termodinámica.",
    outcomes: [
      "Comprender los conceptos básicos de la física clásica.",
      "Analizar el movimiento mediante la cinemática.",
      "Aplicar las leyes de la dinámica en situaciones reales.",
      "Explorar los principios de la termodinámica.",
    ],
  },
  {
    title: "Lenguaje y Literatura",
    category: "Lenguaje",
    image: "/courses/lenguaje.jpg",
    level: "Avanzado",
    duration: "5 meses",
    description:
      "Curso que desarrolla competencias comunicativas y apreciación crítica de la lengua y la literatura a través del análisis y la creación de textos. Se estudian géneros literarios, técnicas de escritura y estrategias de comprensión lectora.",
    outcomes: [
      "Desarrollar habilidades de comprensión lectora.",
      "Mejorar la producción de textos escritos.",
      "Potenciar la expresión oral en diferentes contextos.",
      "Analizar y reflexionar sobre obras literarias.",
      "Comprender el funcionamiento y la estructura del lenguaje.",
      "Fomentar la apreciación y el disfrute de la literatura.",
    ],
  },
  {
    title: "Matemáticas",
    category: "Ciencias Exactas",
    image: "/courses/matematica.jpg",
    level: "Avanzado",
    duration: "5 meses",
    description:
      "Curso que promueve el desarrollo de competencias matemáticas para la resolución de problemas y el razonamiento lógico en distintos contextos. Incluye aritmética, álgebra, geometría, funciones y análisis de datos.",
    outcomes: [
      "Resolver problemas matemáticos aplicando diferentes estrategias.",
      "Comprender y utilizar conceptos de aritmética, álgebra y geometría.",
      "Interpretar y analizar información presentada en gráficos y tablas.",
      "Desarrollar el pensamiento lógico y crítico.",
      "Aplicar las matemáticas en situaciones de la vida cotidiana.",
    ],
  },
  {
    title: "Química",
    category: "Ciencias Exactas",
    image: "/courses/quimica.png",
    level: "Avanzado",
    duration: "5 meses",
    description:
      "Curso que introduce los conceptos fundamentales de la química y su aplicación en la vida cotidiana y el entorno natural. Se abordan temas como la estructura atómica, enlaces químicos, reacciones y propiedades de la materia.",
    outcomes: [
      "Comprender la estructura y propiedades de la materia.",
      "Identificar los principales tipos de enlaces y reacciones químicas.",
      "Aplicar conceptos químicos en situaciones cotidianas.",
      "Analizar el impacto de la química en el medio ambiente.",
      "Desarrollar habilidades experimentales básicas en el laboratorio.",
    ],
  },
  {
    title: "Sociales",
    category: "Ciencias Sociales",
    image: "/courses/sociales.jpg",
    level: "Avanzado",
    duration: "5 meses",
    description:
      "Curso que estudia las estructuras y dinámicas de las sociedades humanas desde una perspectiva interdisciplinaria. Incluye historia, geografía, economía y política, promoviendo el análisis crítico de la realidad social.",
    outcomes: [
      "Surgimiento y Desarrollo de las Ciencias Sociales.",
      "Raíces Históricas del Subdesarrollo.",
      "El conflicto político-militar y los Acuerdos de Paz en El Salvador.",
      "La reforma Neoliberal en El Salvador (1989-2006).",
      "La Dimensión Ecológica de la Transición.",
      "Movimiento Sociales y la Democracia. ",
    ],
  },
];

export default function CoursesSection() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <section id="cursos" className="py-20 bg-white dark:bg-gray-950">
      <div className="w-full px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Cursos Destacados</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra selección de cursos diseñados para potenciar tus
            habilidades y conocimientos.
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {courses.map((course, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group rounded-xl border border-border/40 bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
                >
                  <div className="relative">
                    <span className="absolute top-3 left-3 z-10 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 text-xs font-medium px-3 py-1 rounded-md shadow-sm">
                      {course.category}
                    </span>
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        width={400}
                        height={225}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4 line-clamp-2">
                      {course.title}
                    </h3>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedCourse(course)}
                    >
                      Ver detalles
                    </Button>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6 gap-4">
            <CarouselPrevious className="position-static" />
            <CarouselNext className="position-static" />
          </div>
        </Carousel>
      </div>
      {selectedCourse && (
        <CourseInfoDialog
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      )}
    </section>
  );
}
