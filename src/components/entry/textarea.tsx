"use client";
import type React from "react";

import { useState } from "react";

interface TextareaCounterProps {
  placeholder?: string;
  maxLength?: number;
  className?: string;
  onChange?: (value: string) => void;
}

export function TextareaCounter({
  placeholder = "Empty",
  maxLength = 100,
  className = "",
  onChange,
}: TextareaCounterProps) {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative rounded-lg border">
      <textarea
        placeholder={placeholder}
        maxLength={maxLength}
        value={text}
        onChange={handleChange}
        className={`w-full resize-none text-sm rounded-lg p-4 outline-none ${className}`}
        rows={4}
      />
      <div className="absolute bottom-1 right-2 flex items-center text-sm text-muted-foreground">
        <span>
          {text.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
