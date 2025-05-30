"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  children?: string;
  className?: string;
}

export function MarkdownRenderer({
  children,
  className,
}: MarkdownRendererProps) {
  // Si children es undefined, usamos string vacío para evitar errores
  const content = children || "";

  return (
    <div className={cn("prose dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Personalización de componentes si es necesario
          h1: ({ ...props }) => (
            <h1 className="text-2xl font-bold mb-4" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-xl font-bold mb-3" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-lg font-bold mt-4 mb-2" {...props} />
          ),
          a: ({ ...props }) => (
            <a
              className="text-primary underline underline-offset-2 hover:text-primary/80"
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc pl-6 my-4" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal pl-6 my-4" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-2 border-muted-foreground/30 pl-4 italic my-4"
              {...props}
            />
          ),
          pre: ({ ...props }) => (
            <pre className="bg-transparent p-0 my-0" {...props} />
          ),
          img: ({ ...props }) => (
            <img className="rounded-md max-w-full my-4" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
