import { Shield, Server, Lock, FileCheck } from "lucide-react";
import { Container } from "@/components/ui/container";

const trustItems = [
  { icon: Shield, label: "Zgodność z RODO" },
  { icon: Server, label: "Serwery w UE" },
  { icon: Lock, label: "Szyfrowanie AES-256" },
  { icon: FileCheck, label: "Gotowość na AI Act" },
];

export function TrustBar() {
  return (
    <section className="border-y border-surface-100 bg-surface-50/80 py-5">
      <Container>
        <div className="animate-fade-up flex flex-wrap items-center justify-center gap-x-10 gap-y-3" style={{ animationDelay: "0.1s" }}>
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-sm text-surface-500">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-50">
                <Icon className="h-3.5 w-3.5 text-accent-400" />
              </div>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
