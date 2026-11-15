"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

/**
 * Primary button: black fill, white text, subtle hover lift.
 * The brand CTA (e.g. "SHOP NEW IN").
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97]";
    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-black text-white hover:bg-neutral-800 shadow-sm active:shadow-none",
      secondary:
        "bg-white text-black border border-black/10 hover:bg-black hover:text-white hover:border-black",
      ghost: "bg-transparent text-black hover:bg-cream-100",
      outline:
        "border border-black/20 text-black hover:bg-cream-100",
      danger: "bg-black text-white hover:bg-neutral-800",
    };
    const sizes: Record<string, string> = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-5 py-2.5",
      lg: "text-base px-7 py-3.5",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
