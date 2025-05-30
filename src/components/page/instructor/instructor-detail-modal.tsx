import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { InstructorProfile } from "@/types";
import {
  Mail,
  Phone,
  Globe,
  Linkedin,
  Facebook,
  Twitter,
  Github,
} from "lucide-react";

interface InstructorDetailModalProps {
  instructor?: InstructorProfile;
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructorDetailModal({
  instructor,
  isOpen,
  onClose,
}: InstructorDetailModalProps) {
  if (!instructor) return null;

  const contactInfo = instructor.contactInfo || {};
  const socialLinks = instructor.socialLinks || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalles del Instructor</DialogTitle>
          <DialogDescription>
            Información completa del perfil del instructor
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={instructor.imagePerfil || "/avatar-fallback.png"}
                alt={`${instructor.names} ${instructor.surnames}`}
              />
            </Avatar>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold">
                {instructor.title && `${instructor.title} `}
                {instructor.names} {instructor.surnames}
              </h2>
              <p className="flex gap-1 items-center">
                Código:
                <span className="text-muted-foreground">
                  {instructor.instructorCode || "No asignado"}
                </span>
              </p>
              <p className="flex gap-1 items-center">
                Cursos:
                <span className="text-muted-foreground">
                  {instructor.coursesCount || 0}
                </span>
              </p>
            </div>
          </div>

          {instructor.aboutMe && (
            <div>
              <h3 className="text-lg font-medium mb-2">Biografía</h3>
              <p className="text-sm text-muted-foreground">
                {instructor.aboutMe}
              </p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium mb-2">
              Información de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{instructor.user?.email || "No disponible"}</span>
              </div>
              {instructor.thelephone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{instructor.thelephone}</span>
                </div>
              )}
              {contactInfo.email &&
                contactInfo.email !== instructor.user?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{contactInfo.email}</span>
                  </div>
                )}
              {contactInfo.whatsapp && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>WhatsApp: {contactInfo.whatsapp}</span>
                </div>
              )}
              {contactInfo.telegram && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>Telegram: {contactInfo.telegram}</span>
                </div>
              )}
            </div>
          </div>

          {(socialLinks.linkedin ||
            socialLinks.facebook ||
            socialLinks.twitter ||
            socialLinks.github ||
            socialLinks.website) && (
            <div>
              <h3 className="text-lg font-medium mb-2">Redes Sociales</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </a>
                )}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Facebook className="h-5 w-5" />
                    </Button>
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </a>
                )}
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Github className="h-5 w-5" />
                    </Button>
                  </a>
                )}
                {socialLinks.website && (
                  <a
                    href={socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Globe className="h-5 w-5" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Fechas de registro */}
          <div>
            <h3 className="text-lg font-medium mb-2">Detalles de registro</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Fecha de registro</p>
                <p>
                  {instructor.createdAt
                    ? new Date(instructor.createdAt).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "No disponible"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Última actualización</p>
                <p>
                  {instructor.updatedAt
                    ? new Date(instructor.updatedAt).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "No disponible"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
