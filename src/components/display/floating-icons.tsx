"use client";

import type React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  Search,
  Book,
  GraduationCap,
  Pencil,
  FileText,
  Library,
  BarChart3,
  Lightbulb,
  Brain,
  BookOpenCheck,
  Calculator,
  Code,
  Globe,
  Music,
  Video,
  ImageIcon,
  Camera,
  Palette,
} from "lucide-react";

const icons = [
  Home,
  BookOpen,
  Search,
  Book,
  GraduationCap,
  Pencil,
  FileText,
  Library,
  BarChart3,
  Lightbulb,
  Brain,
  BookOpenCheck,
  Calculator,
  Code,
  Globe,
  Music,
  Video,
  ImageIcon,
  Camera,
  Palette,
];

const iconColors = [
  "#3b82f6", // blue-500
  "#2563eb", // blue-600
  "#1d4ed8", // blue-700
  "#6366f1", // indigo-500
  "#4f46e5", // indigo-600
  "#4338ca", // indigo-700
  "#8b5cf6", // violet-500
  "#7c3aed", // violet-600
  "#0ea5e9", // sky-500
  "#0284c7", // sky-600
];

const ICON_SIZE = 40;
const ICON_COUNT = 20;

interface FloatingIconProps {
  x: number;
  y: number;
  color: string;
  IconComponent: React.ElementType;
  moveRange: number;
  rotationSpeed: number;
  id: number;
}

function FloatingIcon({
  x,
  y,
  color,
  IconComponent,
  moveRange,
  rotationSpeed,
}: FloatingIconProps) {
  const xMove = moveRange;
  const yMove = moveRange;
  const rotate = rotationSpeed > 0 ? 360 : 0;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0, x, y, rotate: 0 }}
      animate={{
        opacity: [0.3, 0.15, 0.3],
        scale: [1, 1.1, 1],
        x: [x, x + xMove, x],
        y: [y, y + yMove, y],
        rotate: [0, rotate],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
      style={{ transformOrigin: "center center" }}
    >
      <g transform={`translate(${-ICON_SIZE / 2}, ${-ICON_SIZE / 2})`}>
        <IconComponent size={ICON_SIZE} color={color} strokeWidth={1.5} />
      </g>
    </motion.g>
  );
}

function FloatingIcons() {
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 1000,
    height: 800,
  });

  const randomSeedRef = useRef(
    Array.from({ length: ICON_COUNT * 5 }, () => Math.random())
  );

  const floatingIcons = useMemo(() => {
    if (!isClient) return [];

    const { width, height } = dimensions;
    const newIcons: FloatingIconProps[] = [];

    const gridSize = Math.ceil(Math.sqrt(ICON_COUNT));
    const cellWidth = width / gridSize;
    const cellHeight = height / gridSize;

    for (let i = 0; i < ICON_COUNT; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;

      const seedIndex = i * 5;
      const randomForVariationX = randomSeedRef.current[seedIndex];
      const randomForVariationY = randomSeedRef.current[seedIndex + 1];
      const randomForColor = randomSeedRef.current[seedIndex + 2];
      const randomForIcon = randomSeedRef.current[seedIndex + 3];
      const randomForRotation = randomSeedRef.current[seedIndex + 4];

      const baseX = col * cellWidth + cellWidth / 2;
      const baseY = row * cellHeight + cellHeight / 2;

      const variationX = (randomForVariationX - 0.5) * cellWidth * 0.7;
      const variationY = (randomForVariationY - 0.5) * cellHeight * 0.7;

      const moveRange = Math.min(cellWidth, cellHeight) * 0.4;

      const colorIndex = Math.floor(randomForColor * iconColors.length);
      const color = iconColors[colorIndex];

      const rotationSpeed = randomForRotation > 0.7 ? 2 : 0;

      const iconIndex = Math.floor(randomForIcon * icons.length);
      const IconComponent = icons[iconIndex];

      newIcons.push({
        id: i,
        x: baseX + variationX,
        y: baseY + variationY,
        color,
        IconComponent,
        moveRange,
        rotationSpeed,
      });
    }

    return newIcons;
  }, [dimensions, isClient]);

  useEffect(() => {
    setIsClient(true);

    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        <title>Floating Icons</title>
        {floatingIcons.map((icon) => (
          <FloatingIcon key={icon.id} {...icon} />
        ))}
      </svg>
    </div>
  );
}

export default function FloatingIconsBackground({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div>
      <FloatingIcons />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
