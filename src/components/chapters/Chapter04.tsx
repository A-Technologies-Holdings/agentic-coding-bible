'use client';

import CaseStudyToggle from "@/components/CaseStudyToggle";
import TableBlock from "@/components/TableBlock";

export default function Chapter04() {
  return (
    <section id="stack" className="py-16 border-b border-border">
      <h2 className="text-4xl font-bold mb-8">04 â The Agentic Stack</h2>

      <div className="space-y-8 text-lg leading-relaxed">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Platform Choices: Languages and Where They Live</h3>
          <p className="mb-4">
            If Chapter 3 is about defense, this chapter is about offense. It's about building products fast and reliably. The secret isn't exotic technologyâit's choosing the right tool for each job and sticking to it with discipline.
          </p>
          <p className="mb-6">
            Start with language. This decision is more important than most engineers think. Here's our rule:
          </p>
          <TableBlock
            headers={["Layer", "Language", "Rationale"]}
            rows={[
              ["Web frontend", "TypeScript", "Never deviate. Types on the frontend save hours of debugging. UI logic is complex; catch errors early."],
              ["API/Backend", "TypeScript (default)", "Start with TypeScript. Consider Go only if you've profiled and identified a concrete bottleneck."],
              ["Agents/Tooling", "TypeScript", "Agents are often scripts that orchestrate. TypeScript's type system helps even here."],
              ["Data processing", "Python", "Data libraries (pandas, NumPy, scikit-learn) and ML frameworks are in Python. Don't fight the ecosystem."],
              ["High-throughput stream processing", "Go", "Goroutines, memory efficiency, built-in concurrency. Use Go when your Postgres can't keep up."]
            ]}
          />
          <p className="mt-6 mb-4">
            The discipline here is critical. Resist the urge to use Rust for performance, Elixir for reliability, or Clojure for expressiveness. Those languages are great for specific problems. But they add cognitive load, hiring friction, and operational complexity. Start with the defaults. Only deviate when you have a specific, measured constraint (throughput, latency, resource usage) that the default can't meet.
          </p>
          <p>
            We've seen too many startups collapse because they over-engineered their stack. Five languages across three services. Every engineer needed to know everything. Onboarding took months. Debugging was a nightmare because the bottleneck was in the Go service, but the problem manifested in the Node.js service. Stick to the defaults unless you have a good reason not to.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Data Layer: Postgres Everywhere via Supabase</h3>
          <p className="mb-4">
            Here's a principle that will save you years of pain: **Postgres everywhere.** Not NoSQL, not MongoDB, not DynamoDB (unless you have a specific, measured constraint). Postgres is the right default for 90% of applications.
          </p>
          <p className="mb-4">
            Why? Because Postgres is boring. It's been around for 25 years. It's battle-tested. It has transactions, foreign keys, complex queries, full-text search, JSON support, and row-level security built in. You can start with a simple schema and evolve it as you learn. And when you need to scale, Postgres scales surprisingly far.
          </p>
          <p className="mb-6">
            Our recommendation is Supabase, which gives you Postgres with a developer experience layer: instant authentication, real-time subscriptions, edge functions, and RLS policies enforced at the database layer. Here's how Supabase fits into different stages:
          </p>
          <TableBlock
            headers={["Stage", "Database Choice", "Why"]}
            rows={[
              ["MVP (weeks 1-4)", "Supabase Postgres", "Fast to set up, free tier is real, RLS is built-in. No infrastructure debt."],
              ["Realtime features needed", "Supabase Realtime (Postgres + subscriptions)", "Postgres with replication. Much cheaper than external realtime DBs."],
              ["Enterprise, high scale", "Managed Postgres (RDS, CloudSQL)", "More control, dedicated support, enterprise SLAs. Still Postgres."],
              ["Analytics queries (big data)", "DuckDB or ClickHouse (separate system)", "OLTP (Postgres) and OLAP (DuckDB) are different. Don't use Postgres for billion-row analytics."]
            ]}
          />
          <p className="mt-6">
            The key point: you don't migrate databases. You start with the right one. Postgres is right for 95% of use cases. Start there.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Hosting and Infrastructure: The Maturity Ladder</h3>
          <p className="mb-4">
            Hosting is where many teams make expensive mistakes. They over-engineer early (Kubernetes on day one), or under-engineer late (running on a single t2.micro instance with no backups). The right approach is a maturity ladderâsimple at first, sophisticated only when you need it.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
            <h4 className="text-xl font-semibold mb-4">Frontend: Always Vercel with Preview Deployments</h4>
            <p className="mb-4">
              This one is non-negotiable. Vercel is purpose-built for Next.js frontends. You get:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Preview deployments for every PR (test before merge)</li>
              <li>Automatic rollback on failed deployments</li>
              <li>Global CDN (pages are fast everywhere)</li>
              <li>Edge middleware (authentication, redirects, at the edge)</li>
              <li>Integrated analytics and performance monitoring</li>
            </ul>
            <p>
              Cost: $20-50/month for a small team. Worth it. Other hosts (Netlify, Render, etc.) are good, but Vercel is the gold standard for React/Next.js.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-4">Backend: The Maturity Ladder</h4>
              <p className="mb-4">
                Backend hosting is trickier. The right choice depends on your stage:
              </p>

              <div className="space-y-4">
                <div className="pl-4 border-l-4 border-green-500">
                  <p className="font-semibold text-green-900 mb-2">Stage 1 (MVP, &lt;1K requests/day): Lovable or Replit</p>
                  <p className="text-sm">
                    Lovable and Replit let you ship APIs without thinking about infrastructure. You push code, it runs. Cost: free or $5/month. Limitations: cold starts (5-10s first request), no complex background jobs.
                  </p>
                  <p className="text-sm mt-2">
                    Use when: Speed to market matters more than latency. You're validating an idea.
                  </p>
                </div>

                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-900 mb-2">Stage 2 (Validate, 1K-10K requests/day): Stay on the initial platform or Vercel</p>
                  <p className="text-sm">
                    If it works, don't move. Vercel's serverless is excellent (API routes on Vercel, not a separate service). Cost: $20-100/month. You get fast cold starts, better observability, more reliability.
                  </p>
                  <p className="text-sm mt-2">
                    Use when: You've found product-market fit. You need predictable performance and reliability.
                  </p>
                </div>

                <div className="pl-4 border-l-4 border-purple-500">
                  <p className="font-semibold text-purple-900 mb-2">Stage 3 (Mature, 10K+ requests/day): GCP Cloud Run or equivalent</p>
                  <p className="text-sm">
                    Now you're thinking like a real company. GCP Cloud Run gives you containers, auto-scaling, traffic management, and integration with other GCP services (Pub/Sub, Firestore, BigQuery). Cost: $0-500/month depending on traffic. You pay for what you use.
                  </p>
                  <p className="text-sm mt-2">
                    Use when: You have paying customers. Reliability and performance directly affect revenue. You can handle operational complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 mb-4">
            There's also a revenue gate: if you're making less than $10K/month, stay on serverless (Vercel/Lovable). Between $10-50K/month, you're in the "evaluate GCP" zone. At $50K+/month, GCP Cloud Run or equivalent is mandatoryâyou can justify the operational overhead because you have revenue to support it.
          </p>
          <p>
            The temptation to "do DevOps right" early is strong. Kubernetes, custom VPCs, container orchestrationâit all sounds professional. Resist. You don't need it until you need it. And you'll know when you need it because your cloud bill will be higher than your revenue if you're doing it wrong.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Canonical Stack: What We Actually Use</h3>
          <p className="mb-4">
            After years of experimentation, this is the stack we've converged on for web products. It's battle-tested, developer-friendly, and scales from MVP to millions of users:
          </p>

          <div className="grid gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-900 mb-2">Frontend</p>
              <p className="text-sm">Next.js + React + TypeScript + Tailwind CSS + shadcn/ui</p>
              <p className="text-xs text-slate-600 mt-1">Why: Type safety, component reusability, excellent DX, production-ready</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-900 mb-2">Mobile</p>
              <p className="text-sm">React Native or Expo (reuse React/TypeScript knowledge)</p>
              <p className="text-xs text-slate-600 mt-1">Why: Code sharing, faster iteration, modern tooling</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-900 mb-2">Authentication & Database</p>
              <p className="text-sm">Supabase (Postgres + Auth + Realtime)</p>
              <p className="text-xs text-slate-600 mt-1">Why: One system for auth, database, and realtime. RLS at the DB layer.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-900 mb-2">Edge Functions & API</p>
              <p className="text-sm">Vercel API Routes (TypeScript, serverless)</p>
              <p className="text-xs text-slate-600 mt-1">Why: Same deployment as frontend, instant integration, no separate infrastructure</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-900 mb-2">Observability</p>
              <p className="text-sm">Sentry (error tracking) + PostHog (analytics & feature flags)</p>
              <p className="text-xs text-slate-600 mt-1">Why: Real-time error alerting, session replay, feature flag management</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-900 mb-2">Payments</p>
              <p className="text-sm">Stripe (web) + native IAP (iOS/Android)</p>
              <p className="text-xs text-slate-600 mt-1">Why: Stripe for simplicity, native IAP because app stores require it</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-900 mb-2">Deployment</p>
              <p className="text-sm">Vercel (frontend) + GCP Cloud Run (backend, if needed)</p>
              <p className="text-xs text-slate-600 mt-1">Why: Preview deployments for every PR, zero-downtime deploys</p>
            </div>
          </div>

          <p className="mb-4">
            This stack is cohesive. Everything speaks TypeScript. Everything has reasonable defaults but scales if you need it. You can start with 80% of this stack on day one (Vercel + Supabase + Sentry) and add complexity only when you hit constraints.
          </p>
          <p>
            Also, critically: this stack is well-documented. You can find answers on Stack Overflow. You can hire developers who know it. You're not betting your company on obscure technology choices. Boring is a feature.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">System Design in the Real World: How This Comes Together</h3>
          <p className="mb-4">
            Let's see this stack in action:
          </p>
          <CaseStudyToggle
            generic={
              <div className="space-y-4">
                <p>
                  The maturity ladder isn't theoreticalâit's how you avoid overbuilding and underscaling. The progression looks like this:
                </p>
                <ol className="list-decimal list-inside space-y-3">
                  <li><strong>Month 1:</strong> Ship the MVP. Vercel frontend, Supabase backend, Stripe for payments. Cost: ~$50/month. Zero DevOps.</li>
                  <li><strong>Months 2-6:</strong> Validate with users. Same stack, maybe add Sentry for error tracking. Still ~$100/month.</li>
                  <li><strong>Month 6:</strong> Product-market fit signals. Evaluate: is Vercel still fast enough? Are we hitting Postgres limits? Cost is still acceptable, keep it simple.</li>
                  <li><strong>Year 2:</strong> Revenue is real. Now you can justify more sophisticated observability (metrics, tracing), separate backend infrastructure, and DevOps. Cost: $500-2K/month.</li>
                </ol>
                <p className="mt-4">
                  The key: you don't skip stages. You also don't stay in early-stage infrastructure once you've outgrown it. The ladder is your guide.
                </p>
              </div>
            }
            personal={
              <div className="space-y-4">
                <p>
                  <strong>Legacy Muse current state (2026):</strong> Here's exactly what we're running:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Web:</strong> Next.js on Vercel. Every PR gets a preview deployment. Main branch auto-deploys. Zero manual deploy work.</li>
                  <li><strong>Mobile:</strong> React Native transitioning to Phase 3 (native navigation, improved performance). Current version is a PWA with Capacitor hybrid layer. Phase 3 will be pure React Native.</li>
                  <li><strong>Backend:</strong> Supabase Postgres with RLS policies. Every user only sees their own data at the database layer, not application code.</li>
                  <li><strong>Authentication:</strong> Supabase Auth with multi-provider support (Google, Apple, email).</li>
                  <li><strong>Payments:</strong> Stripe for web (cards, bank transfers). Native IAP for iOS/Android (in-app purchases, required by app stores).</li>
                  <li><strong>Observability:</strong> Sentry for error tracking and session replay. PostHog for analytics and feature flags.</li>
                  <li><strong>Design system:</strong> We call it "Parchment & Ink Editorial"âa design language with warm bronze and deep ink tokens. Used across web and mobile. Prevents design debt.</li>
                </ul>
                <p className="mb-4">
                  Cost breakdown: ~$200/month infrastructure, ~$300/month for observability and services. Total: ~$500/month for full platform operations.
                </p>
                <p>
                  Why this stack matters for Legacy Muse specifically: we sell to professionals who care about typography and editing experience. Our design system reflects thatâwarm, editorial, intentional. We don't have a generic mobile app; we have a cohesive experience across web and mobile. The stack supports that vision because everything is TypeScript/React, which means designers and engineers speak the same language.
                </p>
                <p>
                  Also, Supabase RLS was critical for our multi-tenant architecture. Users can share documents with each other, but the database enforces that you can only access documents you own or someone shared with you. No application-layer bugs can break isolation. That's peace of mind worth the infrastructure cost.
                </p>
              </div>
            }
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Discipline: Stick to the Defaults</h3>
          <p className="mb-4">
            The final and most important principle: commit to your stack. Don't reach for Rust because you read an HN post about performance. Don't try DynamoDB because "serverless databases are cool." Don't split your backend across three different frameworks "for specialization."
          </p>
          <p className="mb-4">
            Every technology choice is a bet on your team's ability to maintain it, hire for it, and debug it at 3am when it breaks. The default stack wins because it's the boring choice. It's well-documented, widely used, and nobody gets fired for picking it.
          </p>
          <p>
            Save your architectural risk budget for the hard problems: multi-tenancy, real-time features, compliance. Don't spend it on technology choices. When you have a problem that the default stack can't solve, you'll know. That's when you break the rule. Not before.
          </p>
        </div>
      </div>
    </section>
  );
}
