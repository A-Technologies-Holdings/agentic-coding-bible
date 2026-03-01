import Navigation from "@/components/Navigation";
import Chapter01 from "@/components/chapters/Chapter01";
import Chapter02 from "@/components/chapters/Chapter02";
import Chapter03 from "@/components/chapters/Chapter03";
import Chapter04 from "@/components/chapters/Chapter04";
import Chapter05 from "@/components/chapters/Chapter05";
import Chapter06 from "@/components/chapters/Chapter06";
import Chapter07 from "@/components/chapters/Chapter07";
import Chapter08 from "@/components/chapters/Chapter08";
import Chapter09 from "@/components/chapters/Chapter09";
import Chapter10 from "@/components/chapters/Chapter10";
import Chapter11 from "@/components/chapters/Chapter11";
import Chapter12 from "@/components/chapters/Chapter12";
import Chapter13 from "@/components/chapters/Chapter13";
import Chapter14 from "@/components/chapters/Chapter14";
import Chapter15 from "@/components/chapters/Chapter15";
import Chapter16 from "@/components/chapters/Chapter16";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="xl:ml-64 pt-16">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/3" />
          <div className="relative max-w-4xl mx-auto px-6 py-20 sm:py-28">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              AGOS Framework &mdash; Version 3.0
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              The Agentic<br />Coding Bible
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl leading-relaxed mb-8">
              A battle-tested playbook for engineers who think at the CTO/CISO level
              and use AI agents as their senior dev team. Security-first.
              Architecture-driven. Production-realistic.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1.5 rounded-full bg-foreground/5 border border-border text-muted">16 Chapters</span>
              <span className="px-3 py-1.5 rounded-full bg-foreground/5 border border-border text-muted">Real Case Studies</span>
              <span className="px-3 py-1.5 rounded-full bg-foreground/5 border border-border text-muted">$330/mo AI Stack</span>
              <span className="px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium">Open Source</span>
            </div>
          </div>
        </section>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Chapter01 />
          <Chapter02 />
          <Chapter03 />
          <Chapter04 />
          <Chapter05 />
          <Chapter06 />
          <Chapter07 />
          <Chapter08 />
          <Chapter09 />
          <Chapter10 />
          <Chapter11 />
          <Chapter12 />
          <Chapter13 />
          <Chapter14 />
          <Chapter15 />
          <Chapter16 />
        </div>
        <footer className="border-t border-border py-12 text-center text-sm text-muted">
          <p className="mb-2">Built with the AGOS Framework &mdash; Agentic Operations System</p>
          <p className="text-xs">&copy; 2026 Open Source &mdash; Fork it. Adapt it. Ship secure software.</p>
        </footer>
      </main>
    </>
  );
}
