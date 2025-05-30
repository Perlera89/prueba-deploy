import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  BookOpen,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { Button } from "../../ui/button";

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

interface InstructorInfoDialogProps {
  selectedInstructor: Instructor | null;
  setSelectedInstructor: (instructor: Instructor | null) => void;
}

export default function InstructorInfoDialog({
  selectedInstructor,
  setSelectedInstructor,
}: InstructorInfoDialogProps) {
  return (
    <Dialog
      open={selectedInstructor !== null}
      onOpenChange={(open) => !open && setSelectedInstructor(null)}
    >
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        {selectedInstructor && (
          <>
            <DialogHeader className="pb-2 border-b mb-4">
              <DialogTitle className="text-2xl font-bold text-primary">
                {selectedInstructor.name}
              </DialogTitle>
              <DialogDescription>
                <span className="text-base">{selectedInstructor.role}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="py-2">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col space-y-4">
                  <div className="rounded-lg overflow-hidden border border-border bg-gray-50 dark:bg-gray-800">
                    <Image
                      src={selectedInstructor.image || "/placeholder.svg"}
                      alt={selectedInstructor.name}
                      width={300}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {(selectedInstructor.social.linkedin ||
                    selectedInstructor.social.twitter ||
                    selectedInstructor.social.web ||
                    selectedInstructor.social.youtube ||
                    selectedInstructor.social.facebook ||
                    selectedInstructor.social.instagram ||
                    selectedInstructor.social.tiktok) && (
                    <div className="w-full">
                      <div className="flex justify-center space-x-3">
                        {selectedInstructor.social.linkedin && (
                          <a
                            href={selectedInstructor.social.linkedin}
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="LinkedIn"
                          >
                            <Linkedin className="size-5" />
                          </a>
                        )}
                        {selectedInstructor.social.twitter && (
                          <a
                            href={selectedInstructor.social.twitter}
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Twitter"
                          >
                            <Twitter className="size-5" />
                          </a>
                        )}
                        {selectedInstructor.social.web && (
                          <a
                            href={selectedInstructor.social.web}
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Sitio Web"
                          >
                            <Globe className="size-5" />
                          </a>
                        )}
                        {selectedInstructor.social.facebook && (
                          <a
                            href={selectedInstructor.social.facebook}
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Facebook"
                          >
                            <Facebook className="size-5" />
                          </a>
                        )}
                        {selectedInstructor.social.instagram && (
                          <a
                            href={selectedInstructor.social.instagram}
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Instagram"
                          >
                            <Instagram className="size-5" />
                          </a>
                        )}
                        {selectedInstructor.social.youtube && (
                          <a
                            href={selectedInstructor.social.youtube}
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="YouTube"
                          >
                            <Youtube className="size-5" />
                          </a>
                        )}
                        {selectedInstructor.social.tiktok && (
                          <a
                            href={selectedInstructor.social.tiktok}
                            target="_blank"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="TikTok"
                          >
                            <svg
                              className="size-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9 12a4 4 0 1 0 4 4V4a9 9 0 0 0 9 9" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* Información a la derecha */}
                <div className="md:w-2/3">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">
                      Sobre el instructor
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedInstructor.description}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Especialidades</h3>
                    <ul className="space-y-2">
                      {selectedInstructor.specialties.map(
                        (specialty, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="flex-shrink-0">
                              <div className="size-1.5 rounded-full bg-muted" />
                            </div>
                            <span className="text-muted-foreground">
                              {specialty}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Cursos impartidos
                    </h3>
                    {selectedInstructor.courses.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedInstructor.courses.map((course, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-3 flex items-start gap-2 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              <BookOpen className="size-4 text-primary/80" />
                            </div>
                            <span className="flex-1 text-sm font-medium">
                              {course}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">
                        Este instructor aún no tiene cursos asignados.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between items-center mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setSelectedInstructor(null)}
                className="w-full sm:w-auto"
              >
                Cerrar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
