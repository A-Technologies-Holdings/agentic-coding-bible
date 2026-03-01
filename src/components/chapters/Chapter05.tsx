'use client';

import CaseStudyToggle from "@/components/CaseStudyToggle";
import TableBlock from "@/components/TableBlock";
import CodeBlock from "@/components/CodeBlock";
import Callout from "@/components/Callout";

export default function Chapter05() {
  return (
    <section id="model-routing" className="py-16 border-b border-border">
      <h2 className="text-4xl font-bold mb-8">05 â Model Routing Doctrine</h2>

      <div className="space-y-8 text-lg leading-relaxed">
        <div>
          <h3 className="text-2xl font-semibold mb-4">The Mistake Everyone Makes</h3>
          <p className="mb-4">
            Most teams pick a model and stick with it. Claude for everything. GPT-4 for everything. Gemini for everything. This is like deciding to use a full-size pickup truck for city parking and a two-seater sports car for moving house. You end up overpaying wildly or undershooting critical problems.
          </p>
          <p className="mb-4">
            The principle is dead simple: <strong>route intentionally by task complexity.</strong> Don't randomly assign work to models. Think about what the task actually requiresâcomplexity, reasoning depth, time sensitivity, cost constraintsâand match the model to the job.
          </p>
          <p>
            This is where Staff Engineers start thinking differently than mid-level engineers. A mid-level engineer asks "Does Claude work?" A Staff Engineer asks "Which model should we use for this specific task, and why?" The answer to the second question cuts costs by 70% while actually improving output quality.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Task Sizing: Your Mental Model</h3>
          <p className="mb-6">
            Every task falls into one of four buckets. Size first, then route.
          </p>
          <TableBlock
            headers={["Task Size", "Time Budget", "Examples", "Reasoning Required"]}
            rows={[
              [
                "Small",
                "â¤30 minutes",
                "UI tweak, minor bug fix, small refactor, one-file change, update copy",
                "Low â mostly pattern matching"
              ],
              [
                "Medium",
                "30minâ2hr",
                "Feature implementation, multi-file change, API integration, test suite for existing feature",
                "Medium â requires context and planning"
              ],
              [
                "Large",
                "2â8hr",
                "Data model change, auth flow implementation, security control, major refactor affecting multiple systems",
                "High â requires deep reasoning, trade-offs, risk assessment"
              ],
              [
                "XL",
                "8hr+",
                "Multi-service refactor, security-sensitive redesign, deep debugging across systems, architectural redesign",
                "Highest â requires system-level thinking, multiple iterations"
              ]
            ]}
          />
          <p className="mt-6">
            Your job as an engineer is to size the task accurately. If you think something is a "small" task but it actually requires architectural changes, you'll send it to a cheap model that will hallucinate. If you send a truly small task to the most expensive model, you've wasted money and time.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Phase-Based Routing: Speed vs. Rigor</h3>
          <p className="mb-6">
            Your product doesn't run at one complexity level the whole time. It moves through phases. Route differently at each phase.
          </p>

          <div className="bg-card rounded-lg p-6 mb-6 border border-border">
            <h4 className="text-xl font-semibold mb-4">Phase 1: Exploit (MVP &amp; Exploration)</h4>
            <p className="mb-4">
              You're moving fast. You're testing ideas. Speed is worth more than architectural perfection. Ship broken code, learn from users, iterate.
            </p>
            <p className="font-mono text-sm bg-background p-3 rounded border border-border mb-4">
              Model tier: Cheapest/Fastest (Claude Haiku, GPT-4o-mini, Gemini Flash)
            </p>
            <p>
              This phase is where you prove the product works. Use the cheapest models. They're fast, they're cheap, they're good enough for feature-level work. Yes, they hallucinate more. But in Phase 1, a hallucination just means an extra PR cycle, not a production incident.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h4 className="text-xl font-semibold mb-4">Phase 2: Consolidate (V1 Hardening &amp; Security Review)</h4>
            <p className="mb-4">
              You've proven the idea works. Now you're hardening it. Security review, performance optimization, data model cleanup, error handling. This is where mistakes cost customers trust.
            </p>
            <p className="font-mono text-sm bg-background p-3 rounded border border-border mb-4">
              Model tier: Top-tier (Claude Sonnet, Claude Opus, OpenAI Codex)
            </p>
            <p>
              Send security-critical work to the reasoning models. These are the tasks where a mistake cascades. Better reasoning reduces hallucinations and catches edge cases in your architecture.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Cost Governance: The Routing Questions</h3>
          <p className="mb-6">
            When you pick a model, you're implicitly making a bet about what this task is worth. Ask yourself these questions:
          </p>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li><strong>Does this task require premium reasoning?</strong> Is it security-critical? Does it involve multi-system trade-offs? Is failure expensive? If yes: spend the money on a reasoning model.</li>
            <li><strong>Can an open-weight or smaller model handle this?</strong> Is it mostly pattern matching? Is it a small refactor or a feature implementation that fits in context? If yes: use a cheaper model, save money, get faster response times.</li>
            <li><strong>Is this exploratory or production-critical?</strong> Are we testing an idea, or are we building the paywall that protects revenue? Exploratory work uses cheap models. Revenue-critical work uses expensive models.</li>
            <li><strong>What's the blast radius of failure?</strong> If the model hallucinates and ships broken code, what happens? Does it break tests and CI catches it? Does it make it to production? The bigger the blast radius, the more expensive your model should be.</li>
          </ul>
          <Callout type="tip" title="Cost Governance Mindset">
            Think of model selection like server sizing. You wouldn't run a database on a micro instance and then pay for a high-memory instance if you don't need it. Route based on actual requirements, not assumed ones.
          </Callout>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">OODA Loop Applied to Model Routing</h3>
          <p className="mb-6">
            The OODA loop (Observe, Orient, Decide, Act) scales beautifully to model routing. Here's the cycle:
          </p>

          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-2">Observe</h4>
              <p>Look at logs, metrics, pull request reviews. Where do agents hallucinate most? Where do they succeed? What tasks take longest? What costs the most? You're looking for patterns.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-2">Orient</h4>
              <p>Use a reasoning model (human or Claude with extended thinking) to analyze those patterns. Why are certain tasks failing? Is it insufficient context? Wrong model tier? Missing guardrails?</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-2">Decide</h4>
              <p>Create Linear tasks or update your model routing guidelines. "All auth-related work routes to Claude Opus." "All UI polish routes to Claude Haiku." Document it.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-2">Act</h4>
              <p>Route the next batch of tasks according to your new rules. Measure success. Did cost go down? Did quality improve? Did hallucination rate drop? Loop back to Observe.</p>
            </div>
          </div>

          <p>
            This isn't something you do once. It's a continuous cycle. As your codebase grows, as your team scales, as new models release, you re-evaluate and adjust.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">From Theory to Practice</h3>
          <p className="mb-6">
            Let's make this concrete. Here's how different teams route in reality.
          </p>

          <CaseStudyToggle
            generic={
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Generic Routing Table by Task Size</h4>
                  <TableBlock
                    headers={["Task Size", "Model Tier", "Examples", "Budget/Token"]}
                    rows={[
                      [
                        "Small",
                        "Haiku or Mini",
                        "Component styling, copy updates, one-file bugfix",
                        "$0.50â$2"
                      ],
                      [
                        "Medium",
                        "Sonnet or equivalent",
                        "Feature implementation, API integration, test suite",
                        "$5â$15"
                      ],
                      [
                        "Large",
                        "Opus or Codex",
                        "Auth refactor, data migration, security implementation",
                        "$20â$50"
                      ],
                      [
                        "XL",
                        "Opus + extended thinking",
                        "Multi-service redesign, security audit, deep debugging",
                        "$50â$200"
                      ]
                    ]}
                  />
                </div>
              </div>
            }
            personal={
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Legacy Muse Actual Routing: Real Budget Allocation</h4>
                  <TableBlock
                    headers={["Tool", "Role", "Task Profile", "Monthly Budget"]}
                    rows={[
                      [
                        "Cursor (Claude 3.5 Sonnet)",
                        "Daily UI/Feature work",
                        "Component styling, feature implementation, routine bugfixes",
                        "$200"
                      ],
                      [
                        "Claude Code (Browser Agent)",
                        "Architecture/Verification/MCP ops",
                        "System design review, hallucination verification, integration testing",
                        "$100"
                      ],
                      [
                        "Codex (Deterministic)",
                        "Repo-wide changes",
                        "Automated refactors, branch-per-task workflows, coordinated multi-file updates",
                        "$20"
                      ],
                      [
                        "OpenCode (GLM/Kimi)",
                        "Docs/Boilerplate",
                        "Documentation generation, test template scaffolding, example code",
                        "$10"
                      ]
                    ]}
                  />
                </div>

                <div className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="font-semibold mb-4">Routing Decision: "Implement the plan as specified"</h4>
                  <p className="mb-4">
                    When a Linear ticket says "Implement the plan as specified," we route to Claude Code (not Cursor, not Codex). Why?
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>The ticket links to a detailed architecture doc (from phase 1 system design)</li>
                    <li>There are acceptance criteria and security constraints</li>
                    <li>We need verification that the implementation matches the spec</li>
                    <li>We need human review before merge (Claude Code verifies, humans approve)</li>
                    <li>Cost per ticket: ~$15â$25, worth it for correctness</li>
                  </ul>
                </div>

                <div className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="font-semibold mb-4">Routing Decision: UI Polish</h4>
                  <p className="mb-4">
                    When a ticket is "Make the auth form mobile-responsive" or "Update theme colors," we route to Cursor. Why?
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>It's pattern matchingâcopy existing patterns from the codebase</li>
                    <li>Failure is low-stakes; if it breaks, it's caught in preview deploy</li>
                    <li>Cost per task: &lt;$2, we don't worry about it</li>
                    <li>Speed matters more than deep reasoning</li>
                  </ul>
                </div>

                <div className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="font-semibold mb-4">Routing Decision: Branch-per-Linear-Task</h4>
                  <p className="mb-4">
                    When we need to coordinate 5+ file changes across the codebase (like a component rename or API contract change), we route to Codex. Why?
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Deterministic tooling (AST rewriting, find-replace) beats probabilistic models</li>
                    <li>Cost is ~$5â$20, much cheaper than running multiple Opus queries</li>
                    <li>Fewer hallucinations because we're doing exact string replacement, not code generation</li>
                    <li>Results are reproducible; we can audit exactly what changed</li>
                  </ul>
                </div>
              </div>
            }
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Real Numbers: The Cost Difference</h3>
          <p className="mb-6">
            Let's put a number on why this matters. Assume a team doing 40 tickets per week, average ticket takes 4 agent interactions:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="font-mono text-sm mb-2">
                <strong>Bad routing:</strong> Every ticket â Opus
              </p>
              <p className="font-mono text-sm mb-2">
                40 tickets Ã 4 interactions Ã $15/interaction = <strong>$2,400/week = $9,600/month</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Plus: Higher latency, overkill reasoning for simple tasks, slower feedback loops
              </p>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="font-mono text-sm mb-2">
                <strong>Smart routing:</strong> 60% Haiku ($1), 30% Sonnet ($5), 10% Opus ($15)
              </p>
              <p className="font-mono text-sm mb-2">
                (40 Ã 4 Ã 0.6 Ã $1) + (40 Ã 4 Ã 0.3 Ã $5) + (40 Ã 4 Ã 0.1 Ã $15) = <strong>$480/month</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Plus: Faster response times, better fit for task complexity, clear audit trail of decisions
              </p>
            </div>
          </div>

          <Callout type="warning" title="Cost vs. Quality Trade-off">
            Cheaper models aren't always worse. They're worse at reasoning. They're actually faster and often better at pattern matching. Route based on what the task requires, not on blind cost optimization.
          </Callout>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Decision Tree You Actually Use</h3>
          <p className="mb-6">
            When a new task lands in Linear, here's the decision tree your team should follow:
          </p>

          <CodeBlock
            code={`Task lands in Linear:
ââ Does it touch auth, RLS, payments, security, or data models?
â  ââ YES â Route to Opus or Sonnet. Do we have architecture doc? YES â Cost justified.
â  ââ NO â Continue below
ââ Is it a multi-file refactor across 10+ files?
â  ââ YES â Route to Codex (deterministic). Cost: $5â$20. Better than agent hallucinating.
â  ââ NO â Continue below
ââ Can I describe the solution in one sentence + existing patterns in the codebase?
â  ââ YES â Route to Haiku or Sonnet. Low risk. Low cost. Fast feedback.
â  ââ NO â Route to Sonnet. Requires context, planning, cross-file reasoning.
ââ Do we have failing tests or error traces that show exactly what "correct" means?
â  ââ YES â Any model works (tests are ground truth). Route by cost.
â  ââ NO â Route to Sonnet/Opus. We need the model to infer correctness from context.`}
            language="plaintext"
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Measuring Success: Did Routing Work?</h3>
          <p className="mb-6">
            You should track these metrics to know if your routing strategy is working:
          </p>

          <TableBlock
            headers={["Metric", "Good Target", "Why It Matters"]}
            rows={[
              [
                "Cost per ticket",
                "Under $10 per task",
                "If you're spending $50 per UI fix, routing is wrong"
              ],
              [
                "Hallucination rate by tier",
                "Haiku &lt;5%, Sonnet &lt;2%, Opus &lt;0.5%",
                "Tracks whether you're matching models to task complexity"
              ],
              [
                "First-pass success rate",
                "&gt;70%",
                "How often does the agent's work pass tests and code review without iteration?"
              ],
              [
                "Time-to-approval by tier",
                "Haiku &lt;30min, Sonnet &lt;1hr, Opus &lt;2hr",
                "Cheaper models should be faster because tasks are simpler"
              ],
              [
                "Reviewer cycles by tier",
                "Haiku &lt;2, Sonnet &lt;1.5, Opus &lt;1",
                "Average number of times reviewer asks for changes before merge"
              ]
            ]}
          />
        </div>
      </div>
    </section>
  );
}
