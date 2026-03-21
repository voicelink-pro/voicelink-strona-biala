import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/json-ld";
import { generateBreadcrumbSchema } from "@/lib/schema";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: "Strona główna", href: "/" }, ...items];

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(allItems)} />
      <nav aria-label="Ścieżka nawigacji" className="border-b border-surface-100 bg-surface-50">
        <Container>
          <ol className="flex items-center gap-1.5 py-3 text-sm">
            {allItems.map((item, index) => {
              const isLast = index === allItems.length - 1;
              return (
                <li key={item.href} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-surface-400" aria-hidden="true" />
                  )}
                  {isLast ? (
                    <span className="text-surface-500" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-surface-600 hover:text-primary-500 transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </Container>
      </nav>
    </>
  );
}
