import { motion } from "framer-motion";
import Image from "next/image";
import {
  Users,
  ArrowRight,
  UserPlus,
  Award,
  Laptop,
  GraduationCap,
  Briefcase,
  Code,
  PenTool,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Interfaz para los miembros del equipo
interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TeamSectionProps {
  members?: TeamMember[];
}

export default function TeamSection({ members }: TeamSectionProps) {
  // Si no se proporcionan miembros, usar los predeterminados
  const teamMembers: TeamMember[] = members || [
    {
      name: "David Díaz",
      role: "CEO & Fundadora",
      image: "/professional-woman-glasses.png",
    },
    {
      name: "Sandra de Theodoro",
      role: "Fundadora",
      image: "/professional-woman-glasses.png",
    },
    {
      name: "Jonathan Rodríguez",
      role: "Director Académico",
      image: "/professional-woman-smiling.png",
    },
    {
      name: "Manuel Perlera",
      role: "Proyect Manager",
      image: "/professional-man-glasses.png",
    },
    {
      name: "Roberto Aquino",
      role: "Desarrollador Backend",
      image: "/professional-curly-hair-woman.png",
    },
    {
      name: "Denis López",
      role: "Desarrollador Frontend y Téster",
      image: "/professional-man-suit.png",
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
          <Users className="mr-2 h-4 w-4" />
          Nuestro equipo
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-4 text-3xl font-bold"
        >
          Las personas detrás de BrainsLearn
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-muted-foreground"
        >
          Somos un equipo diverso de educadores, tecnólogos y visionarios
          comprometidos con transformar la educación universitaria a través de
          la tecnología.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="relative h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all group-hover:border-primary/20 group-hover:shadow-lg">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <CardContent className="p-6">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {member.role.includes("CEO") ||
                      member.role.includes("Fundador") ? (
                      <Award className="h-5 w-5" />
                    ) : member.role.includes("CTO") ? (
                      <Laptop className="h-5 w-5" />
                    ) : member.role.includes("Académico") ? (
                      <GraduationCap className="h-5 w-5" />
                    ) : member.role.includes("Manager") ||
                      member.role.includes("Project") ? (
                      <Briefcase className="h-5 w-5" />
                    ) : member.role.includes("Backend") ? (
                      <Code className="h-5 w-5" />
                    ) : member.role.includes("Frontend") ? (
                      <PenTool className="h-5 w-5" />
                    ) : member.role.includes("Téster") ? (
                      <Settings className="h-5 w-5" />
                    ) : (
                      <Users className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/5 via-blue-500/5 to-primary/5 p-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold">
              ¿Quieres unirte a nuestro equipo?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Estamos siempre buscando personas talentosas y apasionadas por la
              educación y la tecnología. Revisa nuestras oportunidades actuales
              y forma parte de la revolución educativa.
            </p>
            <Button className="rounded-full shadow-md transition-all hover:shadow-lg">
              Ver oportunidades laborales
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-xs">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-blue-600/20 opacity-70 blur-lg"></div>
              <div className="relative rounded-lg border border-border/40 bg-card p-6 shadow-lg">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                    <UserPlus className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="space-y-4 text-center">
                  <h4 className="font-bold">Únete a nosotros</h4>
                  <div className="h-2 w-full rounded-full bg-muted"></div>
                  <div className="h-2 w-full rounded-full bg-muted"></div>
                  <div className="h-2 w-3/4 rounded-full bg-muted"></div>
                  <div className="mt-4 h-8 w-full rounded-full bg-primary/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
