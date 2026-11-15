import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 text-xs font-semibold tracking-wide rounded-full px-2.5 py-0.5 transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white hover:bg-neutral-800",
        newIn:
          "bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-500/30",
        sale:
          "bg-rose-500/15 text-rose-600 ring-1 ring-rose-500/30",
        outline:
          "bg-transparent text-black/80 hover:bg-cream-100",
        ghost:
          "bg-transparent text-black/70 hover:bg-cream-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type Variant = "default" | "newIn" | "sale" | "outline" | "ghost";
