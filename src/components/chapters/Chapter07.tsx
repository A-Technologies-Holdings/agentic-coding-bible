'use client';

import CaseStudyToggle from "@/components/CaseStudyToggle";
import TableBlock from "@/components/TableBlock";
import Callout from "@/components/Callout";

export default function Chapter07() {
  return (
    <section id="agents" className="py-16 border-b border-border">
      <h2 className="text-4xl font-bold mb-8">07 â The Agent Army</h2>

      <div className="space-y-8 text-lg leading-relaxed">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Your Team in Software Form</h3>
          <p className="mb-4">
            A single AI model is not enough. Your "team" needs rolesâpeople (agents) with specific expertise, different scopes of authority, and clear contracts about what they can and cannot do.
          </p>
          <p className="mb-4">
            When you build a startup or lead an engineering team, you don't hire just one person. You hire specialists:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>A CTO who thinks about strategy, doesn't code</li>
            <li>A Staff Engineer who designs systems, sketches diagrams</li>
            <li>Senior developers who write correct code, understand patterns</li>
            <li>A Tech Lead who reviews code, catches bugs before production</li>
            <li>An SDET who writes tests, owns quality gates</li>
          </ul>
          <p>
            With agents, you can have the same structure. Each agent has a role, a set of tools, and a contract. One agent orchestrates (CTO role). One designs (Architect role). One builds the scaffold (ShipFast). One writes careful code (Senior Dev). One reviews (Tech Lead). One tests (SDET).
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The 6 Core Agent Personas</h3>
          <p className="mb-6">
            These are the roles your agent team should cover. Not all teams need all six, but these are the patterns that work.
          </p>

          <TableBlock
            headers={["Persona", "Role", "Real-World Equivalent", "Writes Code?"]}
            rows={[
              [
                "Orchestrator",
                "Plans work, delegates tasks to other agents, tracks progress, coordinates timing",
                "CTO / PM",
                "No"
              ],
              [
                "Architect",
                "System design, API contracts, data model, threat model, makes tradeoff decisions",
                "Staff Engineer / Infra Lead",
                "Diagrams only (no code)"
              ],
              [
                "Scaffold",
                "Builds runnable skeleton fast: database schema, auth wired, first happy path, no edge cases",
                "ShipFast Builder",
                "Yes"
              ],
              [
                "Coder",
                "Implements features with minimal diffs, correct code, test coverage, handles edge cases",
                "Senior Developer",
                "Yes"
              ],
              [
                "Reviewer",
                "Checks correctness, security, maintainability, suggests improvements, blocks bad code",
                "Tech Lead + Security",
                "No (feedback only)"
              ],
              [
                "Tester",
                "Writes test plans, integration tests, edge case tests, verifies acceptance criteria",
                "SDET / QA",
                "Tests only"
              ]
            ]}
          />

          <p className="mt-6">
            Each persona has specific tools, a specific scope, and specific constraints. The Orchestrator can't write code but can create Linear tickets. The Architect doesn't code but owns system decisions. The Coder has code-writing tools but can't deploy to production.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Agent Orchestration Frameworks: Picking Your Tool</h3>
          <p className="mb-6">
            How do you coordinate these agents? There are several frameworks, each with different tradeoffs.
          </p>

          <TableBlock
            headers={["Framework", "Approach", "Best For", "Learning Curve", "Control Level"]}
            rows={[
              [
                "OpenAI AgentKit",
                "SDK with pre-built agents, productized, fast startup",
                "Shipping fast, standard workflows, less customization needed",
                "Low",
                "Low"
              ],
              [
                "Claude Agent SDK",
                "Developer-controlled agent loops, flexible, explicit state management",
                "Complex workflows, custom agent roles, systems thinking",
                "Medium",
                "High"
              ],
              [
                "LangGraph",
                "Explicit multi-agent orchestration with state machines, graph-based",
                "Complex multi-agent systems, clear state transitions, research projects",
                "High",
                "Very High"
              ],
              [
                "CrewAI",
                "Role-based agent teams with collaborative context passing",
                "Teams of agents working together, role-based divisions",
                "Medium",
                "Medium"
              ],
              [
                "AutoGen",
                "Conversable agents, natural language coordination",
                "Research, complex multi-turn conversations, agent teaming",
                "High",
                "Medium"
              ]
            ]}
          />

          <p className="mt-6">
            For most production systems, Claude Agent SDK is the sweet spot: explicit enough to be safe, flexible enough to handle custom workflows, and developer-controlled enough to understand what's happening.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Default Agent Tools Allowlist: What Can They Do?</h3>
          <p className="mb-6">
            Every agent should have a restricted set of tools. This is your security boundary. Build your allowlist first, then give agents access.
          </p>

          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-success pl-6 py-4">
              <h4 className="font-semibold mb-2">Low Risk (Safe to automate)</h4>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>searchDocs:</strong> Query internal documentation, codebase, past decisions</li>
                <li><strong>queryDbReadOnly:</strong> Read from database (never write, never delete)</li>
                <li><strong>createTicket:</strong> Create Linear/Jira tickets with predefined templates</li>
                <li><strong>summarizeDiff:</strong> Analyze PR diffs, suggest reviewers, check test coverage</li>
                <li><strong>runChecks:</strong> Run linting, type checking, test suite locally</li>
                <li><strong>logMetric:</strong> Send observability data to Datadog / Grafana</li>
              </ul>
            </div>

            <div className="border-l-4 border-warning pl-6 py-4">
              <h4 className="font-semibold mb-2">Medium Risk (Require approval)</h4>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>openPullRequest:</strong> Create PR with code changes (human must review + merge)</li>
                <li><strong>deployPreview:</strong> Deploy to preview environment (not production)</li>
                <li><strong>updateDbSchema:</strong> Run migrations (with rollback approval first)</li>
              </ul>
            </div>

            <div className="border-l-4 border-danger pl-6 py-4">
              <h4 className="font-semibold mb-2">NEVER in Production</h4>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>arbitraryShell:</strong> Running arbitrary shell commands (can read secrets, delete files)</li>
                <li><strong>writeDb:</strong> Writing to database without explicit approval per operation</li>
                <li><strong>directFilesystem:</strong> Direct file write/delete (bypasses version control, audit trail)</li>
                <li><strong>arbitraryNetworkRequest:</strong> Making uncontrolled API calls (data exfiltration risk)</li>
                <li><strong>deployProduction:</strong> Pushing to production without human sign-off</li>
              </ul>
            </div>
          </div>

          <Callout type="warning" title="Tool Access Is Your Safety Boundary">
            Your agent team is only as safe as the tools you give them. If you give an agent shell access, you've given it the ability to read your .env file and exfiltrate secrets. Don't do that. Think about each tool like you're handing a key. What does this key unlock? Who should have access?
          </Callout>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Persona in Practice: The Orchestrator</h3>
          <p className="mb-6">
            Let's walk through how one persona works in detail.
          </p>

          <div className="bg-card rounded-lg p-6 border border-border mb-6">
            <h4 className="font-semibold mb-4">What the Orchestrator Does</h4>
            <p className="mb-4">
              The Orchestrator looks at the product roadmap, understands the constraints (budget, time, security requirements), and creates the execution plan. It breaks the problem into pieces, delegates to other agents, and tracks progress.
            </p>
            <p className="mb-4">
              <strong>Tools available to Orchestrator:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>readDocs (read ARCH_NOTES.md, past decisions, codebase patterns)</li>
              <li>createTicket (create Linear issues with acceptance criteria)</li>
              <li>queryDbReadOnly (understand current data, schema)</li>
              <li>listAgentStatuses (see what other agents are working on)</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h4 className="font-semibold mb-4">Example: Orchestrator Conversation</h4>
            <div className="bg-background p-4 rounded border border-border font-mono text-sm space-y-3">
              <p><strong className="text-primary">Human:</strong> "Implement the voice model swap feature. We have 5 days. Ship to production by EOW."</p>
              <p><strong className="text-primary">Orchestrator:</strong> "I'll break this down. Let me first check our current architecture."</p>
              <p className="text-muted-foreground">[reads ARCH_NOTES.md, checks users table schema, reviews voice model implementation]</p>
              <p><strong className="text-primary">Orchestrator:</strong> "Here's the plan:</p>
              <p className="ml-4">Stage 0 (1 hr): Document requirements, ICP, non-goals</p>
              <p className="ml-4">Stage 1 (2 hrs): System design (ARCH_NOTES update)</p>
              <p className="ml-4">Stage 2 (1 hr): Break into 5 tickets</p>
              <p className="ml-4">Stage 3 (4 hrs): Scaffold migration + API</p>
              <p className="ml-4">Stage 4 (2 days): Daily iteration on features</p>
              <p className="ml-4">Stage 5 (1 day): Hardening, observability, security review</p>
              <p>Creating tickets now..."</p>
              <p className="text-muted-foreground">[creates 6 Linear tickets with acceptance criteria, assigns to Architect, Scaffold, Coder, Tester]</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Multi-Agent Coordination Patterns</h3>
          <p className="mb-6">
            How do agents talk to each other and coordinate? Here are the patterns that work:
          </p>

          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-3">Pattern 1: Sequential (Waterfall)</h4>
              <p className="text-sm text-muted-foreground mb-3">Orchestrator â Architect â Scaffold â Coder â Tester â Reviewer</p>
              <p>
                One agent finishes, next agent starts. Simple, clear, but slow. Best for: sequential work that can't parallelize (e.g., architecture must come before scaffold).
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-3">Pattern 2: Parallel (Phase-based)</h4>
              <p className="text-sm text-muted-foreground mb-3">Orchestrator creates phase tickets. Scaffold + Coder work in parallel on different features.</p>
              <p>
                Multiple agents work simultaneously on different features in the same phase. Faster. Requires good tickets. Best for: iterating across features simultaneously.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-3">Pattern 3: Layered Review (Correctness Check)</h4>
              <p className="text-sm text-muted-foreground mb-3">Coder â Reviewer (security + correctness) â Tester (coverage) â Deploy</p>
              <p>
                Code gets multiple passes. First pass: does it work? Second pass: is it secure? Third pass: are tests comprehensive? Slower but catches more issues.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-3">Pattern 4: Continuous Feedback Loop</h4>
              <p className="text-sm text-muted-foreground mb-3">Coder â Tests fail? â Reviewer suggests approach â Coder fixes â Tests pass â Deploy</p>
              <p>
                Not linear. If tests fail, feedback goes back to Coder. Tester and Reviewer work together. More realistic, more iterations, but agents learn from failures.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">From Theory to Practice</h3>

          <CaseStudyToggle
            generic={
              <div className="space-y-4">
                <p>
                  Most teams start with 2-3 personas: Orchestrator (human or agent), Coder (agent), Reviewer (human). You can expand later.
                </p>
                <p>
                  The framework scales from startup (one human wearing all hats + one coding agent) to enterprise (six agents, each with their own persona, running in parallel).
                </p>
                <p>
                  The key principle: each agent knows their role, their tools, and their constraints. They don't guess. They don't exceed their authority. They don't make decisions outside their scope.
                </p>
              </div>
            }
            personal={
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Legacy Muse Agent Team Structure</h4>
                  <p className="mb-4">
                    We have 4 agents running in production:
                  </p>
                  <TableBlock
                    headers={["Agent", "Persona", "Tool Set", "Typical Day"]}
                    rows={[
                      [
                        "Claude Code (Browser)",
                        "Architect + Reviewer",
                        "readDocs, queryDbReadOnly, summarizeDiff, createTicket, runChecks",
                        "Review PRs for security holes, suggest improvements, verify architecture decisions"
                      ],
                      [
                        "Cursor (IDE Agent)",
                        "Coder",
                        "readDocs, readDb, writeDiff, testLocal, createPR",
                        "Implement features from Linear tickets, write tests, open PRs for human review"
                      ],
                      [
                        "Codex (Deterministic)",
                        "Scaffold + Automation",
                        "findReplace, gitApply, migrationGenerate",
                        "Repo-wide refactors, automated migrations, coordinated multi-file changes"
                      ],
                      [
                        "Tester (Custom)",
                        "Tester + QA",
                        "runTests, queryDbReadOnly, deployPreview, verifyBehavior",
                        "Integration testing, edge case discovery, preview environment verification"
                      ]
                    ]}
                  />
                </div>

                <div className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="font-semibold mb-4">Coordination Pattern: Parallel Phase Agents</h4>
                  <p className="mb-4">
                    We use parallel phase agents: one agent per phase, each with its own branch and PR.
                  </p>
                  <p className="mb-4">
                    <strong>Workflow:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Orchestrator (human) creates problem statement + 5 Linear tickets</li>
                    <li>Architect agent creates ARCH_NOTES.md in a PR</li>
                    <li>Once Architect PR merges to dev, Scaffold agent creates feature/* branch and implements skeleton</li>
                    <li>Once skeleton is runnable, Coder agents work in parallel on different features</li>
                    <li>Each feature gets its own PR, goes through review, deploys to preview</li>
                    <li>Tester agent verifies on preview, then feature merges to dev</li>
                    <li>Once all features are in dev, Reviewer agent does security pass before promotion to main</li>
                  </ul>
                  <p>
                    Result: Parallelization where possible, sequential gates only where necessary. Typically 2-3 days from idea to production for medium features.
                  </p>
                </div>

                <div className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="font-semibold mb-4">Real Example: External Audit Ingestion</h4>
                  <p className="mb-4">
                    A third-party security firm audits our code and finds 12 issues. Here's how our agent team handles it:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>Human pastes audit into Linear ticket</li>
                    <li>Orchestrator reads audit, creates 12 sub-tickets, each with: audit finding + expected fix + acceptance criteria</li>
                    <li>Reviewer agent reads each finding, verifies it exists in codebase (file:line), creates summary document</li>
                    <li>Human reviews Reviewer's summary. Some findings are real, some are false positives.</li>
                    <li>Coder agent gets only the "confirmed real" issues, implements fixes with tests</li>
                    <li>Tester agent verifies each fix on preview environment</li>
                    <li>Reviewer agent double-checks that fixes actually address the audit findings</li>
                    <li>All fixes merged to dev, then to main in a single "Security fixes from audit" PR</li>
                  </ul>
                  <p>
                    The key: Reviewer agent did verification before Coder agent spent time. Saved 10 hours of wasted effort on false positives.
                  </p>
                </div>
              </div>
            }
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Building Your Agent Team: Start Small</h3>
          <p className="mb-6">
            You don't need six agents on day one. Start with the minimum viable team:
          </p>

          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-3">Month 1: Human Orchestrator + AI Coder</h4>
              <p className="text-sm text-muted-foreground mb-2">Min viable team: 1 human wearing CTO/Architect/Review hats + 1 AI agent writing code</p>
              <p>
                You plan, you design, you create tickets. The AI implements. You review. This works for small teams.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-3">Month 3: Add AI Architect</h4>
              <p className="text-sm text-muted-foreground mb-2">Human Orchestrator, AI Architect, AI Coder, Human Reviewer</p>
              <p>
                Architecture work is now automated. You create problem statements, the AI generates system designs. Frees you to focus on strategy and review.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-3">Month 6: Add AI Tester + AI Reviewer</h4>
              <p className="text-sm text-muted-foreground mb-2">All personas have agents. Human orchestration only.</p>
              <p>
                Now you're in fully agentic mode. Humans plan and verify, agents execute all stages. Humans focus on high-level decisions.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The One Unbreakable Rule: Agent Contracts</h3>
          <Callout type="info" title="Every Agent Has a Contract">
            Each agent must have a written contract:
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong>Scope:</strong> What can you decide? What requires human approval?</li>
              <li><strong>Tools:</strong> What APIs can you call? What databases can you access? Read-only or read-write?</li>
              <li><strong>Constraints:</strong> What can you never do? What are hard limits?</li>
              <li><strong>Success metrics:</strong> How do we measure if you did your job well?</li>
            </ul>
            When an agent tries to do something outside its contract, it should fail loudly. "I don't have permission to deploy to production" or "I can only read from this database" or "Creating users requires human approval."
          </Callout>
        </div>
      </div>
    </section>
  );
}
