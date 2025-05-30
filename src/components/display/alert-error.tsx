import { forwardRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleX } from "lucide-react";

interface DialogProps {
  title: string;
  statusError?: string;
  description?: string;
}

const AlertErrorComponent = forwardRef<HTMLDivElement, DialogProps>(
  ({ title, statusError, description }, ref) => {
    return (
      <AlertDialog open={true}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent ref={ref}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              <Alert>
                <CircleX className="h-4 w-4 text-red-500" color="red" />
                <AlertTitle>{statusError}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
              </Alert>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Aceptar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

AlertErrorComponent.displayName = "AlertErrorComponent";

export default AlertErrorComponent;
