'use client';

import CaseStudyToggle from "@/components/CaseStudyToggle";
import TableBlock from "@/components/TableBlock";

export default function Chapter02() {
  return (
    <section id="landscape" className="py-16 border-b border-border">
      <h2 className="text-4xl font-bold mb-8">02 â The AI Coding Landscape</h2>

      <div className="space-y-8 text-lg leading-relaxed">
        <div>
          <h3 className="text-2xl font-semibold mb-4">The 2025-2026 State of AI Coding Adoption</h3>
          <p className="mb-4">
            We've crossed a tipping point. AI coding tools are no longer noveltiesâthey're infrastructure. The numbers paint a clear picture:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>85% of developers</strong> use some form of AI assistance for coding</li>
            <li><strong>23% use AI agents weekly,</strong> not just copilots for autocomplete</li>
            <li><strong>30-40% of code in enterprise</strong> is now AI-generated or AI-assisted</li>
            <li><strong>90-95% at well-funded startups</strong> rely on AI for velocity</li>
          </ul>
          <p className="mb-4">
            The shift isn't subtle. If you're not thinking about how AI fits into your workflow, you're already at a disadvantage. But here's the catch: adoption without strategy is chaos. You need to understand which tools exist, what each does well, and how to route work to the right one.
          </p>
          <p>
            The market has fragmented into specialized tools. The days of a single "AI coding tool" are over. Today's professional engineers operate a stackâan IDE tool, a terminal/agentic tool, maybe an enterprise fallback, and specialized tools for specific tasks. This chapter is your playbook for choosing that stack.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Major Players and Their Niches</h3>
          <p className="mb-6">
            Here's the landscape as of early 2026. These aren't all equivalentâthey excel at different things:
          </p>
          <TableBlock
            headers={["Tool", "Niche", "Context Window", "Pricing Model", "Best For"]}
            rows={[
              ["Claude Code", "Deep reasoning & agentic work", "200K tokens", "Pay-per-use ($0.30â$3/request)", "Architecture review, complex refactors, MCP integration"],
              ["Cursor", "Daily IDE experience", "Limited (model varies)", "$20-40/month", "Hour-to-hour coding, inline edits, quick features"],
              ["Windsurf", "Budget-conscious daily work", "Limited (model varies)", "$15/month", "Teams with cost constraints, steady feature work"],
              ["GitHub Copilot", "Enterprise standardization", "8K context", "$10-39/month", "Large organizations, SOC2 compliance, existing GitHub workflows"],
              ["Codex (via API)", "Deterministic, repo-wide changes", "Varies", "Usage-based", "Automated refactors, linting fixes, generated boilerplate"]
            ]}
          />
          <p className="mt-6 mb-4">
            The market also includes point solutionsâspecialized tools for specific needs like test generation, documentation, or database schema design. But the core lineup above represents the generalists you'll route 80% of your work to.
          </p>
          <p>
            One critical difference: some tools are IDE plugins (Cursor, Windsurf, Copilot), while others are browser-based agents (Claude Code). IDE tools are for real-time, collaborative editing. Agentic tools are for complex operations that need context, reasoning, and multi-step execution. You need both.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Multi-Tool Strategy: Not All Work Is the Same</h3>
          <p className="mb-4">
            Here's the key insight: routing work to the right tool is a higher-leverage decision than picking "the best tool." Different tools dominate at different tasks:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>IDE tool (Cursor, Windsurf):</strong> Real-time feature work, fixing errors as you code, quick UI tweaks. You're thinking step-by-step with the AI, usually on a single feature branch. Fast feedback loop. Cost: $15-40/month. Bandwidth: unlimited.</li>
            <li><strong>Terminal/agentic tool (Claude Code):</strong> Architecture decisions, cross-cutting refactors, complex problem-solving, MCP integration, understanding large systems. You describe the problem, AI reasons through it, executes multi-step plans. Cost: pay-per-token. Bandwidth: limited by budget.</li>
            <li><strong>Enterprise fallback (GitHub Copilot):</strong> Large orgs with compliance requirements, SOC2, HIPAA, etc. Not the fastest, but table-stakes for enterprises. Integrates with existing GitHub infrastructure.</li>
            <li><strong>Specialized tools:</strong> Test generation (tests are deterministic, narrower scope), database design, documentation (one-shot, high-quality), code translation.</li>
          </ul>
          <p className="mt-4">
            The recommendation: start with an IDE tool (Cursor or Windsurf) for daily work. Add Claude Code when you hit architectural problems, need to verify systems, or want to integrate MCP servers. As you scale, consider enterprise licensing if you're supporting a large team.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">MCP (Model Context Protocol): The Infrastructure Play of 2024-2025</h3>
          <p className="mb-4">
            Anthropic released MCP in late 2024, and it's become the fastest-adopted standard in the AI tooling space. Why? Because it solves a real problem: how do you safely connect AI models to your systems?
          </p>
          <p className="mb-4">
            MCP is a protocol, like HTTP but for AI context. It lets you wire up servers that feed data to Claudeâyour repository structure, API documentation, customer databases, metrics dashboards, you name it. The model can reason about your real data and constraints.
          </p>
          <p className="mb-4">
            Here's what's happening: just as "running a web server" became normal in the 2000s, "running an MCP server" is becoming table stakes in 2025. Companies are building MCP servers for:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Repository introspection (file structure, recent changes, test results)</li>
            <li>API documentation (OpenAPI specs, rate limits, authentication)</li>
            <li>Database schemas (table definitions, constraints, RLS policies)</li>
            <li>Metrics and observability (error rates, latency, business metrics)</li>
            <li>Customer data access (anonymized user profiles, feature flags)</li>
            <li>Incident response tools (Pagerduty, Sentry, CloudWatch)</li>
            <li>Code search and analysis (exact symbol lookups, dependency trees)</li>
          </ul>
          <p className="mt-4">
            The Linux Foundation adopted MCP in 2025, which means it's no longer a proprietary Anthropic thingâit's becoming industry standard. If you're building a serious agentic AI system, you'll have MCP servers. The specifics vary, but the pattern is clear: "Show the AI what it needs to know, in a standardized way, with safety constraints."
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Building Your Stack: A Practical Example</h3>
          <p className="mb-4">
            Let's ground this in real economics and routing decisions:
          </p>
          <CaseStudyToggle
            generic={
              <div className="space-y-4">
                <p>
                  For a typical engineering team, the recommended 2-tool stack is:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>IDE tool:</strong> Cursor or Windsurf (daily feature work, real-time feedback)</li>
                  <li><strong>Terminal/agentic tool:</strong> Claude Code (architecture, verification, complex cross-cutting work)</li>
                </ul>
                <p>
                  Routing decision tree:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>If it's "build this feature in one file" â use Cursor</li>
                  <li>If it's "refactor this across 20 files" â use Claude Code</li>
                  <li>If it's "I don't know where to start" â use Claude Code to design, then Cursor to execute</li>
                  <li>If it's "verify this matches our architecture" â use Claude Code with MCP context</li>
                  <li>If it's "apply the same change to every instance" â use Claude Code or Codex</li>
                </ul>
                <p className="mt-4">
                  This two-tool setup keeps costs reasonable while maximizing velocity. You're not paying per-token for routine edits (that's Cursor), but you're not limited by IDE context for complex work (that's Claude Code).
                </p>
              </div>
            }
            personal={
              <div className="space-y-4">
                <p>
                  <strong>Our actual 2025 stack at Legacy Muse:</strong> $330/month total for AI tooling. Here's the allocation:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Cursor Max: $200/month â daily feature work, UI polish, quick fixes</li>
                  <li>Claude Code: $100/month (token budget) â architecture review, cross-cutting refactors, MCP operations</li>
                  <li>Codex API: $20/month â automated linting fixes, boilerplate generation, repo-wide changes</li>
                  <li>OpenCode: $10/month â documentation, generated examples, lower-stakes content</li>
                </ul>
                <p className="mb-4">
                  Our routing is disciplined:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Cursor</strong> owns: Building the React Native UI, Tailwind polish, component tweaks, "ship this feature" tasks</li>
                  <li><strong>Claude Code</strong> owns: "Should we restructure the auth layer?", "How do we scale this payment flow?", verifying MCP integrations, reviewing PRs for architectural fit</li>
                  <li><strong>Codex</strong> owns: "Add this linting rule to all files", "Update the import paths everywhere", deterministic bulk changes</li>
                  <li><strong>OpenCode</strong> owns: API documentation, README generation, blog post drafts</li>
                </ul>
                <p>
                  This isn't random. Each tool costs what it costs because it's optimized for that class of work. Using Cursor for "refactor 50 files" would be slow. Using Claude Code for "add a button" would be wasteful. The team that wins is the team that routes work effectively.
                </p>
              </div>
            }
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Catch: Quality and Reasoning Vary Wildly</h3>
          <p className="mb-4">
            This section wouldn't be honest if we ignored a hard truth: AI reasoning quality is not evenly distributed across tools and models. Some tools are built on frontier models (Claude 3.5 Sonnet, GPT-4o). Others are on smaller, cheaper models. Some are optimized for speed, not depth.
          </p>
          <p className="mb-4">
            For architectural decisions, security reviews, and anything that affects your entire product, you want the deepest reasoning available. That's currently Claude Opus or Claude 3.5 Sonnet. For routine feature work, you can afford smaller modelsâspeed matters more than reasoning depth.
          </p>
          <p>
            Know what you're getting from each tool. Read the fine print. If your vendor isn't transparent about model lineage and capabilities, that's a red flag. You're betting your product quality on these tools. Choose thoughtfully.
          </p>
        </div>
      </div>
    </section>
  );
}
