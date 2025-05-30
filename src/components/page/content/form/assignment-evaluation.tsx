import { useState } from "react";
import { nanoid } from "nanoid";
import { X, ListChecks, AlertCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RubricCriteria } from "@/types";
import { ContentFormData } from "@/schema/content";
import { DateTimePicker } from "@/components/entry/date-time-picker";

interface AssignmentEvaluationProps {
  form: UseFormReturn<ContentFormData>;
  rubricCriteria: RubricCriteria[];
  setRubricCriteria: React.Dispatch<React.SetStateAction<RubricCriteria[]>>;
}

export function AssignmentEvaluation({
  form,
  rubricCriteria,
  setRubricCriteria,
}: AssignmentEvaluationProps) {
  const [showRubricDialog, setShowRubricDialog] = useState(false);
  const [criteriaDescription, setCriteriaDescription] = useState("");
  const [criteriaPoints, setCriteriaPoints] = useState("");
  const [criteriaError, setCriteriaError] = useState("");

  // Check if the assignment requires grading
  const isGraded = form.watch("assignment.isGraded");

  // Get assignment score
  const assignmentScore = form.watch("assignment.score")
    ? Number(form.watch("assignment.score"))
    : 0;

  // Calculate total points
  const totalPoints = rubricCriteria.reduce(
    (sum, criteria) => sum + criteria.points,
    0
  );

  // Add a rubric criteria
  const addRubricCriteria = () => {
    const newPoints = Number(criteriaPoints);

    // Validate that the total won't exceed the assignment score
    if (totalPoints + newPoints > assignmentScore) {
      setCriteriaError(
        `El total de la rúbrica (${totalPoints + newPoints}) excede el puntaje de la tarea (${assignmentScore})`
      );
      return;
    }

    if (criteriaDescription && criteriaPoints) {
      setRubricCriteria([
        ...rubricCriteria,
        {
          id: nanoid(),
          description: criteriaDescription,
          points: newPoints,
        },
      ]);
      setCriteriaDescription("");
      setCriteriaPoints("");
      setCriteriaError("");
      setShowRubricDialog(false);
    }
  };

  // Remove a rubric criteria
  const removeRubricCriteria = (id: string) => {
    setRubricCriteria(rubricCriteria.filter((criteria) => criteria.id !== id));
  };

  // Check if assignment score is set
  const isScoreSet = assignmentScore > 0;

  // Check if the rubric total is equal to the assignment score
  const isRubricFull = totalPoints >= assignmentScore && assignmentScore > 0;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="assignment.isGraded"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-1 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Requiere calificación</FormLabel>
            </div>
          </FormItem>
        )}
      />

      {isGraded && (
        <>
          <FormField
            control={form.control}
            name="assignment.dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha límite</FormLabel>
                <FormControl>
                  <DateTimePicker
                    placeholder="Selecciona una fecha y hora"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assignment.score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Puntuación</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Puntuación máxima (0-100)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Puntuación máxima para esta tarea (de 0 a 100)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">Rúbrica de evaluación</h3>
                <p className="text-sm text-muted-foreground">
                  Criterios para evaluar la tarea
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRubricDialog(true)}
                size="sm"
                disabled={!isScoreSet || isRubricFull}
              >
                <ListChecks className="mr-2 h-4 w-4" />
                Agregar Criterio
              </Button>
            </div>

            {!isScoreSet && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Ingrese primero la puntuación máxima para definir la rúbrica
                </AlertDescription>
              </Alert>
            )}

            {isScoreSet && totalPoints === 0 && (
              <Alert>
                <ListChecks className="h-4 w-4" />
                <AlertDescription>
                  Agregue criterios para definir cómo se evaluará la tarea
                </AlertDescription>
              </Alert>
            )}

            {rubricCriteria.length > 0 && (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Criterio</TableHead>
                      <TableHead className="text-right">Puntos</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rubricCriteria.map((criteria) => (
                      <TableRow key={criteria.id}>
                        <TableCell className="align-top py-4">
                          {criteria.description}
                        </TableCell>
                        <TableCell className="text-right align-top py-4">
                          {criteria.points}
                        </TableCell>
                        <TableCell className="text-right align-top py-4">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRubricCriteria(criteria.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">
                        {totalPoints}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            )}

            {isScoreSet && totalPoints < assignmentScore && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Los criterios definidos suman {totalPoints} puntos de un total
                  de {assignmentScore} puntos
                </AlertDescription>
              </Alert>
            )}
          </div>

          <FormField
            control={form.control}
            name="assignment.allowLateSubmissions"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Permitir entregas tardías</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </>
      )}

      <Dialog open={showRubricDialog} onOpenChange={setShowRubricDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar criterio de evaluación</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <FormLabel>Descripción</FormLabel>
              <Textarea
                placeholder="Describa el criterio de evaluación"
                value={criteriaDescription}
                onChange={(e) => setCriteriaDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <FormLabel>Puntos</FormLabel>
              <Input
                type="number"
                min={1}
                max={assignmentScore - totalPoints}
                placeholder="Puntos asignados a este criterio"
                value={criteriaPoints}
                onChange={(e) => setCriteriaPoints(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Máximo disponible: {assignmentScore - totalPoints} puntos
              </p>
              {criteriaError && (
                <p className="text-xs text-destructive">{criteriaError}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCriteriaDescription("");
                  setCriteriaPoints("");
                  setCriteriaError("");
                  setShowRubricDialog(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="button" onClick={addRubricCriteria}>
                Agregar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
