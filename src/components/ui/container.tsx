import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

const sizeStyles = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({ className, size = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeStyles[size], className)}
      {...props}
    />
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: "white" | "light" | "dark" | "primary";
}

const bgStyles = {
  white: "bg-transparent",
  light: "bg-transparent",
  dark: "bg-primary-950 text-white",
  primary: "bg-primary-600 text-white",
};

export function Section({ className, background = "white", ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24",
        bgStyles[background],
        className
      )}
      {...props}
    />
  );
}
