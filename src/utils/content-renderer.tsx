import type React from "react";
import {
  Check,
  FileText,
  Shield,
  Users,
  CreditCard,
  AlertTriangle,
  Scale,
  Globe,
  Mail,
  User,
  Database,
  Share2,
  Lock,
  UserCheck,
  Cookie,
  RefreshCw,
} from "lucide-react";

// Definición de tipos para el contenido
export type ContentItem = {
  title?: string;
  description: string;
};

export type ContentMethod = {
  icon: string;
  text: string;
};

export type ContentSection = {
  id: string;
  title: string;
  icon: string;
  content: {
    type: "paragraph" | "list" | "contact";
    text?: string;
    introduction?: string;
    items?: ContentItem[];
    methods?: ContentMethod[];
    conclusion?: string;
  };
};

export type PolicyContent = {
  lastUpdated: string;
  introduction: string;
  sections: ContentSection[];
};

// Mapa de iconos disponibles
const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="size-4" />,
  Shield: <Shield className="size-4" />,
  Users: <Users className="size-4" />,
  CreditCard: <CreditCard className="size-4" />,
  AlertTriangle: <AlertTriangle className="size-4" />,
  Scale: <Scale className="size-4" />,
  Globe: <Globe className="size-4" />,
  Mail: <Mail className="size-4" />,
  User: <User className="size-4" />,
  Database: <Database className="size-4" />,
  Share2: <Share2 className="size-4" />,
  Lock: <Lock className="size-4" />,
  UserCheck: <UserCheck className="size-4" />,
  Cookie: <Cookie className="size-4" />,
  RefreshCw: <RefreshCw className="size-4" />,
};

// Componente para renderizar un párrafo
export const ParagraphContent: React.FC<{ text: string }> = ({ text }) => {
  return <p>{text}</p>;
};

// Componente para renderizar una lista
export const ListContent: React.FC<{
  introduction?: string;
  items: ContentItem[];
  conclusion?: string;
}> = ({ introduction, items, conclusion }) => {
  return (
    <>
      {introduction && <p className="mb-6">{introduction}</p>}
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3">
            <div className="mt-1 flex-shrink-0">
              <Check className="size-4 text-primary/80" />
            </div>
            <div>
              {item.title && <strong>{item.title}</strong>} {item.description}
            </div>
          </li>
        ))}
      </ul>
      {conclusion && <p className="mt-6">{conclusion}</p>}
    </>
  );
};

// Componente para renderizar información de contacto
export const ContactContent: React.FC<{
  introduction: string;
  methods: ContentMethod[];
}> = ({ introduction, methods }) => {
  return (
    <>
      <p className="mb-6">{introduction}</p>
      <ul className="space-y-3">
        {methods.map((method, index) => (
          <li key={index} className="flex items-center gap-2">
            {iconMap[method.icon] || (
              <Mail className="size-4 text-primary/80" />
            )}
            <span>{method.text}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

// Componente principal para renderizar una sección
export const SectionContent: React.FC<{ section: ContentSection }> = ({
  section,
}) => {
  const { content } = section;

  switch (content.type) {
    case "paragraph":
      return <ParagraphContent text={content.text || ""} />;
    case "list":
      return (
        <ListContent
          introduction={content.introduction}
          items={content.items || []}
          conclusion={content.conclusion}
        />
      );
    case "contact":
      return (
        <ContactContent
          introduction={content.introduction || ""}
          methods={content.methods || []}
        />
      );
    default:
      return <p>Contenido no disponible</p>;
  }
};

// Componente para renderizar el icono de una sección
export const SectionIcon: React.FC<{ iconName: string }> = ({ iconName }) => {
  return <>{iconMap[iconName] || <FileText className="size-4" />}</>;
};
