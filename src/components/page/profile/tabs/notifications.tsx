import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function NotificationsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias de Notificaciones</CardTitle>
        <CardDescription>
          Configura cómo y cuándo quieres recibir notificaciones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Notificaciones por Correo Electrónico
          </h3>
          <div className="space-y-3">
            {teacherEmailNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
                <Switch defaultChecked={notification.enabled} />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Notificaciones en la Plataforma
          </h3>
          <div className="space-y-3">
            {teacherPlatformNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
                <Switch defaultChecked={notification.enabled} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Guardar Preferencias</Button>
      </CardFooter>
    </Card>
  );
}

// Datos de ejemplo para notificaciones por correo (profesor)
const teacherEmailNotifications = [
  {
    id: 1,
    title: "Entregas de tareas",
    description:
      "Recibe notificaciones cuando los estudiantes entreguen tareas",
    enabled: true,
  },
  {
    id: 2,
    title: "Preguntas en foros",
    description:
      "Recibe notificaciones cuando los estudiantes publiquen en los foros",
    enabled: true,
  },
  {
    id: 3,
    title: "Solicitudes de tutoría",
    description:
      "Recibe notificaciones cuando los estudiantes soliciten tutorías",
    enabled: true,
  },
  {
    id: 4,
    title: "Actualizaciones del sistema",
    description: "Recibe notificaciones sobre actualizaciones de la plataforma",
    enabled: false,
  },
];

// Datos de ejemplo para notificaciones en la plataforma (profesor)
const teacherPlatformNotifications = [
  {
    id: 1,
    title: "Mensajes de estudiantes",
    description:
      "Muestra notificaciones en la plataforma para mensajes de estudiantes",
    enabled: true,
  },
  {
    id: 2,
    title: "Recordatorios de clases",
    description: "Muestra recordatorios de próximas clases programadas",
    enabled: true,
  },
  {
    id: 3,
    title: "Fechas límite de calificación",
    description: "Muestra recordatorios para calificar tareas pendientes",
    enabled: true,
  },
];
