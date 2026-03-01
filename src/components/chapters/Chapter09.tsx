"use client";

import CaseStudyToggle from "@/components/CaseStudyToggle";
import TableBlock from "@/components/TableBlock";
import CodeBlock from "@/components/CodeBlock";
import Callout from "@/components/Callout";

export default function Chapter09() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section id="prompt-engineering" className="py-16 border-b border-border">
        <h2 className="text-4xl font-bold mb-8 text-foreground">
          09 â Prompt Engineering for Agents
        </h2>

        <div className="prose prose-invert max-w-none space-y-8">
          <p className="text-lg text-foreground/90 leading-relaxed">
            When most engineers hear "prompt engineering," they think of ChatGPTâthe art of coaxing a chatbot to generate better text. But agentic prompt engineering is fundamentally different. This is about structuring and constraining inputs so that AI systems can reliably execute multi-step operations, interact with external tools, and maintain state across long-running tasks. Your prompts become the specification language for autonomous behavior.
          </p>

          <p className="text-lg text-foreground/90 leading-relaxed">
            At scale, a vague prompt ("can you fix this?") devolves into wild guessing. A structured prompt with clear gates, verification steps, and scope boundaries turns an AI system into a reproducible deployment tool. The difference between a 70% success rate and a 95% success rate often lies not in model capability but in prompt discipline.
          </p>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Four Canonical Prompt Templates
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  1. Plan-First Execution
                </h4>
                <p className="text-foreground/80 mb-3">
                  Use this when you need sequential, auditable work. The agent creates a plan, you review it, then execution happens without modifications.
                </p>
                <CodeBlock
                  code={`Context: [doc].
Task: Create N-day plan with owners, commands, done criteria.
Then implement.
Do NOT edit the plan file.
Use existing todos. Mark in_progress.`}
                  language="text"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  2. Verify-Then-Fix
                </h4>
                <p className="text-foreground/80 mb-3">
                  Prevents blind fixes. The agent first confirms issues exist at the exact line, reports findings, then fixes only what was verified.
                </p>
                <CodeBlock
                  code={`Verify these issues exist (file:line).
For each: confirmed|not-found|different root cause.
Then fix only confirmed.`}
                  language="text"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  3. MCP-Driven Operations
                </h4>
                <p className="text-foreground/80 mb-3">
                  For infrastructure tasks via Model Context Protocol. The agent executes numbered steps using MCP tools, reports outcomes, flags failures.
                </p>
                <CodeBlock
                  code={`Using [Supabase|Vercel|Linear] MCP: [numbered steps].
Report back: what done, what failed, what to verify.`}
                  language="text"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  4. Audit + Cross-Correlate
                </h4>
                <p className="text-foreground/80 mb-3">
                  For compliance, security, and technical debt. Audit findings are mapped to code locations, prioritized, and presented as a remediation roadmap.
                </p>
                <CodeBlock
                  code={`Audit [URL/codebase].
Cross-correlate with repo: file:line for each issue.
Prioritize P0/P1/P2.
Produce remediation plan with phases.`}
                  language="text"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Anti-Patterns to Avoid
            </h3>
            <TableBlock
              headers={["Anti-Pattern", "Problem", "Better Approach"]}
              rows={[
                [
                  "Vague fix request",
                  '"can you fix this?"',
                  'Use Verify-Then-Fix with explicit file:line references',
                ],
                [
                  "Credentials in prompt",
                  "API keys leak into logs and chat history",
                  "Inject secrets at runtime via environment or secure stores",
                ],
                [
                  "No verification gate",
                  "Agent deploys changes without confirmation",
                  'Require human review of plan before "Then implement" phase',
                ],
                [
                  "Missing scope",
                  "Agent modifies unrelated systems or over-fixes",
                  "Explicitly state: files in scope, systems out of scope, rollback conditions",
                ],
              ]}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Evaluation Metrics
            </h3>
            <TableBlock
              headers={["Metric", "Target", "How to Measure"]}
              rows={[
                [
                  "Plan adherence %",
                  ">90%",
                  "Does agent follow the approved plan without deviation?",
                ],
                [
                  "Verification accuracy %",
                  ">95%",
                  "Do agent issue reports match actual code state?",
                ],
                [
                  "Repo correlation %",
                  ">98%",
                  "Are all findings accurately mapped to file:line?",
                ],
                [
                  "MCP success rate %",
                  ">85%",
                  "What % of MCP operations complete without retry?",
                ],
                [
                  "Protocol compatibility %",
                  "100%",
                  "Does output conform to your verification pipeline?",
                ],
              ]}
            />
          </div>

          <Callout type="tip" title="Production Discipline">
            Each prompt template is a contract. When you define "Do NOT edit the plan file," the agent learns this boundary applies to all future tasks. Consistency in phrasing and structure across your organization compounds into dramatically higher success rates.
          </Callout>

          <div className="mt-8">
            <CaseStudyToggle
              generic={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Template: Plan-First Execution
                    </h4>
                    <p className="text-foreground/80">
                      The four canonical templates shown above represent distilled best practices from thousands of agent deployments. They work because they separate planning from execution, inject explicit verification gates, and treat prompts as versioned specifications rather than conversational requests.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Template: Verify-Then-Fix
                    </h4>
                    <p className="text-foreground/80">
                      This pattern prevents the most common failure mode: confident fixes to non-existent problems. By forcing the agent to report its findings before remediation, you gain auditability and can catch misdiagnoses early.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Template: MCP-Driven Operations
                    </h4>
                    <p className="text-foreground/80">
                      When your agent has tool access (Supabase MCP, Vercel MCP, Linear MCP), this template ensures structured communication and explicit success/failure reporting for each step.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Template: Audit + Cross-Correlate
                    </h4>
                    <p className="text-foreground/80">
                      For security reviews and compliance work, this template anchors abstract findings to concrete code locations and creates a prioritized roadmap. P0 issues block deployment; P2 issues guide refactoring.
                    </p>
                  </div>
                </div>
              }
              personal={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Legacy Muse: Plan-First Execution (8 uses)
                    </h4>
                    <p className="text-foreground/80 mb-3">
                      Prompt used across migration, feature rollout, and refactor campaigns:
                    </p>
                    <CodeBlock
                      code={`"Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself. To-do's have already been created. Don't stop until complete."`}
                      language="text"
                      filename="legacy-muse-prompt.txt"
                    />
                    <p className="text-foreground/80 mt-3">
                      This simple constraintâ"Do NOT edit the plan file"âprevented agents from second-guessing human judgment and kept execution linear. Paired with Linear-based todos, it created an auditability trail: plan â todo state â agent log â deployed changes.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Legacy Muse: Verify-Then-Fix (6 uses)
                    </h4>
                    <p className="text-foreground/80 mb-3">
                      Used for bug triage and root cause analysis:
                    </p>
                    <CodeBlock
                      code={`"Verify these issues exist and fix them"

Bug list included:
- story stream curate-day usage type filtering broken (engines.node)
- chat protocol credentials leaking to client logs
- shared cors.ts changes not redeployed to edge functions`}
                      language="text"
                      filename="legacy-muse-verify-fix.txt"
                    />
                    <p className="text-foreground/80 mt-3">
                      The agent verified each issue independently, reported which were confirmed vs. false reports, then fixed only the confirmed ones. This reduced "phantom fix" cycles where the agent changed code for imagined problems.
                    </p>
                  </div>
                </div>
              }
            />
          </div>

          <Callout type="info" title="Why Structure Matters">
            A Claude model is inherently capable of planning and fixing. But without structured prompts, it optimizes for conversational fluency and hedging ("this might work..."). Structured prompts force it to be explicit, testable, and auditableâturning capability into reliability.
          </Callout>
        </div>
      </section>
    </main>
  );
}
