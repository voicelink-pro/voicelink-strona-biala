"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/types/content";
import { getCategoryStyle } from "@/content/blog";
import { cn } from "@/lib/utils";

interface BlogFeaturedProps {
  post: BlogPost;
}

export function BlogFeatured({ post }: BlogFeaturedProps) {
  const cat = getCategoryStyle(post.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="relative rounded-3xl border border-surface-200/80 bg-white overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-elevated)] hover:border-surface-300/80">
          <div className="grid lg:grid-cols-2">
            {post.coverImage && (
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-surface-100">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={92}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
              </div>
            )}

            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-600 uppercase tracking-wider">
                  Wyróżniony
                </span>
                <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold", cat.bg, cat.text)}>
                  {post.category}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-primary-950 leading-tight group-hover:text-primary-500 transition-colors duration-200">
                {post.title}
              </h2>

              <p className="mt-4 text-surface-500 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                  {post.author.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      quality={85}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-primary-950">{post.author.name}</p>
                    <p className="text-xs text-surface-400">
                      {new Date(post.date).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs text-surface-400">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime} min czytania
                </span>
              </div>

              <div className="mt-8">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 group-hover:gap-3 transition-all duration-200">
                  Czytaj artykuł
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
