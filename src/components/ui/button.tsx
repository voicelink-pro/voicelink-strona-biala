import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-400/40 shadow-sm hover:shadow-md",
  secondary:
    "bg-primary-950 text-white hover:bg-primary-900 active:bg-primary-800 focus-visible:ring-primary-800/40 shadow-sm hover:shadow-md",
  outline:
    "border border-surface-200 bg-white text-primary-950 hover:bg-surface-50 hover:border-surface-300 active:bg-surface-100 focus-visible:ring-primary-400/30",
  ghost:
    "text-surface-600 hover:text-primary-950 hover:bg-surface-100/80 active:bg-surface-200 focus-visible:ring-primary-400/30",
  link: "text-primary-500 hover:text-primary-600 underline-offset-4 hover:underline focus-visible:ring-primary-400/30 p-0 h-auto",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-xs rounded-lg",
  md: "h-9 px-4 text-[13px] rounded-lg",
  lg: "h-10 px-5 text-sm rounded-lg",
  xl: "h-11 px-6 text-sm rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
