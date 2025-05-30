import Image from "next/image";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import InstructorInfoDialog from "./instructor-info-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

interface Instructor {
  index: number;
  name: string;
  role: string;
  image?: string;
  description: string;
  specialties: string[];
  courses: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    web?: string;
    tiktok?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

const instructors = [
  {
    index: 1,
    name: "Katherine Adriana Cortez Ramirez",
    role: "Instructora de Sociales",
    image: "/instructors/adriana.jpg",
    description:
      "Estudiante de Jurisprudencia y Ciencias Sociales. Graduada de Relaciones Internacionales.",
    specialties: [
      "Ciencias Sociales",
      "Historia Universal",
      "Relaciones Internacionales",
    ],
    courses: ["Ciencias Sociales"],
    social: {
      tiktok: "https://www.tiktok.com/@adriicortez5?_t=ZM-8wR5GALLURR&_r=1",
      instagram: "https://www.instagram.com/adriic__83?igsh=aHQ0aHJ6aDVkYjNh",
      facebook: "https://www.facebook.com/AdriiCrtzz",
    },
  },
  {
    index: 2,
    name: "Esteban Elí Ventura Iraheta",
    role: "Instructor de Matemáticas",
    image: "/instructors/esteban.jpg",
    description:
      "Instructor y coordinador en el área de matemáticas con sólida experiencia en la formación académica de estudiantes de nuevo ingreso, participando de forma continua desde 2020 hasta 2024 en cursos de nivelación matemática",
    specialties: ["Lógica Matemática", "Geometría", "Estadística"],
    courses: ["Lógica Matemática", "Geometría", "Estadística", "Precálculo"],
    social: {
      facebook: "https://www.facebook.com/share/15kbVDYXQW/",
      youtube: "https://youtube.com/@esteveir5444?si=6x1tM7p_1jhUUenO",
      instagram:
        "https://www.instagram.com/esteveir_ve_wr?igsh=YnpwbTUzOHRlbHlt",
    },
  },
  {
    index: 3,
    name: "Juan Carlos Flores Díaz",
    role: "Instructor de Lenguaje y Literatura",
    image: "/instructors/juan-carlos.jpg",
    description:
      "Instructor en Lenguaje y Literatura en tercer ciclo de educación media y bachillerato. Ha participado como voluntario en el proceso de nuevo ingreso 2025 en la Universidad de El Salvador, impartiendo la asignatura de Lenguaje y Literatura.",
    specialties: [
      "Investigación Literaria",
      "Didáctica de la Lengua",
      "Análisis Literario",
      "Análisis de obras literarias",
    ],
    courses: ["Lenguaje y Literatura"],
    social: {
      instagram:
        "https://www.instagram.com/juanca.diaz99?utm_source=qr&igsh=Nmc2Ym05bjV3NWp1",
      youtube: "https://youtube.com/@juancalles9828?si=t-FS8gaY9VXQabJy",
      tiktok: "https://www.tiktok.com/@juancalles90?_t=ZM-8wk1BF71Fri&_r=1",
    },
  },
  {
    index: 4,
    name: "Karla Beatriz Gonzalez Romero",
    role: "Instructora de Química",
    image: "/instructors/karla.jpg",
    description:
      "Voluntaria de Ciencias Químicas en la Institución  Centro Clavis, con una gran experiencia en Biología, Química, auxiliar de docente durante 6 meses en Ciencias Naturales en un Instituto Educativo.",
    specialties: ["Química General", "Química Orgánica", "Química Inorgánica"],
    courses: ["Química", "Física", "Lenguaje y Literatura"],
    social: {
      youtube:
        "https://youtube.com/@karlabeatrizgonzalezromero9766?si=LSBreqI89PcJCcWq",
      instagram:
        "https://www.instagram.com/karla_bea.gonzalez?utm_source=qr&igsh=cmUzYm1uZGlsaTl3",
    },
  },
  {
    index: 5,
    name: "Maria de Los Angeles Guerrero de Rodriguez",
    role: "Instructora de Física",
    image: "/instructors/maria.jpg",
    description:
      "Lic. en ensenanza de ciencias naturales. Docente de tercer ciclo de educacion basica y media, con una experiencia de 23 años en la docencia.",
    specialties: ["Física Clásica", "Mecánica", "Termodinámica"],
    courses: ["Química", "Biología", "Física"],
    social: {
      linkedin: "#",
      twitter: "#",
      web: "#",
    },
  },
  {
    index: 6,
    name: "Marlon De Jesus Murillo Mancia",
    role: "Instructor de Estadística",
    image: "/instructors/marlon.jpg",
    description:
      "Instructor en estadística,docente de tercer ciclo de educación media y bachillerato, participante de varios cursos sobre didáctica de la matemática y pruebas estandarizadas, representante estudiantil ante CSU en la universidad de El Salvador.",
    specialties: [
      "Estadística Avanzada",
      "Análisis de Datos",
      "Matemática Aplicada",
    ],
    courses: ["Matemáticas básicas", "Estadística", "Lógica Matemática"],
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    index: 7,
    name: "Raul Enrique Rivera Ayala",
    role: "Instructor de Biología",
    image: "/instructors/raul.jpg",
    description:
      "Especialista en sistemas integrados de gestión de calidad, medio ambiente y seguridad ocupacional, educador de las Academias Sabatinas Departamentales para nivel I y V, he sido voluntario para el proceso de nuevo ingreso 2025 en la Universidad de El Salvador, impartiendo la asignatura de Biología.",
    specialties: ["Zoología", "Ecología", "Botánica", "Biología Celular"],
    courses: ["Biología"],
    social: {
      instagram:
        "https://www.instagram.com/yuyo_sv?utm_source=qr&igsh=MWIzb3lieXh0NW1jaw==",
      tiktok: "https://www.tiktok.com/@raulrivera5687?_t=ZM-8wk94K1Epq1&_r=1",
      linkedin:
        "https://www.linkedin.com/in/ra%C3%BAl-enrique-rivera-ayala-190885a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  {
    index: 8,
    name: "Karen Rivera",
    role: "Instructora de Inglés",
    image: "/instructors/vanessa.jpg",
    description:
      "Licenciada en Biología y MSc. en sistemas integrados de gestión de calidad. Bióloga en formación con especialización en biotecnología y un aprendizaje autodidacta avanzado en inglés que me ha permitido desarrollar un enfoque de enseñanza innovador y centrado en la práctica. Como docente de inglés para principiantes, me enfoco en metodologías comunicativas que promueven la participación activa, la confianza y el uso real del idioma, creando un ambiente inclusivo y motivador para que los estudiantes aprendan con seguridad y entusiasmo.",
    specialties: [
      "Inglés Comunicativo",
      "Gramática Inglesa",
      "Comprensión Auditiva en Inglés",
    ],
    courses: ["Inglés"],
    social: {
      linkedin: "https://www.linkedin.com/in/karen-rivera-a9b2b7302/",
    },
  },
];

export default function InstructorsSection() {
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);

  return (
    <section id="instructores" className="py-20 bg-white dark:bg-gray-950">
      <div className="w-full px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Nuestros Instructores</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aprende de profesionales y académicos con amplia experiencia en sus
            respectivos campos.
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
            {instructors.map((instructor, index) => (
              <CarouselItem
                key={instructor.index}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group rounded-xl border border-border/40 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={instructor.image || "/placeholder.svg"}
                      alt={instructor.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-300"
                      style={{ objectPosition: "center center" }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                      {instructor.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                      {instructor.role}
                    </p>
                    <p className="text-sm line-clamp-2 mb-3">
                      {instructor.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedInstructor(instructor)}
                    >
                      Ver perfil
                    </Button>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>{" "}
          <div className="flex justify-center mt-6 gap-4">
            <CarouselPrevious className="position-static" />
            <CarouselNext className="position-static" />
          </div>
        </Carousel>
      </div>
      {selectedInstructor && (
        <InstructorInfoDialog
          selectedInstructor={selectedInstructor}
          setSelectedInstructor={setSelectedInstructor}
        />
      )}
    </section>
  );
}
