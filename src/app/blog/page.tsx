import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/motion";
import { BlogListing } from "@/components/blog/blog-listing";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog — Wiedza o AI w medycynie",
  description:
    "Artykuły, poradniki i analizy dotyczące sztucznej inteligencji, automatyzacji recepcji i obsługi pacjentów w placówkach medycznych.",
  path: "/blog",
  keywords: [
    "blog AI medycyna",
    "automatyzacja recepcji blog",
    "voicebot medyczny artykuły",
    "AI recepcja poradniki",
  ],
});

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />

      {/* Hero */}
      <section className="relative pt-12 pb-8 md:pt-20 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 gradient-bg-hero" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary-100/30 blur-[120px] -translate-y-1/2 translate-x-1/3" />

        <Container className="relative">
          <FadeIn>
            <div className="max-w-2xl">
              <Badge variant="primary" className="mb-5">
                <BookOpen className="h-3 w-3 mr-1" />
                Blog VoiceLink
              </Badge>
              <h1 className="text-4xl font-bold text-primary-950 sm:text-5xl lg:text-6xl tracking-tight">
                Wiedza, która{" "}
                <span className="relative">
                  <span className="text-primary-500">rozwija</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5Q50 1 100 4T199 3" stroke="var(--color-primary-400)" strokeWidth="2" strokeLinecap="round" className="opacity-50" />
                  </svg>
                </span>
              </h1>
              <p className="mt-5 text-lg text-surface-500 leading-relaxed max-w-lg">
                Artykuły o AI w medycynie, automatyzacji recepcji, obsłudze pacjentów
                i&nbsp;technologiach zmieniających branżę medyczną.
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-surface-400">
                <span className="font-medium text-primary-950">{blogPosts.length}</span> artykułów
                <span className="w-px h-4 bg-surface-200" />
                <span className="font-medium text-primary-950">
                  {new Set(blogPosts.map((p) => p.category)).size}
                </span> kategorii
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Listing */}
      <section className="pb-16 md:pb-24">
        <Container>
          <BlogListing posts={sortedPosts} />
        </Container>
      </section>
    </>
  );
}
