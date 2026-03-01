'use client';

import CaseStudyToggle from "@/components/CaseStudyToggle";
import TableBlock from "@/components/TableBlock";
import Callout from "@/components/Callout";

export default function Chapter03() {
  return (
    <section id="supply-chain" className="py-16 border-b border-border">
      <h2 className="text-4xl font-bold mb-8">03 â Supply Chain Security Mindset</h2>

      <div className="space-y-8 text-lg leading-relaxed">
        <div>
          <h3 className="text-2xl font-semibold mb-4">The Core Principle: Treat AI Code Like Untrusted Third-Party Dependencies</h3>
          <p className="mb-4">
            Here's the mental model that matters: when an AI generates code, treat it with the same rigor you'd apply to a new npm package, a Docker base image, or a third-party API integration. It's not a trusted artifact. It's an untrusted piece of the supply chain that must be verified before it touches production.
          </p>
          <p className="mb-4">
            Why? Because AI models are probabilistic. They make mistakes. They hallucinate imports. They invent SDK methods that don't exist. They suggest architectures that work locally but fail at scale. If you trusted every output blindly, you'd end up with:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Mysterious runtime errors from imports that don't exist</li>
            <li>Security vulnerabilities from AI-suggested patterns that look safe but aren't</li>
            <li>Performance cliffs from algorithms that work on toy data but collapse on real volumes</li>
            <li>Compliance failures from missing audit trails or encryption</li>
          </ul>
          <p>
            The antidote is a defense-in-depth approach: multiple gates, each catching different classes of mistakes. None of these gates are expensive. All of them are non-negotiable.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The 2025 Reality: Uneven Security Practices</h3>
          <p className="mb-6">
            How are teams actually handling AI-generated code? The data is sobering:
          </p>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li><strong>76% check for security issues</strong> in AI-generated codeâwhich sounds good until you realize 24% don't check at all</li>
            <li><strong>Only 54% verify licensing</strong> (is this code accidentally copying from a GPL library?)</li>
            <li><strong>Only 24% do comprehensive review</strong> across security, performance, and architectural fit</li>
          </ul>
          <p>
            Most teams are doing surface-level checking. They're looking for obvious security bugs but missing subtle issuesâarchitectural decisions that scale poorly, compliance gaps, or patterns that conflict with their system design. And almost nobody is thinking about licensing, which is a ticking time bomb.
          </p>
          <p>
            The teams that move fastest are the ones with the strongest gates. They've automated the tedious checks (linting, type checking, import validation), which means code review can focus on the hard things: does this actually solve the problem? Is it consistent with our architecture? Will this scale?
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Common AI Hallucination Patterns</h3>
          <p className="mb-6">
            These are the mistakes we see repeatedly. Knowing them helps you design better gates:
          </p>
          <TableBlock
            headers={["Hallucination Type", "What Happens", "Red Flag", "How to Catch"]}
            rows={[
              ["Non-existent imports", "AI suggests `import { foo } from 'bar-lib'` but that export doesn't exist", "Code runs locally, fails in CI with 'cannot find module'", "TypeScript strict mode, type checking, linting rules"],
              ["Fake SDK methods", "AI calls `supabase.query.specialFetch()` which isn't real", "Runtime error: 'property does not exist'", "Type hints on SDK objects, runtime validation, integration tests"],
              ["Phantom endpoints", "AI assumes an API endpoint exists that you never built", "404 or unexpected responses in staging", "Contract testing, OpenAPI validation, API documentation review"],
              ["Missing environment variables", "Code assumes a `.env` var without declaring it", "Silent failures or crashes with undefined errors", "Strict env var validation, schema validation on startup"],
              ["'Works on my prompt' syndrome", "Code works with the exact test case shown but fails on variations", "Passes unit tests but fails integration tests or prod data", "Property-based testing, load testing, diverse test fixtures"],
              ["Insecure defaults", "AI suggests patterns that 'work' but are security anti-patterns", "SQL injection risk, XSS vulnerability, missing CSRF tokens", "Security linters, OWASP checklist, manual code review"]
            ]}
          />
          <p className="mt-6">
            The pattern here is important: early gates catch syntax errors (imports, types). Middle gates catch logical errors (wrong endpoints, missing env vars). Late gates catch architectural and security problems. You need all three.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Three Gate Layers: Local, Pre-Commit, CI/CD</h3>
          <p className="mb-4">
            A robust supply chain has three layers of defense. Each layer is fast and catches different classes of issues. Together, they form a system that lets you move fast while maintaining high quality.
          </p>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
            <h4 className="text-xl font-semibold mb-4">Layer 1: Local (Real-Time)</h4>
            <p className="mb-4">
              As the engineer or AI writes code, immediate feedback prevents obvious mistakes:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Type hints:</strong> TypeScript catches missing properties and wrong argument types in real-time</li>
              <li><strong>Linting with --fix:</strong> Prettier auto-formats, ESLint fixes auto-fixable issues, import sort</li>
              <li><strong>IDE inspections:</strong> Red squiggles for undefined variables, unused imports, common mistakes</li>
              <li><strong>Pre-flight checks:</strong> Does the code compile? Can you run the test suite locally?</li>
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Cost: Essentially free. Happens before you push. Catches 60-70% of issues.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
            <h4 className="text-xl font-semibold mb-4">Layer 2: Pre-Commit (Before You Push)</h4>
            <p className="mb-4">
              Before code even reaches the repository, automate the tedious checks:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Format verification:</strong> All code follows your style (prettier, eslint)</li>
              <li><strong>Type check:</strong> Full TypeScript check, no implicit any, strict mode</li>
              <li><strong>Linting errors are fatal:</strong> If lint fails, the commit is rejected</li>
              <li><strong>Secrets scanning:</strong> Tools like git-secrets or TruffleHog prevent .env files and API keys from being committed</li>
              <li><strong>Import audit:</strong> Only allowed packages can be imported. New dependencies require approval.</li>
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Cost: 10-30 seconds per commit. Catches 80% of issues. Essential.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h4 className="text-xl font-semibold mb-4">Layer 3: CI/CD (Before Merge)</h4>
            <p className="mb-4">
              When a PR is opened, run exhaustive checks in isolation before it can merge:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Full build:</strong> Does it compile for production?</li>
              <li><strong>All tests (unit + integration):</strong> Do they pass against the real database, real APIs?</li>
              <li><strong>Dependency vulnerability scan:</strong> Are there known CVEs in your deps?</li>
              <li><strong>Type check in strict mode:</strong> Including test files</li>
              <li><strong>Linting in strict mode:</strong> No warnings allowed</li>
              <li><strong>Security scan:</strong> SAST tools looking for common vulnerabilities</li>
              <li><strong>Code coverage threshold:</strong> No PR merges below X% coverage of changed lines</li>
              <li><strong>Architecture checks:</strong> Does this respect your module boundaries? Does it follow patterns?</li>
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Cost: 5-10 minutes. Catches 95%+ of issues. This is your final gate before production.
            </p>
          </div>

          <p className="mt-8">
            The key principle: <strong>if CI fails, the PR does not exist.</strong> This is non-negotiable. It teaches everyoneâhumans and AIâthat quality is the price of entry. It's tempting to merge "just this one quick fix" when CI is flaky. Don't. Fix the test, fix the code, or create a new PR.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">The Immutable Rule: CI As Your Source of Truth</h3>
          <Callout type="danger" title="If CI Fails, The PR Does Not Exist">
            No exceptions. No "we'll fix it in the next commit." No "just merge this and we'll address it later." If your CI/CD pipeline reports a failure, that pull request cannot merge until the failure is resolved. This is the single most important gate in your system.
          </Callout>
          <p className="mt-6 mb-4">
            Why so harsh? Because every exception you make trains the system (and the team) that quality is negotiable. Exceptions accumulate. Six months later, you're merging code that half your CI gates fail on "because it's urgent." At that point, your gates are theater.
          </p>
          <p>
            The teams that maintain velocity for years are the ones that never compromise on this. Fast feedback, clear requirements, fix it or don't merge. That's it.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Supply Chain In Practice: Lessons From Real Incidents</h3>
          <p className="mb-4">
            Let's ground this in actual experience:
          </p>
          <CaseStudyToggle
            generic={
              <div className="space-y-4">
                <p>
                  Here's how gate layers work in practice. Imagine your AI generates a feature branch:
                </p>
                <ol className="list-decimal list-inside space-y-3 mb-4">
                  <li><strong>Local gate:</strong> TypeScript catches that an import is wrong. The editor shows a red squiggle. Takes 2 minutes to fix.</li>
                  <li><strong>Pre-commit gate:</strong> The developer runs the pre-commit hook. Linting fails on missing error handling. Another 5 minutes to add try-catch.</li>
                  <li><strong>CI gate:</strong> The PR is opened. Tests fail because the code doesn't handle the case where an external API is slow. The test infrastructure caught something local testing missed.</li>
                  <li><strong>Code review:</strong> A human looks at the code and asks, "Why are we calling the API on every render? This will be slow." The architectural concern that no gate caught becomes visible.</li>
                </ol>
                <p>
                  Each layer caught different things. The gates weren't redundant; they were complementary. By the time code reached production, it was solid.
                </p>
              </div>
            }
            personal={
              <div className="space-y-4">
                <p>
                  <strong>Legacy Muse experience:</strong> We managed 241 branches at peak. Agent-generated PRs and human-written PRs went through the same gates. The pattern was striking:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Agent PRs:</strong> Often fixed symptoms rather than root causes. 15 commits across 4 files to patch the same issue in different places.</li>
                  <li><strong>Human PRs:</strong> Fewer commits, but they consolidated root causes. One PR to refactor the auth layer instead of 8 patches.</li>
                </ul>
                <p className="mb-4">
                  The lesson: gates are vital, but they're not sufficient. Gates catch bugs. Humans catch architecture. Our breakthrough came when we learned to use agents for the mechanical work (applying the same fix everywhere, generating boilerplate) and humans for the thinking (deciding what the fix should be).
                </p>
                <p className="mb-4">
                  Also, we learned to prefer a single canonical branch per feature over many exploratory branches. Agents are good at exploring, but branch proliferation is a tax. We'd ask the agent to explore, then have a human consolidate the learnings into one clean branch. Faster to merge, easier to review, clearer history.
                </p>
                <p>
                  Our CI/CD is now the team's teaching tool. When a PR fails, the agent sees the error and learns. When a human submits a PR with architectural issues, CI doesn't catch it (no gate for "is this consistent with our design?"), but code review does. The gates are honest about what they can catch and what they can't.
                </p>
              </div>
            }
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Building Your Gate Layers: Practical Checklist</h3>
          <p className="mb-4">
            If you're starting from scratch, here's the order to implement gates:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-base">
            <li><strong>Day 1:</strong> Set up TypeScript in strict mode. This catches half your bugs immediately.</li>
            <li><strong>Day 2:</strong> Add ESLint and Prettier. Standardize code style. Make --fix automatic.</li>
            <li><strong>Day 3:</strong> Set up pre-commit hooks (husky + lint-staged). Fail commits on lint or type errors.</li>
            <li><strong>Day 4:</strong> Wire up CI/CD (GitHub Actions, CircleCI, whatever). Run tests, lint, type check.</li>
            <li><strong>Day 5:</strong> Add dependency vulnerability scanning (Snyk, Dependabot).</li>
            <li><strong>Week 2:</strong> Add secrets scanning. Never let API keys commit.</li>
            <li><strong>Week 3:</strong> Add security SAST (like Semgrep). Catch common vulnerabilities.</li>
            <li><strong>Week 4:</strong> Code coverage threshold. 80% of changed lines must be tested.</li>
            <li><strong>Month 2:</strong> Architecture checks. Enforce your patterns (no direct database calls from client code, etc.).</li>
          </ol>
          <p className="mt-6">
            You don't implement all of these on day one. You build iteratively. But each layer matters. Together, they form a system that lets you move at startup velocity while maintaining the discipline of a mature company.
          </p>
        </div>
      </div>
    </section>
  );
}
