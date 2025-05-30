"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format-price";
import { DollarSign, Loader2 } from "lucide-react";
import React, { useState } from "react";

interface PaymentButtonProps {
  price: string | undefined;
  onClick: () => Promise<void>;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function PaymentButtonWithLoading({
  price,
  onClick,
  size = "default",
  className = "",
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isFree =
    price === "0.00" || price === "0" || parseFloat(price || "0") === 0;

  const displayPrice = isFree ? "Gratis" : `${formatPrice(price)}`;

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

  return (
    <Button
      size={size}
      onClick={handleClick}
      className={`relative ${className} hover:scale-105 transition-transform`}
      disabled={isLoading}
      title={
        isFree ? "Inscribirse - Gratis" : `Inscribirse - ${formatPrice(price)}`
      }
    >
      <span className="flex items-center justify-center gap-1">
        {isLoading ? (
          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
        ) : !isFree ? (
          <DollarSign className="h-4 w-4" />
        ) : null}
        {isLoading ? "" : displayPrice}
      </span>
    </Button>
  );
}
