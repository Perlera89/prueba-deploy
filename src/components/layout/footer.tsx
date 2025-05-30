import Link from "next/link";
import { LibraryBig } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto py-4">
      <div className="container flex flex-col md:flex-row justify-between items-center px-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <LibraryBig className="h-4 w-4 " />
          <span>BrainsLearn © {currentYear}</span>
        </div>

        <div className="flex gap-6">
          <Link
            href="/help"
            className="hover:text-foreground transition-colors"
          >
            Ayuda
          </Link>
          <Link
            href="/policy/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacidad
          </Link>
          <Link
            href="/policy/terms"
            className="hover:text-foreground transition-colors"
          >
            Términos
          </Link>
          <Link
            href="/help"
            className="hover:text-foreground transition-colors"
          >
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
}
