'use client';

import CaseStudyToggle from "@/components/CaseStudyToggle";
import TableBlock from "@/components/TableBlock";
import CodeBlock from "@/components/CodeBlock";
import Callout from "@/components/Callout";

export default function Chapter08() {
  return (
    <section id="anti-hallucination" className="py-16 border-b border-border">
      <h2 className="text-4xl font-bold mb-8">08 â The Anti-Hallucination Framework</h2>

      <div className="space-y-8 text-lg leading-relaxed">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Why Agents Hallucinate</h3>
          <p className="mb-4">
            Hallucination is not a bugâit's the default behavior of language models. LLMs are prediction engines. They generate the most statistically likely next token based on patterns in training data. They don't have a "ground truth" database. They can't check "does this package exist?" They can't verify "is this method real?" They just predict what looks plausible.
          </p>
          <p className="mb-4">
            So when you ask an agent to import a package, it confidently generates <code>import {'{'}toTurtle{'}'} from "markdown-to-turtle"</code> even though that package doesn&apos;t exist. When you ask it to call a method, it invents <code>db.executeUnsafeQuery()</code> that doesn&apos;t exist in your SDK. When you ask it to use an environment variable, it references <code>process.env.SUPER_SECRET_STRIPE_KEY</code> that you never set.
          </p>
          <p>
            The agent doesn't know it's wrong. It generated statistically plausible code. The code passes the language model's internal consistency check (the syntax is valid Python/JavaScript/Go). It fails your actual consistency check (does it compile? does it import real things?).
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Hallucination Categories</h3>
          <p className="mb-6">
            Not all hallucinations are equal. Some are caught immediately by the compiler. Some make it to production.
          </p>

          <TableBlock
            headers={["Type", "Example", "Caught Where?", "Damage"]}
            rows={[
              [
                "Import hallucination",
                'import { nonexistent } from "package"',
                "Build/CI (missing import)",
                "Low (caught before merge)"
              ],
              [
                "Method hallucination",
                "await db.imaginaryMethod()",
                "Runtime + tests (method doesn't exist)",
                "Medium (caught if tested, else production bug)"
              ],
              [
                "Environment variable hallucination",
                "process.env.INVENTED_KEY",
                "Runtime (undefined, usually falsy)",
                "High (causes silent failures or weird behavior)"
              ],
              [
                "Type hallucination",
                "function expects string, agent passes array",
                "Runtime + tests (if types checked)",
                "Medium (type checker catches it, or tests fail)"
              ],
              [
                "API contract hallucination",
                "POST /users expects JSON, agent sends form-data",
                "Integration tests (if exists)",
                "High (breaks at runtime in unfamiliar ways)"
              ],
              [
                "Security hallucination",
                "Assumes RLS is enforced but doesn't verify",
                "Security review (if thorough)",
                "Critical (data leak, compliance violation)"
              ]
            ]}
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Verification Contract: Every Response Must Have This</h3>
          <p className="mb-6">
            You can't trust an agent's response by default. Every agent output must come with a verification contractâa structured document proving the agent checked its own work.
          </p>

          <div className="bg-card rounded-lg p-6 border border-border mb-6 space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. Assumptions Made (Listed & Verified)</h4>
              <p className="text-sm">
                What did the agent assume about the codebase? Write it down. Then verify each assumption.
              </p>
              <CodeBlock
                code={`Assumptions:
â Database package is "@supabase/js" at version ^2.0.0 (checked package.json)
â Auth uses Supabase auth (checked .env.example has SUPABASE_URL, ANON_KEY)
â User ID is available in useAuthStore (checked store file exists)
â Database has "users" table (checked migration files)
? Environment variable SMTP_KEY exists (NOT CHECKED - needs verification)`}
                language="plaintext"
              />
            </div>

            <div>
              <h4 className="font-semibold mb-2">2. Files to Change (Verify Each Exists)</h4>
              <p className="text-sm">
                List every file the agent touched. Verify each file path is real.
              </p>
              <CodeBlock
                code={`Files to change:
â src/components/LoginForm.tsx (exists)
â src/utils/auth.ts (exists)
â src/types/index.ts (exists)
â src/middleware/rateLimit.ts (NOT FOUND - agent referenced non-existent file)
? src/lib/stripe.ts (needs verification - is this the right location?)`}
                language="plaintext"
              />
            </div>

            <div>
              <h4 className="font-semibold mb-2">3. Commands to Run (Verify Each Is Valid)</h4>
              <p className="text-sm">
                Every shell command the agent suggests should be verified to exist and work.
              </p>
              <CodeBlock
                code={`Commands:
â npm install @stripe/react-stripe-js (valid npm package)
â npm run type-check (configured in package.json)
â npm test -- --watch (Jest is installed)
â knex migrate:latest (knex not in package.json, should use prisma instead)
? DATABASE_URL=file:dev.db npm test (needs verification - is this correct for this project?)`}
                language="plaintext"
              />
            </div>

            <div>
              <h4 className="font-semibold mb-2">4. Acceptance Criteria (Testable, Tests Passing)</h4>
              <p className="text-sm">
                Every feature should have tests. The agent should run them and report: passing or failing.
              </p>
              <CodeBlock
                code={`Acceptance criteria:
[ ] User can sign in with email/password â Test exists: src/components/__tests__/LoginForm.test.tsx
    Status: â PASSING (2 tests pass, 0 fail)
[ ] Signed-in user sees their name in header â Test exists: src/components/__tests__/Header.test.tsx
    Status: â PASSING (3 tests pass, 0 fail)
[ ] Rate limit blocks 10+ login attempts per minute â Test exists: src/middleware/__tests__/rateLimit.test.ts
    Status: â FAILING (1/3 tests passing, "Test timeout after 5s")
[ ] Invalid credentials show error message â Test exists: src/components/__tests__/LoginForm.test.tsx
    Status: â PASSING (4 tests pass, 0 fail)`}
                language="plaintext"
              />
            </div>

            <div>
              <h4 className="font-semibold mb-2">5. Risks & Mitigations (Security, Rollback)</h4>
              <p className="text-sm">
                What could go wrong? What's the rollback plan?
              </p>
              <CodeBlock
                code={`Risks:
â¢ Rate limiting blocks legitimate users on shared networks
  Mitigation: Use IP + user ID combination, not just IP. Config allows whitelist.

â¢ Auth token leaked in logs
  Mitigation: Sanitize auth tokens before logging (done in logging middleware)

â¢ Database migration fails, service is down
  Mitigation: Rollback plan: git revert + redeploy. Downtime ~5 minutes.

â¢ No recovery if Stripe API goes down
  Mitigation: Queue subscription events locally, retry with exponential backoff`}
                language="plaintext"
              />
            </div>

            <div>
              <h4 className="font-semibold mb-2">6. Verification Results (Build, Types, Tests, Lint)</h4>
              <p className="text-sm">
                The agent actually ran these checks. Report the results.
              </p>
              <CodeBlock
                code={`Verification results:
npm run build
  â PASSED (0 errors, 0 warnings)

npm run type-check
  â PASSED (0 type errors)

npm test
  â PASSED (42 tests pass, 0 fail, 2 skipped)

npm run lint
  â PASSED (0 eslint errors, 2 warnings about unused variables - non-blocking)

Imports verified (checked package.json for all imports):
  â All imports exist and are correct versions

Environment variables checked (.env.example):
  â All referenced env vars are documented`}
                language="plaintext"
              />
            </div>
          </div>

          <Callout type="warning" title="The Verification Contract Is Mandatory">
            If an agent can't produce this contract (because it didn't actually run tests, because it hallucinated files, because it didn't verify assumptions), reject the response. Make the agent do the work. This is where you teach agents to be rigorous.
          </Callout>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">"Did It Actually Work?" Checklist</h3>
          <p className="mb-6">
            This is the human's checklist. After the agent says it's done, you verify:
          </p>

          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-2">Does it build?</h4>
              <p className="text-sm">
                Run the actual build command. If it fails, the agent didn't verify. Send it back.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-2">Does it typecheck?</h4>
              <p className="text-sm">
                Run `tsc --noEmit` or equivalent. TypeScript should pass. If there are type errors, the agent hallucinated types.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-2">Does it lint?</h4>
              <p className="text-sm">
                Run your linter. No errors (warnings are okay if documented). If eslint fails, the agent didn't verify.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-2">Do tests pass?</h4>
              <p className="text-sm">
                Run the test suite. All tests should pass. If tests fail, something is wrong with the implementation.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-2">Does it work in browser?</h4>
              <p className="text-sm">
                For frontend work: actually load the app. Click the feature. Does it do what it's supposed to? Does it break anything?
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-2">Are imports real?</h4>
              <p className="text-sm">
                Check every import statement. Does the package exist in package.json? Is the version compatible? Is the named export actually exported?
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-2">Are env vars defined?</h4>
              <p className="text-sm">
                Check .env.example. If the code references `process.env.SOMETHING`, does SOMETHING exist in .env.example? Or will it be undefined at runtime?
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Verify-Then-Fix Pattern</h3>
          <p className="mb-6">
            This is a critical pattern for working with agents. Don't let an agent fix something without first confirming the issue actually exists.
          </p>

          <CodeBlock
            code={`â WRONG: "Fix all references to old API endpoint"
   Agent: [halluccinates where the endpoint is used, "fixes" phantom issues]

â RIGHT: "Verify these issues exist in the codebase:
    - src/api/users.ts line 45: calls POST /v1/users (old API)
    - src/components/Form.tsx line 120: calls POST /v1/users (old API)
    - test/api.test.ts line 88: mocks POST /v1/users (old API)

    For each issue: confirmed | not-found | different root cause
    Then fix only confirmed issues."`}
            language="plaintext"
          />

          <p className="mt-6 mb-4">
            Why? Because agents love to "fix" things that don't exist. You say "fix the typo in variable names" and the agent renames variables that don't have typos, breaks tests, and wastes your time.
          </p>

          <p>
            Verify first. Get line numbers. Get confirmation. Then fix. This cuts false-positive fixes by 80%.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Building Anti-Hallucination Into Your Process</h3>
          <p className="mb-6">
            This isn't just individual checks. It's structural. Your entire SDLC should catch hallucinations early.
          </p>

          <TableBlock
            headers={["Stage", "What Catches Hallucinations", "How"]}
            rows={[
              [
                "Stage 1: System Design",
                "Bad assumptions about architecture",
                "Architect reviews ARCH_NOTES before coding starts"
              ],
              [
                "Stage 2: Backlog",
                "Unclear acceptance criteria (agent will guess)",
                "Acceptance criteria are precise, testable, written before implementation"
              ],
              [
                "Stage 3: Scaffold",
                "Wrong data model, missing auth, API contract mismatch",
                "Scaffold must pass tests. If tests fail, architecture was wrong."
              ],
              [
                "Stage 4: Daily iteration",
                "Agent invents methods, hallucinated imports, undefined env vars",
                "Every PR runs: build, typecheck, lint, test. CI is your hallucination detector."
              ],
              [
                "Stage 5: Hardening",
                "Security assumptions wrong, observability missing, edge cases not tested",
                "Security review, comprehensive test coverage, threat model validation"
              ]
            ]}
          />

          <p className="mt-6">
            Notice: every stage has a gate that catches hallucinations. Tests fail? That's early feedback. CI passes? You're probably good. Shipped to prod and users found a bug? You have observability to catch it.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Measuring False Positives: The Metric That Matters</h3>
          <p className="mb-6">
            You should track how often agents try to fix things that don't actually need fixing.
          </p>

          <CodeBlock
            code={`False-Positive Fix Rate = (fixes of non-existent issues) / (total fixes attempted)

Example:
Agent said: "I found 12 issues to fix"
Actually true issues: 10 (verified by human)
False positives: 2 (issues that didn't exist)

False-positive rate: 2/12 = 16.7%

Target: <5% false-positive rate
This means: of every 20 fixes, 1 is wasted effort

If rate is >10%, your verify-then-fix process isn't working. You're letting agents hallucinate.`}
            language="plaintext"
          />

          <p className="mt-6">
            Track this metric over time. As your agent gets better context, as you improve your prompts, this number should drop. If it's rising, something is broken.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">From Theory to Practice</h3>

          <CaseStudyToggle
            generic={
              <div className="space-y-4">
                <p>
                  The verification contract + CI gates + the verify-then-fix pattern are three layers of defense. They're not optional. They're how you ship with agents.
                </p>
                <p>
                  At the start, verification will feel slow. The agent suggests something, you verify it takes 10 minutes. But you catch hallucinations before they waste hours. After a few weeks, your agent learns what verification looks like, and it starts shipping tighter code.
                </p>
                <p>
                  The goal: Zero hallucinations reaching production. That means every agent response gets verified. Every assumption gets checked. Every import gets validated. Every test gets run.
                </p>
              </div>
            }
            personal={
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Legacy Muse: How We Use Verify-Then-Fix</h4>
                  <p className="mb-4">
                    We've used the verify-then-fix pattern 6 times across sessions, catching critical issues:
                  </p>
                  <TableBlock
                    headers={["Issue", "Found By", "Would Have Shipped?", "Impact if Shipped"]}
                    rows={[
                      [
                        "Story stream protocol mismatch: toDataStreamResponse vs toTextStreamResponse",
                        "Verify-then-fix (agent listed both methods, we verified which one was actually exported)",
                        "Yes - agent was hallucinating a nonexistent method",
                        "Critical: streaming would fail silently in production"
                      ],
                      [
                        "Chat protocol sync issue: request/response shape mismatch",
                        "Verify-then-fix (agent said it was synced, we checked each endpoint signature)",
                        "Yes - agent was confident but wrong",
                        "High: chat feature broken in production"
                      ],
                      [
                        "Node version mismatch: CI uses Node 20, Vercel uses Node 22",
                        "Verify-then-fix (agent assumed Node 20, we verified CI config and Vercel settings)",
                        "Yes - deployment would fail unpredictably",
                        "Critical: prod deploy would fail or use wrong Node features"
                      ],
                      [
                        "Environment variable leak: agent referenced unset STRIPE_WEBHOOK_SECRET",
                        "Verify-then-fix (agent said all env vars were defined, we checked .env.example)",
                        "Yes - production would have undefined variable",
                        "High: webhook processing fails silently"
                      ]
                    ]}
                  />
                </div>

                <div className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="font-semibold mb-4">Example: Stream Protocol Verification</h4>
                  <p className="mb-4">
                    Ticket: "Implement streaming responses for chat API"
                  </p>
                  <p className="mb-4">
                    Agent PR included code like:
                  </p>
                  <CodeBlock
                    code={`import { toDataStreamResponse } from 'ai';

export async function POST(request) {
  const stream = await generateStream();
  return toDataStreamResponse(stream);
}`}
                    language="typescript"
                  />
                  <p className="mb-4">
                    Review comment: "Is `toDataStreamResponse` a real export from 'ai'? Verify in node_modules."
                  </p>
                  <p className="mb-4">
                    Agent verification response:
                  </p>
                  <CodeBlock
                    code={`Checked 'ai' package exports:
? toDataStreamResponse - NOT FOUND in ai/index.ts
â toTextStreamResponse - FOUND in ai/index.ts
â convertToCoreMessages - FOUND in ai/index.ts

The correct method is toTextStreamResponse, not toDataStreamResponse.
Agent hallucinated the method name.

Correction: Use toTextStreamResponse`}
                    language="plaintext"
                  />
                  <p className="mt-4">
                    Result: Agent fixed the hallucination. PR merged clean. Streaming works in production.
                  </p>
                </div>

                <div className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="font-semibold mb-4">Our False-Positive Rate Over Time</h4>
                  <p className="text-sm font-mono mb-4 bg-background p-3 rounded border border-border">
                    Month 1: 28% false positives (agent was hallucinating a lot)<br/>
                    Month 2: 18% (improved with better prompts)<br/>
                    Month 3: 8% (verify-then-fix pattern working)<br/>
                    Month 4: 4% (agent learning from feedback)<br/>
                    Current: 2.1% (solid baseline)
                  </p>
                  <p>
                    The improvement came from consistent verification. Every hallucination got caught and corrected. The agent learned what verification looks like.
                  </p>
                </div>
              </div>
            }
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Final Rule: Trust But Verify</h3>
          <Callout type="danger" title="Never Ship Without Verification">
            If an agent says "I've implemented the feature and it's ready to ship," that's the trigger for verification. That's when you run:
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>npm run build â did it build?</li>
              <li>npm run type-check â did types pass?</li>
              <li>npm run lint â did linting pass?</li>
              <li>npm test â did tests pass?</li>
              <li>Load it in browser â does it actually work?</li>
              <li>Review every import â do they exist?</li>
              <li>Check every env var â are they defined?</li>
            </ul>
            You'll find hallucinations ~20% of the time. That's not a failure of the agent. That's how language models work. It's a success of your verification process for catching it before it reaches customers.
          </Callout>
        </div>
      </div>
    </section>
  );
}
