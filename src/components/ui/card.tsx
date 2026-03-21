import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
}

export function Card({ className, hover = false, glass = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-surface-200/80 bg-white p-6",
        hover &&
          "transition-all duration-300 ease-out hover:shadow-[var(--shadow-card-hover)] hover:border-surface-300/80 hover:-translate-y-0.5",
        glass && "bg-white/60 backdrop-blur-lg",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold text-primary-950 leading-snug", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-surface-500 leading-relaxed", className)} {...props} />
  );
}
