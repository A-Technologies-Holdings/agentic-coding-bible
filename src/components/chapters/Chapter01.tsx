'use client';

import CaseStudyToggle from "@/components/CaseStudyToggle";
import TableBlock from "@/components/TableBlock";
import Callout from "@/components/Callout";

export default function Chapter01() {
  return (
    <section id="philosophy" className="py-16 border-b border-border">
      <h2 className="text-4xl font-bold mb-8">01 — North Star Philosophy</h2>

      <div className="space-y-8 text-lg leading-relaxed">
        <div>
          <h3 className="text-2xl font-semibold mb-4">What You're Actually Building Toward</h3>
          <p className="mb-4">
            This guide is not about becoming a better tutorial follower. It's not about collecting badges on coding challenge sites or mastering the latest framework in isolation. Instead, we're building toward a mindset that distinguishes Staff and Principal Engineers from the rest: the ability to think in systems.
          </p>
          <p className="mb-4">
            When you reach Staff or Principal level—or when you're founding your own company—your actual job shifts. You're no longer asked to "build this feature" in vacuum. You're asked questions like: "Can we ship an MVP in seven days?" or "How do we handle multi-tenant isolation without a security incident?" or "What's our incident response playbook when Stripe goes down?" or "Why is our cloud bill $50k/month and what can we cut?"
          </p>
          <p>
            The generalist's superpower is understanding how all the pieces connect: authentication flows, row-level security across shared database rows, observability and alerting, compliance requirements, cost optimization, and how to think in trade-offs. Coding skill matters, but it's table stakes. Systems thinking is where leverage lives.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Goal Metrics: Non-Negotiable Baselines</h3>
          <p className="mb-6">
            Every team shipping code with AI assistance should track these metrics. They're not aspirational—they're the baseline for anything you'd put in production:
          </p>
          <TableBlock
            headers={["Metric", "Target", "Why It Matters"]}
            rows={[
              ["Ship MVPs", "Under 7 days", "Speed without recklessness. Your competitors move fast; you need parity."],
              ["Hallucinated imports in prod", "0", "AI models invent SDK methods that don't exist. Your CI must catch this."],
              ["Exposed secrets in commits", "0", "Leaked API keys are a board-level incident. Prevent at pre-commit."],
              ["RLS on multi-tenant tables", "100%", "Row-level security is not optional for shared data. It's foundational."],
              ["Design system consistency", "1 per product", "Design debt kills velocity. One source of truth for components, tokens, patterns."]
            ]}
          />
          <p className="mt-6">
            These aren't theoretical. Each one comes from incidents we've either prevented or experienced the hard way.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Generalist's Superpower: Systems Thinking Over Raw Coding Skill</h3>
          <p className="mb-4">
            Here's a hard truth: a mid-level engineer who deeply understands multi-tenant architecture, database isolation, and incident response is more valuable than a brilliant hacker who doesn't. Systems thinking is the skill that compounds.
          </p>
          <p className="mb-4">
            Consider what you actually need to know:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>Auth flows:</strong> How does SSO work? What's the difference between sessions and JWTs? When does token refresh create a security vulnerability?</li>
            <li><strong>RLS (Row-Level Security):</strong> How do you prevent one customer from viewing another's data at the database layer, not just in application code?</li>
            <li><strong>Incident response:</strong> When Stripe is down, does your product still work? What's your rollback plan? Who gets paged at 3am?</li>
            <li><strong>Cloud economics:</strong> A naive database query can cost you $100k/month. How do you profile costs before they're bills?</li>
            <li><strong>What auditors actually want:</strong> Compliance isn't red tape. SOC2, GDPR, HIPAA—these exist because breaches destroy companies. What do they require?</li>
            <li><strong>Observability and monitoring:</strong> You can't fix what you don't see. Logs, metrics, traces, alerts—how do you weave these together?</li>
          </ul>
          <p>
            AI tools are exceptional at executing within well-defined systems. But if you don't understand the systems, you'll ask the tool for something that works locally but breaks at scale. The generalist who understands the full stack—database to UI, deploy pipeline to incident response—can guide AI toward production-grade solutions.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Context Engineering Shift: From "Vibe Coding" to Systematic Prompt Engineering</h3>
          <p className="mb-4">
            In 2025, the frontier has moved. It's not "Can I use AI to write code?" The answer to that is obvious: yes. The new question is "How do I systematically manage what context the AI sees about my codebase so it makes good decisions?"
          </p>
          <p className="mb-4">
            "Vibe coding"—asking Claude or ChatGPT for a chunk of code based on vibes and hoping it works—works for scripts and toys. It fails catastrophically in production systems. The shift to context engineering means:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Showing the AI relevant database schemas, not just describing them</li>
            <li>Sharing existing patterns from your codebase so it copies your idioms, not its defaults</li>
            <li>Making security constraints explicit: "No direct database access from client code" or "All secrets must come from environment variables"</li>
            <li>Providing failing test cases or error traces so the AI understands what "correct" looks like in your world</li>
            <li>Enforcing tool allowlists: this agent can call these APIs, not others</li>
            <li>Using CI as a teaching mechanism: when a pull request fails CI, that's feedback to the AI about your standards</li>
          </ul>
          <p>
            Context engineering is the discipline of saying: "Here's how we do things here. Here are the constraints. Here are three examples of the pattern we want. Now work within that." It sounds like overhead. It's actually the fastest path to production-grade AI-generated code.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Core Doctrine: Build Secure-by-Default Agentic AI Solutions</h3>
          <p className="mb-4">
            We operate under a single core doctrine that threads through everything in this guide:
          </p>
          <Callout type="info" title="Core Doctrine">
            Build secure-by-default agentic AI solutions that benefit humanity. Never compromise on foundational security. Never ship what you wouldn't bet your company on.
          </Callout>
          <p className="mt-6 mb-4">
            Practically, this means:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>RLS at the database layer:</strong> Never rely on application code to enforce isolation. The database itself must prevent one user from seeing another's data.</li>
            <li><strong>CI gates before merge:</strong> If the build fails, the PR doesn't merge. No exceptions, no "we'll fix it tomorrow." This teaches AI—and humans—that quality is non-negotiable.</li>
            <li><strong>Preview deployments before prod:</strong> Every feature branch gets its own live environment. You and your team test against real infrastructure before it goes to customers.</li>
            <li><strong>Sentry on day one:</strong> Error tracking and session replay aren't nice-to-haves. They're your eyes into production. Wire them up before launch.</li>
            <li><strong>Secrets never committed:</strong> Use environment variables, vaults, and CI/CD secrets. A single .env file in your repo is a breach waiting to happen.</li>
            <li><strong>Model routing discipline:</strong> Different models for different jobs. Claude for reasoning and architecture, GPT-4o for vision, smaller models for deterministic operations.</li>
            <li><strong>AI tool allowlists:</strong> Agents should not have access to every API and database. Restrict to what they genuinely need.</li>
            <li><strong>Human-in-the-loop for high-risk operations:</strong> Agents can generate code and run tests. But creating users, deleting data, or pushing to prod? That's a human decision.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">From Theory to Practice: How This Works in Reality</h3>
          <p className="mb-4">
            None of this is theoretical. Let's ground it in how you'll actually think about building with AI:
          </p>
          <CaseStudyToggle
            generic={
              <div className="space-y-4">
                <p>
                  When you're working with an AI agent on critical code, think of it like onboarding a junior engineer. You wouldn't give a junior unfettered database access and tell them to "just be careful." Instead, you'd set up guardrails:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Code review: every PR gets human eyes before merge</li>
                  <li>Staging environment: changes run against real infrastructure, real data (anonymized), real external services in test mode</li>
                  <li>Gradual rollout: launch to 1% of users first, monitor, then wider</li>
                  <li>Kill switches: if something goes wrong, you can flip a switch and route traffic away</li>
                  <li>Clear constraints: "You can touch this code but not that code. You can call this API but not that one."</li>
                </ul>
                <p>
                  The same applies to agents. They're exceptionally productive, but they need structure. Your job is building that structure so they can move fast without breaking things.
                </p>
              </div>
            }
            personal={
              <div className="space-y-4">
                <p>
                  <strong>Legacy Muse case study:</strong> We built a mobile SaaS platform with a React Native client and Supabase backend. The product handles subscriptions, in-app purchases, and user-generated content.
                </p>
                <p>
                  Here's how we applied the doctrine:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>RLS at the database layer:</strong> Every table has a user_id column. Supabase policies prevent users from querying other users' rows, enforced before the database even executes the query.</li>
                  <li><strong>Stripe + IAP isolation:</strong> Payment events go through Vercel API routes (serverless, no cold starts, controlled blast radius). We never expose Stripe keys to the client. In-app purchase tokens are validated server-side before unlocking features.</li>
                  <li><strong>AI features with safety harnesses:</strong> We use Claude Code via a Vercel API route. The agent gets the user's anonymized prompt, relevant schema, and three working examples. It cannot access production data, customer lists, or billing info. Output goes through our own content policy before reaching users.</li>
                  <li><strong>Sentry on day one:</strong> Every error, every slow transaction, every user session is logged. We've caught issues in production 20 minutes after deploy because Sentry told us before customers complained.</li>
                  <li><strong>Preview deployments:</strong> Every feature branch gets a live Vercel preview. We test against real Supabase, real Stripe test mode, real Sentry. No surprises when we merge.</li>
                </ul>
                <p>
                  This setup isn't paranoia. It's the foundation that lets us move fast and ship features weekly without creating security incidents.
                </p>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
