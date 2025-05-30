"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format-price";
import { motion } from "framer-motion";
import { DollarSign, Loader2 } from "lucide-react";
import React, { useState } from "react";

interface AnimatedPaymentButtonProps {
  price: string | undefined;
  onClick: () => Promise<void>;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function AnimatedPaymentButton({
  price,
  onClick,
  size = "default",
  className = "",
}: AnimatedPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isFree =
    price === "0.00" || price === "0" || parseFloat(price || "0") === 0;

  const displayPrice = isFree ? "Gratis" : `$${formatPrice(price)}`;

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error("Error en la inscripción:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Variantes para las animaciones
  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  // Variantes para el texto de precio
  const priceVariants = {
    initial: {
      y: 0,
    },
    hover: {
      y: [-2, 0, -2],
      color: isFree ? "#10b981" : "#3b82f6", // Verde para gratis, azul para pago
      fontWeight: 600,
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.6,
        },
        color: {
          duration: 0.2,
        },
      },
    },
  };
  // Variantes para el efecto de brillo
  const shimmerVariants = {
    initial: { x: "-100%", opacity: 0 },
    hover: {
      x: "100%",
      opacity: 0.4,
      transition: {
        repeat: Infinity,
        repeatType: "loop" as 'loop',
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  // Variantes para iconos de monedas (solo si no es gratis)
  const coinVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    hover: (i: number) => ({
      scale: 1,
      opacity: [0, 1, 0],
      y: -20,
      x: (i - 1) * 10, // Distribuye horizontalmente
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 0.8,
      },
    }),
  };
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      className="relative"
    >
      <Button
        size={size}
        onClick={handleClick}
        className={`relative overflow-hidden ${className}`}
        disabled={isLoading}
        title={
          isFree
            ? "Inscribirse - Gratis"
            : `Inscribirse - $${formatPrice(price)}`
        }
      >
        {" "}
        <motion.span
          variants={priceVariants}
          className="truncate z-10 relative flex items-center justify-center gap-1"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            !isFree && <DollarSign className="h-4 w-4" />
          )}
          {isLoading ? "Procesando..." : displayPrice}
        </motion.span>
        {!isLoading && (
          <motion.div
            className="absolute inset-0 bg-white/20"
            variants={shimmerVariants}
            style={{ width: "50%", height: "100%" }}
          />
        )}{" "}
      </Button>

      {/* Monedas flotantes que aparecen al hover (solo para cursos de pago) */}
      {!isFree && (
        <>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={coinVariants}
              className="absolute -top-1 left-1/2 w-4 h-4 pointer-events-none"
              style={{
                backgroundColor: "#fbbf24",
                borderRadius: "50%",
                zIndex: 20,
                boxShadow: "0 0 4px rgba(251, 191, 36, 0.8)",
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
