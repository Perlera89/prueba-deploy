import type React from "react";
import { cn } from "@/lib/utils";
import {
  Archive,
  Book,
  CheckCircle,
  FileText,
  type LucideIcon,
} from "lucide-react";

type EmptyPlaceholderProps = React.HTMLAttributes<HTMLDivElement>

export function EmptyPlaceholder({
  className,
  children,
  ...props
}: EmptyPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

interface EmptyPlaceholderIconProps
  extends Partial<React.SVGProps<SVGSVGElement>> {
  name: "archive" | "book" | "file-text" | "check-circle";
}

EmptyPlaceholder.Icon = function EmptyPlaceholderIcon({
  name,
  className,
  ...props
}: EmptyPlaceholderIconProps) {
  const IconComponent: LucideIcon =
    name === "archive"
      ? Archive
      : name === "book"
        ? Book
        : name === "check-circle"
          ? CheckCircle
          : FileText;

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
      <IconComponent className={cn("h-10 w-10", className)} {...props} />
    </div>
  );
};

type EmptyPlaceholderTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: EmptyPlaceholderTitleProps) {
  return (
    <h2 className={cn("mt-6 text-xl font-semibold", className)} {...props} />
  );
};

type EmptyPlaceholderDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}: EmptyPlaceholderDescriptionProps) {
  return (
    <p
      className={cn(
        "mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
