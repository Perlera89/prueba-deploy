"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

// Definición de colores predefinidos
const colorSchemes = {
  orange: {
    backgroundSelected: "rgba(255, 152, 0, 0.15)", // Amber 500, light overlay
    backgroundHover: "rgba(255, 152, 0, 0.22)",
    backgroundActive: "rgba(255, 152, 0, 0.30)",
    text: "#b45309", // Amber 700
    textSelected: "#ff9800", // Amber 500
    icon: "#ff9800",
    iconBackground: "rgba(255, 152, 0, 0.12)",
    ring: "rgba(255, 152, 0, 0.18)",
    ringSelected: "rgba(255, 152, 0, 0.32)",
  },
  blue: {
    backgroundSelected: "rgba(33, 150, 243, 0.15)", // Blue 500, light overlay
    backgroundHover: "rgba(33, 150, 243, 0.22)",
    backgroundActive: "rgba(33, 150, 243, 0.30)",
    text: "#1e40af", // Blue 800
    textSelected: "#2196f3", // Blue 500
    icon: "#2196f3",
    iconBackground: "rgba(33, 150, 243, 0.12)",
    ring: "rgba(33, 150, 243, 0.18)",
    ringSelected: "rgba(33, 150, 243, 0.32)",
  },
  green: {
    backgroundSelected: "rgba(34, 197, 94, 0.15)", // Green 500, light overlay
    backgroundHover: "rgba(34, 197, 94, 0.22)",
    backgroundActive: "rgba(34, 197, 94, 0.30)",
    text: "#166534", // Green 800
    textSelected: "#22c55e", // Green 500
    icon: "#22c55e",
    iconBackground: "rgba(34, 197, 94, 0.12)",
    ring: "rgba(34, 197, 94, 0.18)",
    ringSelected: "rgba(34, 197, 94, 0.32)",
  },
  purple: {
    backgroundSelected: "rgba(168, 85, 247, 0.15)", // Purple 500, light overlay
    backgroundHover: "rgba(168, 85, 247, 0.22)",
    backgroundActive: "rgba(168, 85, 247, 0.30)",
    text: "#6d28d9", // Purple 700
    textSelected: "#a855f7", // Purple 500
    icon: "#a855f7",
    iconBackground: "rgba(168, 85, 247, 0.12)",
    ring: "rgba(168, 85, 247, 0.18)",
    ringSelected: "rgba(168, 85, 247, 0.32)",
  },
  red: {
    backgroundSelected: "rgba(239, 68, 68, 0.15)", // Red 500, light overlay
    backgroundHover: "rgba(239, 68, 68, 0.22)",
    backgroundActive: "rgba(239, 68, 68, 0.30)",
    text: "#b91c1c", // Red 700
    textSelected: "#ef4444", // Red 500
    icon: "#ef4444",
    iconBackground: "rgba(239, 68, 68, 0.12)",
    ring: "rgba(239, 68, 68, 0.18)",
    ringSelected: "rgba(239, 68, 68, 0.32)",
  },
};

export type ColorScheme = keyof typeof colorSchemes;

interface SelectorChipProps {
  title?: string; // El título ahora es opcional
  colorName?: ColorScheme;
  icon?: LucideIcon;
  selected?: boolean;
  onClick?: () => void;
}

export default function SelectorChip({
  title,
  colorName = "orange",
  icon: Icon,
  selected = false,
  onClick,
}: SelectorChipProps) {
  const [isSelected, setIsSelected] = useState(selected);
  const color = colorSchemes[colorName];

  // Actualizar el estado cuando cambia la prop selected
  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (onClick) onClick();
  };

  return (
    <motion.button
      key={title}
      onClick={handleClick}
      layout
      initial={false}
      animate={{
        backgroundColor: isSelected ? color.backgroundSelected : "transparent",
      }}
      whileHover={{
        backgroundColor: isSelected
          ? color.backgroundHover
          : "rgba(255, 255, 255, 0.05)",
        scale: 1.02,
      }}
      whileTap={{
        backgroundColor: isSelected
          ? color.backgroundActive
          : "rgba(255, 255, 255, 0.08)",
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
        backgroundColor: { duration: 0.1 },
      }}
      style={{
        color: isSelected ? color.textSelected : color.text,
        borderColor: isSelected ? color.ringSelected : color.ring,
      }}
      className={`inline-flex items-center justify-center ${title ? "px-4" : "aspect-square"} py-2 rounded-full text-base font-medium whitespace-nowrap overflow-hidden ring-1 ring-inset`}
    >
      {/* Icono siempre visible (si se proporciona) */}
      {Icon && (
        <div
          style={{ color: isSelected ? color.textSelected : color.text }}
          className={
            title
              ? "mr-2 flex items-center justify-center"
              : "flex items-center justify-center"
          }
        >
          <Icon className="w-4 h-4" strokeWidth={1.5} />
        </div>
      )}

      {/* Solo renderizar el título si existe */}
      {title && <span>{title}</span>}
    </motion.button>
  );
}

// Exportamos todas las opciones de colores disponibles para facilitar su uso
export const availableColors: ColorScheme[] = [
  "orange",
  "blue",
  "green",
  "purple",
  "red",
];
