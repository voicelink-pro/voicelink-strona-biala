import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "accent" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-100 text-surface-700",
  primary: "bg-primary-50 text-primary-700",
  accent: "bg-accent-50 text-accent-700",
  outline: "border border-surface-300 text-surface-600",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
