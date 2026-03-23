"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/types/content";
import { getCategoryStyle } from "@/content/blog";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  variant?: "default" | "compact";
}

export function BlogCard({ post, index = 0, variant = "default" }: BlogCardProps) {
  const cat = getCategoryStyle(post.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <article
          className={cn(
            "relative h-full rounded-2xl border border-surface-200/80 bg-white overflow-hidden",
            "transition-all duration-300 ease-out hover:shadow-[var(--shadow-card-hover)] hover:border-surface-300/80 hover:-translate-y-1"
          )}
        >
          {post.coverImage && variant === "default" && (
            <div className="relative aspect-[16/9] overflow-hidden bg-surface-100">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={92}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          <div className={cn("p-5", variant === "default" && "p-6")}>
            <div className="flex items-center gap-2.5 mb-3">
              <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold", cat.bg, cat.text)}>
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-surface-400">
                <Clock className="h-3 w-3" />
                {post.readTime} min
              </span>
            </div>

            <h3 className={cn(
              "font-bold text-primary-950 leading-snug group-hover:text-primary-500 transition-colors duration-200",
              variant === "default" ? "text-lg" : "text-base"
            )}>
              {post.title}
            </h3>

            <p className="mt-2 text-sm text-surface-500 leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {post.author.avatar && (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    quality={85}
                    className="h-6 w-6 shrink-0 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-xs font-medium text-primary-950">{post.author.name}</p>
                  <p className="text-[10px] text-surface-400">
                    {new Date(post.date).toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <span className="flex items-center gap-1 text-xs font-medium text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Czytaj
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
