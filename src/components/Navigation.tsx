"use client";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const chapters = [
  { id: "philosophy", label: "01 \u2014 Philosophy", short: "Philosophy" },
  { id: "landscape", label: "02 \u2014 AI Landscape", short: "Landscape" },
  { id: "supply-chain", label: "03 \u2014 Supply Chain Security", short: "Security" },
  { id: "stack", label: "04 \u2014 The Agentic Stack", short: "Stack" },
  { id: "model-routing", label: "05 \u2014 Model Routing", short: "Routing" },
  { id: "sdlc", label: "06 \u2014 Agentic SDLC", short: "SDLC" },
  { id: "agents", label: "07 \u2014 Agent Army", short: "Agents" },
  { id: "anti-hallucination", label: "08 \u2014 Anti-Hallucination", short: "Verification" },
  { id: "prompt-engineering", label: "09 \u2014 Prompt Engineering", short: "Prompts" },
  { id: "ui-standards", label: "10 \u2014 UI Standards", short: "UI" },
  { id: "repo-standards", label: "11 \u2014 Repo & CI/CD", short: "CI/CD" },
  { id: "production", label: "12 \u2014 Production", short: "Production" },
  { id: "governance", label: "13 \u2014 Governance", short: "Governance" },
  { id: "failures", label: "14 \u2014 Failures & Lessons", short: "Lessons" },
  { id: "playbook", label: "15 \u2014 Startup Playbook", short: "Playbook" },
  { id: "daily-loops", label: "16 \u2014 Daily Loops", short: "Loops" },
];

export default function Navigation() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    chapters.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden xl:block fixed left-0 top-0 w-64 h-screen overflow-y-auto border-r border-border bg-surface/80 backdrop-blur-xl z-40 pt-20 pb-8 px-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted mb-4 px-2">
          Chapters
        </div>
        {chapters.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`block px-3 py-1.5 rounded-md text-sm transition-all mb-0.5 ${
              active === id
                ? "bg-accent/10 text-accent font-medium"
                : "text-muted hover:text-foreground hover:bg-foreground/5"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-border z-50 flex items-center justify-between px-4 xl:pl-72">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-lg hover:bg-foreground/5"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="text-sm font-bold tracking-tight">
            <span className="text-accent">AGOS</span>{" "}
            <span className="hidden sm:inline">Agentic Coding Bible</span>
            <span className="sm:hidden">Bible</span>
          </span>
          <span className="text-xs text-muted border border-border rounded-full px-2 py-0.5">
            v3.0
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener"
            className="p-2 rounded-lg hover:bg-foreground/5 transition-colors text-muted hover:text-foreground"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <nav className="w-72 h-full bg-surface border-r border-border pt-20 pb-8 px-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted mb-4 px-2">
              Chapters
            </div>
            {chapters.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm transition-all mb-0.5 ${
                  active === id
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
