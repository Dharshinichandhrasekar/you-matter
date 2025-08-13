"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center rounded-2xl font-medium
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
    relative overflow-hidden
  `;

  const variants = {
    primary: `
      bg-primary text-primary-foreground
      hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25
      hover:-translate-y-0.5 active:translate-y-0
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-100%] hover:before:translate-x-[100%]
      before:transition-transform before:duration-700
    `,
    secondary: `
      bg-secondary text-secondary-foreground
      hover:bg-secondary/80 hover:shadow-md
      hover:-translate-y-0.5 active:translate-y-0
    `,
    outline: `
      border border-border bg-transparent text-foreground
      hover:bg-muted hover:shadow-md
      hover:-translate-y-0.5 active:translate-y-0
    `,
    ghost: `
      bg-transparent text-foreground
      hover:bg-muted hover:shadow-sm
      hover:-translate-y-0.5 active:translate-y-0
    `,
    destructive: `
      bg-destructive text-destructive-foreground
      hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/25
      hover:-translate-y-0.5 active:translate-y-0
    `,
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-13 px-8 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}