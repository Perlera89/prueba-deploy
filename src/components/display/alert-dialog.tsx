import { forwardRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  openAlertDialog?: boolean;
  setOpenAlertDialog?: (open: boolean) => void;
}

const AlertDialogComponent = forwardRef<HTMLDivElement, DialogProps>(
  (
    { title, description, onConfirm, openAlertDialog, setOpenAlertDialog },
    ref
  ) => {
    return (
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent ref={ref}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

AlertDialogComponent.displayName = "AlertDialogComponent";

export default AlertDialogComponent;
