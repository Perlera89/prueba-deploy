"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import privacyContent from "./privacy-content.json";
import {
  SectionContent,
  SectionIcon,
  type PolicyContent,
} from "@/utils/content-renderer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");
  const content = privacyContent as PolicyContent;

  useEffect(() => {
    const handleScroll = () => {
      // Detectar sección activa
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
        {/* Sidebar con navegación */}
        <div className="md:w-56 lg:w-64 flex-shrink-0">
          <div className="sticky top-28">
            <Button onClick={() => router.back()} variant="ghost">
              <ArrowLeft className="mr-2 size-3.5" />
              Volver
            </Button>

            <nav className="space-y-1">
              {content.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block py-2 text-sm transition-colors ${
                    activeSection === section.id
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <SectionIcon iconName={section.icon} />
                    <span>{section.title}</span>
                  </div>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-12">
              <h1 className="text-3xl font-semibold tracking-tight mb-3">
                Política de Privacidad
              </h1>
              <p className="text-muted-foreground text-sm">
                Última actualización: {content.lastUpdated}
              </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg mb-8 leading-relaxed">
                {content.introduction}
              </p>

              <div className="space-y-16">
                {content.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                      <span className="text-primary/80">
                        <SectionIcon iconName={section.icon} />
                      </span>
                      {section.title}
                    </h2>
                    <div className="text-muted-foreground leading-relaxed">
                      <SectionContent section={section} />
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
