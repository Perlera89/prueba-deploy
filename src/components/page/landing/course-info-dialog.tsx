import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { Check } from "lucide-react";
import { Button } from "../../ui/button";

interface Course {
  title: string;
  category: string;
  image?: string;
  level: string;
  duration: string;
  description: string;
  outcomes: string[];
}

interface CourseInfoDialogProps {
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
}

export default function CourseInfoDialog({
  selectedCourse,
  setSelectedCourse,
}: CourseInfoDialogProps) {
  return (
    <Dialog
      open={selectedCourse !== null}
      onOpenChange={(open) => !open && setSelectedCourse(null)}
    >
      <DialogContent className="sm:max-w-[700px]">
        {selectedCourse && (
          <>
            <div className="h-48 relative overflow-hidden rounded-lg mb-2">
              <Image
                src={selectedCourse.image || "/placeholder.svg"}
                alt={selectedCourse.title}
                width={700}
                height={192}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex gap-2 mb-4">
              <Badge variant="secondary">{selectedCourse.category}</Badge>
              <Badge variant="outline">{selectedCourse.duration}</Badge>
            </div>

            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedCourse.title}
              </DialogTitle>
            </DialogHeader>

            <div className="py-2">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Descripción</h3>
                <p className="text-muted-foreground">
                  {selectedCourse.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Lo que aprenderás</h3>
                <ul className="space-y-2">
                  {selectedCourse.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 flex-shrink-0">
                        <Check className="size-4 text-primary" />
                      </div>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setSelectedCourse(null)}>Cerrar</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
