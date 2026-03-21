"use client";

import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost, BlogCategory } from "@/types/content";
import { BLOG_CATEGORIES, getFeaturedPost } from "@/content/blog";
import { BlogCard } from "./blog-card";
import { BlogFeatured } from "./blog-featured";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 9;

interface BlogListingProps {
  posts: BlogPost[];
}

export function BlogListing({ posts }: BlogListingProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null);
  const [page, setPage] = useState(1);

  const featured = getFeaturedPost();

  const filtered = useMemo(() => {
    let result = posts;

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, search, activeCategory]);

  const isFiltering = !!search.trim() || !!activeCategory;
  const displayPosts = isFiltering ? filtered : filtered.filter((p) => p.slug !== featured?.slug);

  const totalPages = Math.ceil(displayPosts.length / POSTS_PER_PAGE);
  const paginated = displayPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const usedCategories = useMemo(() => {
    const catSet = new Set<BlogCategory>();
    posts.forEach((p) => catSet.add(p.category));
    return BLOG_CATEGORIES.filter((c) => catSet.has(c.name));
  }, [posts]);

  function handleCategoryClick(cat: BlogCategory) {
    setActiveCategory((prev) => (prev === cat ? null : cat));
    setPage(1);
  }

  function handleSearchChange(val: string) {
    setSearch(val);
    setPage(1);
  }

  return (
    <div>
      {/* Featured post */}
      {featured && !isFiltering && (
        <div className="mb-12">
          <BlogFeatured post={featured} />
        </div>
      )}

      {/* Search & Filters */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Szukaj artykułów..."
              className={cn(
                "w-full pl-10 pr-10 py-2.5 rounded-xl border border-surface-200 bg-white text-sm text-primary-950",
                "placeholder:text-surface-400 transition-all duration-200",
                "focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/15"
              )}
            />
            {search && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-surface-100 transition-colors"
              >
                <X className="h-3.5 w-3.5 text-surface-400" />
              </button>
            )}
          </div>

          {isFiltering && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-surface-500 self-center"
            >
              {filtered.length} {filtered.length === 1 ? "artykuł" : filtered.length < 5 ? "artykuły" : "artykułów"}
            </motion.p>
          )}
        </div>

        {/* Category pills */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <SlidersHorizontal className="h-3.5 w-3.5 text-surface-400 shrink-0" />
          {usedCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer",
                activeCategory === cat.name
                  ? cn(cat.bg, cat.text, "ring-1 ring-current/20")
                  : "bg-surface-100/80 text-surface-500 hover:bg-surface-200/80 hover:text-surface-700"
              )}
            >
              {cat.name}
            </button>
          ))}
          {activeCategory && (
            <button
              onClick={() => { setActiveCategory(null); setPage(1); }}
              className="shrink-0 flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-surface-400 hover:text-surface-600 transition-colors cursor-pointer"
            >
              <X className="h-3 w-3" />
              Wyczyść
            </button>
          )}
        </div>
      </div>

      {/* Posts grid */}
      <AnimatePresence mode="wait">
        {paginated.length > 0 ? (
          <motion.div
            key={`${activeCategory}-${search}-${page}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paginated.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-100 mb-4">
              <Search className="h-6 w-6 text-surface-400" />
            </div>
            <p className="text-lg font-semibold text-primary-950">Brak wyników</p>
            <p className="mt-2 text-sm text-surface-500">
              Spróbuj zmienić wyszukiwanie lub wybrać inną kategorię.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-1.5" aria-label="Paginacja bloga">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center justify-center h-9 w-9 rounded-lg border border-surface-200 bg-white text-surface-500 hover:bg-surface-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Poprzednia strona"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
            const show =
              num === 1 ||
              num === totalPages ||
              Math.abs(num - page) <= 1;

            if (!show) {
              const prevShow =
                num - 1 === 1 ||
                num - 1 === totalPages ||
                Math.abs(num - 1 - page) <= 1;
              if (prevShow) {
                return (
                  <span key={`dots-${num}`} className="px-1 text-surface-400 text-sm">
                    …
                  </span>
                );
              }
              return null;
            }

            return (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={cn(
                  "flex items-center justify-center h-9 min-w-[2.25rem] rounded-lg text-sm font-medium transition-colors cursor-pointer",
                  page === num
                    ? "bg-primary-500 text-white shadow-sm"
                    : "border border-surface-200 bg-white text-surface-600 hover:bg-surface-50"
                )}
                aria-current={page === num ? "page" : undefined}
              >
                {num}
              </button>
            );
          })}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center justify-center h-9 w-9 rounded-lg border border-surface-200 bg-white text-surface-500 hover:bg-surface-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Następna strona"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
