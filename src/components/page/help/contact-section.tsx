import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Phone,
  Send,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactFormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

interface ContactSectionProps {
  initialFormData?: ContactFormData;
}

export default function ContactSection({
  initialFormData,
}: ContactSectionProps) {
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [formData, setFormData] = useState<ContactFormData>(
    initialFormData || {
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Simulación de envío de formulario
    try {
      // En una aplicación real, aquí enviarías los datos a tu backend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormState("success");
      // Limpiar el formulario después de enviar
      setFormData({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
      });
    } catch (error) {
      setFormState("error");
    }
  };

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
          <Mail className="mr-2 h-4 w-4" />
          Contacto
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-4 text-3xl font-bold"
        >
          Ponte en contacto con nosotros
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-muted-foreground"
        >
          Estamos aquí para ayudarte. Si tienes alguna pregunta, sugerencia o
          necesitas asistencia, no dudes en contactarnos.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="space-y-4 rounded-xl border p-6">
            <h3 className="text-xl font-semibold">Información de contacto</h3>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Correo Electrónico</p>
                  <a
                    href="mailto:contacto@brainslearn.com"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    contacto@brainslearn.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Teléfono</p>
                  <a
                    href="tel:+51989456789"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    +503 7752-3404
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-4 text-xl font-semibold">Horario de atención</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Lunes - Viernes</span>
                <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Sábado</span>
                <span className="text-sm font-medium">10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Domingo</span>
                <span className="text-sm font-medium">Cerrado</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-primary/5 to-blue-500/5 p-6">
            <h3 className="mb-4 text-xl font-semibold">
              ¿Necesitas ayuda inmediata?
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Nuestro equipo de soporte está disponible en chat en vivo durante
              el horario de atención.
            </p>
            <Button className="w-full">
              Iniciar chat
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-xl border bg-card p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-xl opacity-50"></div>

            {formState === "success" ? (
              <div className="relative z-10 flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    Gracias por contactarnos. Te responderemos a la brevedad.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFormState("idle")}
                    className="rounded-full"
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto</Label>
                  <Input
                    id="asunto"
                    name="asunto"
                    placeholder="¿En qué te podemos ayudar?"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full rounded-full"
                    disabled={formState === "submitting"}
                  >
                    {formState === "submitting" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando mensaje...
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {formState === "error" && (
                  <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                    <p className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Ocurrió un error al enviar tu mensaje. Por favor,
                      inténtalo de nuevo.
                    </p>
                  </div>
                )}

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Al enviar este formulario, aceptas nuestra{" "}
                  <Link
                    href="/policy/privacy"
                    className="text-primary hover:underline"
                  >
                    Política de Privacidad
                  </Link>
                  &nbsp; y el procesamiento de tus datos.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Componente CheckCircle para el estado de éxito
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
