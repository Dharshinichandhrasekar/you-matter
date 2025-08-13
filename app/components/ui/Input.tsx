"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  error,
  icon,
  className,
  type = "text",
  ...props
}: InputProps) {
  const inputId = React.useId();

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            `
              w-full rounded-2xl border border-border bg-card px-4 py-3
              text-card-foreground placeholder:text-muted-foreground
              transition-all duration-300 ease-in-out
              focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
              hover:border-primary/50
              disabled:opacity-50 disabled:cursor-not-allowed
            `,
            icon && "pl-10",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive animate-slide-up">
          {error}
        </p>
      )}
    </div>
  );
}