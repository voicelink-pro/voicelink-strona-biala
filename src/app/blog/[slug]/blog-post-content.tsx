"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Link2,
  ArrowRight,
  ChevronUp,
  Tag,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BlogCard } from "@/components/blog/blog-card";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function extractTOC(html: string): TOCItem[] {
  const regex = /<h([23])[^>]*>([^<]+)<\/h[23]>/g;
  const items: TOCItem[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const id = match[2]
      .toLowerCase()
      .replace(/ą/g, "a").replace(/ć/g, "c").replace(/ę/g, "e")
      .replace(/ł/g, "l").replace(/ń/g, "n").replace(/ó/g, "o")
      .replace(/ś/g, "s").replace(/ź|ż/g, "z")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    items.push({ id, text: match[2], level: parseInt(match[1]) });
  }
  return items;
}

function injectHeadingIds(html: string): string {
  return html.replace(/<h([23])>([^<]+)<\/h[23]>/g, (_match, level, text) => {
    const id = text
      .toLowerCase()
      .replace(/ą/g, "a").replace(/ć/g, "c").replace(/ę/g, "e")
      .replace(/ł/g, "l").replace(/ń/g, "n").replace(/ó/g, "o")
      .replace(/ś/g, "s").replace(/ź|ż/g, "z")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `<h${level} id="${id}">${text}</h${level}>`;
  });
}

interface BlogPostContentProps {
  post: BlogPost;
  related: BlogPost[];
  catStyle: { bg: string; text: string };
}

export function BlogPostContent({ post, related, catStyle }: BlogPostContentProps) {
  const toc = useMemo(() => extractTOC(post.content), [post.content]);
  const processedContent = useMemo(() => injectHeadingIds(post.content), [post.content]);
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {/* Cover image */}
      {post.coverImage && (
        <div className="relative w-full aspect-[21/8] sm:aspect-[21/7] bg-surface-100 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="100vw"
            quality={92}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
        </div>
      )}

      <section className="relative pb-16 md:pb-24">
        <Container size="wide">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
            {/* Main content */}
            <div className={cn(!post.coverImage && "pt-12 md:pt-16")}>
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="-mt-4 mb-8"
              >
                <Link href="/blog">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4" />
                    Wróć do bloga
                  </Button>
                </Link>
              </motion.div>

              {/* Header */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                  <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", catStyle.bg, catStyle.text)}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-surface-400">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime} min czytania
                  </span>
                  <span className="flex items-center gap-1 text-sm text-surface-400">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-primary-950 sm:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight">
                  {post.title}
                </h1>

                <p className="mt-5 text-lg text-surface-500 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Author + Share */}
                <div className="mt-8 flex items-center justify-between border-b border-surface-100 pb-8">
                  <div className="flex items-center gap-3">
                    {post.author.avatar && (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={44}
                        height={44}
                        quality={85}
                        className="rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-primary-950">{post.author.name}</p>
                      {post.author.role && (
                        <p className="text-xs text-surface-400">{post.author.role}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-2 text-xs font-medium text-surface-600 hover:bg-surface-50 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          Skopiowano
                        </>
                      ) : (
                        <>
                          <Link2 className="h-3.5 w-3.5" />
                          Kopiuj link
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                      className="flex items-center justify-center h-9 w-9 rounded-lg border border-surface-200 bg-white text-surface-600 hover:bg-surface-50 transition-colors cursor-pointer"
                      aria-label="Udostępnij"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.header>

              {/* Article body */}
              <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-10 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-surface-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4 text-surface-400" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-surface-100 px-3 py-1 text-xs font-medium text-surface-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* TOC */}
                {toc.length > 0 && (
                  <motion.nav
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="rounded-2xl border border-surface-200/80 bg-white p-5"
                    aria-label="Spis treści"
                  >
                    <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-3">
                      Spis treści
                    </p>
                    <ul className="space-y-1.5">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={cn(
                              "block text-sm text-surface-500 hover:text-primary-500 transition-colors leading-snug",
                              item.level === 3 && "pl-3 text-xs"
                            )}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.nav>
                )}

                {/* Author card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="rounded-2xl border border-surface-200/80 bg-white p-5 text-center"
                >
                  {post.author.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={56}
                      height={56}
                      quality={85}
                      className="mx-auto rounded-full object-cover ring-2 ring-surface-100"
                    />
                  )}
                  <p className="mt-3 text-sm font-bold text-primary-950">{post.author.name}</p>
                  {post.author.role && (
                    <p className="text-xs text-surface-400 mt-0.5">{post.author.role}</p>
                  )}
                  <div className="mt-4 pt-4 border-t border-surface-100">
                    <Link href="/o-nas" className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors">
                      Poznaj nasz zespół →
                    </Link>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50/40 border border-primary-100/60 p-5"
                >
                  <p className="text-sm font-bold text-primary-950">Chcesz wdrożyć AI?</p>
                  <p className="mt-1 text-xs text-surface-500 leading-relaxed">
                    Umów bezpłatną konsultację i dowiedz się, jak VoiceLink pomoże Twojej placówce.
                  </p>
                  <Link href="/demo" className="mt-4 block">
                    <Button size="sm" className="w-full">
                      Umów demo
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 border-t border-surface-100">
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-primary-950 sm:text-3xl">
                Czytaj również
              </h2>
              <p className="mt-2 text-surface-500">
                Inne artykuły, które mogą Cię zainteresować
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Back to top */}
      <motion.button
        initial={false}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 10 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center h-10 w-10 rounded-full bg-white border border-surface-200 shadow-[var(--shadow-card)] text-surface-600 hover:bg-surface-50 transition-colors cursor-pointer",
          !showTop && "pointer-events-none"
        )}
        aria-label="Wróć na górę"
      >
        <ChevronUp className="h-4 w-4" />
      </motion.button>
    </>
  );
}
