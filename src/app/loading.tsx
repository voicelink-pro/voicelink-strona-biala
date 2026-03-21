import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="flex flex-1 items-center justify-center py-24">
      <Container className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-surface-200 border-t-primary-600" />
        <p className="mt-4 text-sm text-surface-500">Ładowanie...</p>
      </Container>
    </section>
  );
}
