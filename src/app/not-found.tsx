import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center py-24">
      <Container size="narrow" className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50">
          <Search className="h-10 w-10 text-primary-400" />
        </div>
        <h1 className="mt-8 text-4xl font-bold text-primary-950 sm:text-5xl">
          Strona nie istnieje
        </h1>
        <p className="mt-4 text-lg text-surface-600 max-w-md mx-auto">
          Strona, której szukasz, mogła zostać przeniesiona lub nie istnieje.
          Sprawdź adres lub wróć na stronę główną.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button size="lg">
              <ArrowLeft className="h-4 w-4" />
              Wróć na stronę główną
            </Button>
          </Link>
          <Link href="/kontakt">
            <Button variant="outline" size="lg">
              Skontaktuj się z nami
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
