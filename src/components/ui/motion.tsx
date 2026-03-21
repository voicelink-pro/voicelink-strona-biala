"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInProps extends HTMLMotionProps<"div"> {
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

const directionOffset: Record<FadeDirection, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

export function FadeIn({
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
  children,
  ...props
}: FadeInProps) {
  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  className?: string;
  children: React.ReactNode;
  staggerDelay?: number;
  delay?: number;
}

export function StaggerContainer({
  className,
  children,
  staggerDelay = 0.08,
  delay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value}{suffix}
      </motion.span>
    </motion.span>
  );
}
