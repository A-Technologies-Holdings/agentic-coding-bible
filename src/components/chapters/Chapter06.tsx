'use client';

import CaseStudyToggle from "@/components/CaseStudyToggle";
import TableBlock from "@/components/TableBlock";
import CodeBlock from "@/components/CodeBlock";
import Callout from "@/components/Callout";

export default function Chapter06() {
  return (
    <section id="sdlc" className="py-16 border-b border-border">
      <h2 className="text-4xl font-bold mb-8">06 â The Agentic SDLC</h2>

      <div className="space-y-8 text-lg leading-relaxed">
        <div>
          <h3 className="text-2xl font-semibold mb-4">No Skipping Stages: The Non-Negotiable Pipeline</h3>
          <p className="mb-4">
            Every task follows the same pipeline. No shortcuts. No "let's just skip system design and start coding." No "we'll document later." No "ship first, security review after launch." Each stage exists because teams have learned it the hard way.
          </p>
          <p className="mb-4">
            The pipeline is: <strong>Plan â Implement â Test â Validate â PR â Observability Check</strong>
          </p>
          <p>
            When you skip a stage, you don't save time. You mortgage the future. You save 30 minutes on system design and spend 30 hours debugging a poorly-scoped feature. You skip security review and get breached. You skip observability setup and can't figure out why your API is slow in production. Agents are extremely good at following a structured pipeline. Humans are bad at it because we get impatient. Working with agents forces you to be disciplined.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Branch Strategy: Clear Ownership, No Merge Anarchy</h3>
          <p className="mb-6">
            Your branching model should be strict. It's not styleâit's safety.
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-mono text-sm font-semibold mb-3">main</h4>
              <p className="text-base">
                Production. Never merge anything that doesn't pass all checks. If main breaks, you have an incident. Protect it.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-mono text-sm font-semibold mb-3">dev</h4>
              <p className="text-base">
                UAT (User Acceptance Testing). Staging environment runs against this branch. Real database (with anonymized data), real external services in test mode, real deployment infrastructure.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-mono text-sm font-semibold mb-3">feature/*, bugfix/*, chore/*</h4>
              <p className="text-base">
                Agent branches. One Linear ticket = one branch. Agents never push directly to main or dev. Every change goes through PR review, CI gates, and human approval.
              </p>
            </div>
          </div>

          <Callout type="warning" title="Agents and Direct Commits">
            Agents should never have direct push access to main. Not because agents are evilâbecause it breaks your audit trail, bypasses code review, and makes rollback harder. Always require a PR.
          </Callout>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Six Stages of Agentic Development</h3>

          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-xl font-semibold mb-3">Stage 0: Ideation (1â3 hours)</h4>
              <p className="mb-4">
                Before you write a single line of code, you think. Hard. This is where the product brain and engineering brain align.
              </p>
              <p className="mb-4">
                Output: A 10-bullet-max problem statement that answers:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>What's the problem?</strong> (one sentence, customer-facing)</li>
                <li><strong>Who has this problem?</strong> (ICP: Ideal Customer Profileâone sentence)</li>
                <li><strong>What's the MVP scope?</strong> (list the absolute minimum to validate the idea)</li>
                <li><strong>What's NOT in scope?</strong> (what are we explicitly not doing?)</li>
                <li><strong>How do we measure success?</strong> (one metric: adoption, retention, revenue, speed)</li>
                <li><strong>Ship plan: 7 days?</strong> (if not, why not? what's the blocker?)</li>
              </ul>
              <p>
                This document is the source of truth. When your agent or team member gets confused, they read this.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-xl font-semibold mb-3">Stage 1: System Design (2â6 hours)</h4>
              <p className="mb-4">
                You design the system. This is where architects and senior engineers live.
              </p>
              <p className="mb-4">
                Output: <strong>ARCH_NOTES.md</strong>âa structured document that covers:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Data model:</strong> Entity-relationship diagram (Mermaid or text ASCII) + field-level documentation</li>
                <li><strong>API contracts:</strong> Request/response schemas for each endpoint</li>
                <li><strong>Auth model:</strong> How do users sign in? Where are sessions/tokens stored? How are permissions enforced?</li>
                <li><strong>Error handling:</strong> What errors can occur? How are they communicated to clients?</li>
                <li><strong>Threat model:</strong> What attacks are we protecting against? How?</li>
                <li><strong>Deployment architecture:</strong> Where does this run? How does it scale? What can break?</li>
              </ul>
              <p>
                This is not a long documentâit's a precise document. 2-5 pages. Every diagram is meaningful. Every decision is explained.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-xl font-semibold mb-3">Stage 2: Backlog (1 hour)</h4>
              <p className="mb-4">
                You break the system design into tickets. Each ticket is a single, testable piece of work.
              </p>
              <p className="mb-4">
                Rules for tickets:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>One Linear epic = one system component (auth, database layer, API, frontend)</li>
                <li>Each ticket takes 1â4 hours to implement and test</li>
                <li>Every ticket has written acceptance criteria ("This PR passes when...")</li>
                <li>Tickets are ordered: depended-on tickets come first</li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-xl font-semibold mb-3">Stage 3: MVP Scaffold (2â12 hours)</h4>
              <p className="mb-4">
                You build the skeleton. Database schema created. Auth wired. First API endpoint working. Frontend talking to backend. The happy path works end-to-end, even if features are incomplete.
              </p>
              <p className="mb-4">
                Why? Because you catch architectural issues early. If your auth model is broken, you find out now, not after 20 hours of feature work.
              </p>
              <p>
                Output: A runnable build. `npm run dev` (or equivalent) starts your app. You can sign up, sign in, and trigger the first happy path. Tests pass. No console errors.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-xl font-semibold mb-3">Stage 4: Iteration Loop (Daily)</h4>
              <p className="mb-4">
                This is the rhythm: Plan ticket â Implement (agent) â Test (agent) â Review (human) â Deploy (preview) â Verify (manual) â Merge.
              </p>
              <p className="mb-4">
                <strong>Plan ticket:</strong> You and the agent (or agent pair) discuss the ticket. What does "done" look like? What edge cases exist? What should the tests check?
              </p>
              <p className="mb-4">
                <strong>Implement:</strong> Agent writes code, commits to feature branch, opens PR with description.
              </p>
              <p className="mb-4">
                <strong>Test:</strong> Agent runs tests locally, then agent (or human) writes integration tests. Does it work with real data? Does it fail gracefully?
              </p>
              <p className="mb-4">
                <strong>Review:</strong> Human reviews the PR. Not in a "be nice" wayâin a "is this production-safe?" way. Does it follow your patterns? Is there a security hole? Are there edge cases?
              </p>
              <p className="mb-4">
                <strong>Deploy:</strong> PR is deployed to preview environment (Vercel, Netlify, equivalent). This is a real live URL that runs against real infrastructure (staging DB, staging external services).
              </p>
              <p className="mb-4">
                <strong>Verify:</strong> Manual testing. You (or QA) click around. Does it work? Do the edge cases behave correctly?
              </p>
              <p>
                <strong>Merge:</strong> After manual verification, merge to dev. Dev branch gets deployed to staging environment for broader testing.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-xl font-semibold mb-3">Stage 5: V1 Hardening (1â3 days)</h4>
              <p className="mb-4">
                Features are done. Now you harden. This is where Staff Engineers spend a lot of time.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Rate limiting:</strong> Can someone spam your API? Does it degrade gracefully?</li>
                <li><strong>Input validation:</strong> What if someone sends invalid data? Oversized data? Malicious data?</li>
                <li><strong>Error boundaries:</strong> If one feature breaks, does the whole app break? Or just that feature?</li>
                <li><strong>Logging &amp; metrics:</strong> Can you see what's happening? Slow queries? Failed requests? User funnels?</li>
                <li><strong>Database migrations:</strong> If you need to change schema, can you do it zero-downtime? Do you have a rollback?</li>
                <li><strong>Backup verification:</strong> Does backup/restore actually work? Have you tested it?</li>
                <li><strong>Security headers:</strong> CORS, CSP, HSTSâare these configured? Do they prevent attacks?</li>
                <li><strong>CI enforcement:</strong> Do all PRs pass tests, linting, type checking before merge? Or do you allow exceptions?</li>
              </ul>
              <p>
                This stage is where bugs become incidents. Spend the time.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Example: The Journey of One Feature</h3>
          <p className="mb-6">
            Let's walk through a real feature using the Agentic SDLC. Feature: "Users can share their post with a shareable link."
          </p>

          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-4">Stage 0: Ideation</h4>
              <CodeBlock
                code={`Problem: Users can't share posts with people who don't have an account.
ICP: Creators who want to build audience outside the platform.
MVP Scope:
- Generate unique token for each post
- Token grants read-only access (no login required)
- URL format: example.com/share/TOKEN
- Shared post shows creator name, post content, timestamp
Non-Goals: Tracking who accessed the link, analytics, expiration dates
Success Metric: >10% of posts get shared (tracked in Segment)
7-day ship plan: Day 1-2 auth token system, Day 3 endpoint, Day 4-5 UI, Day 6-7 testing & hardening`}
                language="plaintext"
              />
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-4">Stage 1: System Design</h4>
              <CodeBlock
                code={`Data Model:
  posts table: id, user_id, content, created_at
  post_shares table: id, post_id, token (unique, indexed), created_at

Auth Model:
  GET /share/:token â No auth required
  POST /posts/:id/share â User must own post
  Token is 32 random characters (url-safe base64)

API Contract:
  GET /share/:token
    Response: { post: { id, content, creator_name, created_at }, error? }
    Errors: token_not_found (404), post_deleted (410)

  POST /posts/:id/share
    Response: { share_url: "https://example.com/share/ABC123..." }

Threat Model:
  - Token brute-force: Mitigated by 32-char space + rate limiting on GET /share
  - Shared post of private content: Mitigated by checking post.is_public before sharing
  - Creator deletion: If post is deleted, share token 410s`}
                language="plaintext"
              />
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-4">Stage 2: Backlog</h4>
              <TableBlock
                headers={["Ticket", "Acceptance Criteria", "Est. Hours"]}
                rows={[
                  [
                    "AUTH-1: Create post_shares table + migration",
                    "Migration runs forward and backward. Table has unique index on token. No data loss.",
                    "1"
                  ],
                  [
                    "AUTH-2: Implement POST /posts/:id/share endpoint",
                    "Generates token, inserts row, returns share_url. Auth check passes. Token is 32 chars. Rate limit 10/min per user.",
                    "2"
                  ],
                  [
                    "AUTH-3: Implement GET /share/:token endpoint",
                    "Returns post data. 404 if not found. 410 if post deleted. No auth required.",
                    "2"
                  ],
                  [
                    "FRONTEND-1: Share button on post detail",
                    "Button copies share URL to clipboard. Shows success toast. Button disabled if user doesn't own post.",
                    "1"
                  ],
                  [
                    "FRONTEND-2: Shared post view (public page)",
                    "Shows post content, creator name, timestamp. No comments, no interactions. Shows signup CTA.",
                    "2"
                  ]
                ]}
              />
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-4">Stage 3: MVP Scaffold</h4>
              <p className="mb-4">
                Build the database, auth token generation, and first happy path:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>post_shares table created and deployed to staging</li>
                <li>POST /posts/:id/share endpoint works, returns token</li>
                <li>GET /share/:token endpoint works, returns post data</li>
                <li>Frontend can call both endpoints without errors</li>
                <li>Tests pass for happy path: "User creates share token, guest can view post"</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-4">Stage 4: Iteration</h4>
              <p className="mb-4">
                Day 1: AUTH-1 ticket â code â PR â review â deploy to preview â manual test â merge
              </p>
              <p className="mb-4">
                Day 2: AUTH-2 and AUTH-3 â same flow
              </p>
              <p className="mb-4">
                Day 3-4: Frontend tickets â same flow
              </p>
              <p>
                Each day follows: Plan â Code â Test â Review â Preview â Verify â Merge.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h4 className="font-semibold mb-4">Stage 5: V1 Hardening</h4>
              <p className="mb-4">
                Before shipping to production:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Rate limiting on POST /share and GET /share</li>
                <li>Input validation: is token format valid?</li>
                <li>Logging: when is a share link created? When is it accessed?</li>
                <li>Error boundaries: if database is slow, does the page still load?</li>
                <li>Integration tests: share â delete post â verify 410</li>
                <li>Segment event: track "post_shared" event for success metric</li>
                <li>Security review: Can creator control who sees shared posts? Can guest escalate to authenticated user?</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">From Theory to Practice</h3>

          <CaseStudyToggle
            generic={
              <div className="space-y-4">
                <p>
                  The six-stage SDLC is a framework. Every product applies it slightly differently based on team size, risk profile, and shipping speed.
                </p>
                <p>
                  A startup building an MVP might compress stages 0-1 into 4 hours. A team building financial software might expand stage 5 to a week.
                </p>
                <p>
                  But the structure stays the same:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>You think before you code (stage 0-1)</li>
                  <li>You scaffold the skeleton (stage 3)</li>
                  <li>You iterate daily (stage 4)</li>
                  <li>You harden before shipping (stage 5)</li>
                </ul>
                <p>
                  This is how agents and humans move at Staff level pace without creating technical debt or security incidents.
                </p>
              </div>
            }
            personal={
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Legacy Muse SDLC</h4>
                  <p className="mb-4">
                    We use the six-stage framework with specific tooling and rituals:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Linear is source of truth.</strong> Every stage produces a Linear artifact (problem statement, ARCH_NOTES.md in a doc link, tickets with acceptance criteria)</li>
                    <li><strong>Every ticket has acceptance criteria.</strong> Non-negotiable. "Test passes when..." not "when it looks right"</li>
                    <li><strong>Agent-generated PRs are triaged into single remediation PR per area.</strong> If auth, voice, and theme each have 3 PRs, we squash them into one "Auth hardening" PR, one "Voice fixes" PR, one "Theme polish" PR. This keeps history clean.</li>
                    <li><strong>Post-merge checklist task.</strong> Every time we merge from plan mode to main, a new Linear task is auto-created: "Post-merge observability checkâverify Sentry, metrics, error rates in production"</li>
                  </ul>
                </div>

                <div className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="font-semibold mb-4">Real Example: Voice Model Swap Feature</h4>
                  <p className="mb-4">
                    Feature: "Users can swap between two text-to-speech voice models"
                  </p>
                  <p className="mb-4">
                    Stage 0 (2 hours): Problem statement + 7-day plan
                  </p>
                  <p className="mb-4">
                    Stage 1 (4 hours): ARCH_NOTESâdata model (users.voice_model_id), API contract (PATCH /users/voice-model), threat model
                  </p>
                  <p className="mb-4">
                    Stage 2 (1 hour): 5 Linear tickets (migration, API endpoint, voice-model selector UI, test suite, logging)
                  </p>
                  <p className="mb-4">
                    Stage 3 (4 hours): Scaffoldâmigration created, API wired, UI component stubbed, tests passing for happy path
                  </p>
                  <p className="mb-4">
                    Stage 4 (2 days): Daily iterationâeach ticket followed the plan â implement â test â review â preview â verify â merge cycle
                  </p>
                  <p className="mb-4">
                    Stage 5 (1 day): Hardeningârate limit voice-model changes, migrate existing users to default voice, add Segment event tracking, verify old voice-model queries still work, security audit (can users manipulate other users' voices?)
                  </p>
                  <p>
                    Result: Shipped to production in 7 days, zero incidents, zero post-launch security issues, observability in place from day 1
                  </p>
                </div>
              </div>
            }
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Why This Works With Agents</h3>
          <p className="mb-4">
            This pipeline is not overheadâit's actually the fastest way to ship with agents. Here's why:
          </p>

          <ul className="list-disc list-inside space-y-3">
            <li><strong>System design upfront:</strong> Agents are terrible at ambiguity. If you tell an agent "build a sharing system" without a design, it will hallucinate. If you hand it ARCH_NOTES.md, it implements exactly what you want.</li>
            <li><strong>Small testable tickets:</strong> Agents excel at small, scoped work. "Implement the share endpoint according to this spec with these tests" is perfect. "Build the whole feature" is a disaster.</li>
            <li><strong>Runnable scaffold:</strong> Catching architectural issues early (auth model wrong, database schema won't scale, API contract mismatched) saves weeks. Testing the skeleton saves days.</li>
            <li><strong>Daily review loop:</strong> Humans catch hallucinations early. You're reviewing daily, not at the end. A mistake in day 1 is fixed day 1, not discovered in week 2.</li>
            <li><strong>Hardening stage is human-led:</strong> Security, compliance, observability, rate limitingâthese are architectural decisions. Agents implement. Humans decide.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Anti-Pattern: The Agile-But-Unstructured Team</h3>
          <Callout type="danger" title="What NOT to Do">
            Teams often try to use agents in a "move fast, break things" agile approach. No system design, just start coding, iterate. This catastrophically fails with agents because:
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Agents can't disambiguate. They guess, then implement confidently wrong things.</li>
              <li>Rework is expensive. You end up rewriting the whole feature because the data model was wrong.</li>
              <li>Security holes compound. With humans, you catch mistakes in code review. With agents, you catch them in production.</li>
              <li>Observability is an afterthought. You ship to prod and have no idea if it's working.</li>
            </ul>
            Discipline is speed with agents. Structure is the opposite of slow.
          </Callout>
        </div>
      </div>
    </section>
  );
}
