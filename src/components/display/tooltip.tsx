import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type React from "react";

export default function TooltipItem({
  content,
  side = "right",
  children,
}: Readonly<{
  content: string | React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
