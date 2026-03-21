export interface Industry {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  heroTitle: string;
  heroDescription: string;
  problems: string[];
  benefits: { title: string; description: string }[];
  stats: { value: string; label: string }[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Integration {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  category: "calendar" | "reservation" | "telephony" | "api" | "crm" | "edm";
  features: string[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "product" | "implementation" | "security" | "pricing" | "general";
}

export interface BlogAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export type BlogCategory =
  | "AI w medycynie"
  | "Poradniki"
  | "Porównania"
  | "Specjalizacje"
  | "Technologia"
  | "Aktualności";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  date: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  readTime: number;
  featured?: boolean;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  description?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}
