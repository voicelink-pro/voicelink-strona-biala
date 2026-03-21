import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/json-ld";
import { generateArticleSchema } from "@/lib/schema";
import { blogPosts, getBlogPostBySlug, getRelatedPosts, getCategoryStyle } from "@/content/blog";
import { BlogPostContent } from "./blog-post-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return generatePageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${slug}`,
    keywords: post.keywords,
    ogImage: post.coverImage,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const catStyle = getCategoryStyle(post.category);

  return (
    <>
      <JsonLd
        data={generateArticleSchema({
          title: post.title,
          description: post.metaDescription,
          date: post.date,
          author: post.author.name,
          slug: post.slug,
          image: post.coverImage,
        })}
      />

      <Breadcrumbs
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />

      <BlogPostContent post={post} related={related} catStyle={catStyle} />
    </>
  );
}
