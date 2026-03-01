"use client";

import CaseStudyToggle from "@/components/CaseStudyToggle";
import TableBlock from "@/components/TableBlock";
import CodeBlock from "@/components/CodeBlock";
import Callout from "@/components/Callout";

export default function Chapter10() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section id="ui-standards" className="py-16 border-b border-border">
        <h2 className="text-4xl font-bold mb-8 text-foreground">
          10 â UI Standardization
        </h2>

        <div className="prose prose-invert max-w-none space-y-8">
          <p className="text-lg text-foreground/90 leading-relaxed">
            There is a plague of aesthetic uniformity in startups. Open any SaaS product built by Claude in 2024â2025, and you'll see the same modal dialogs, the same button hierarchy, the same shadcn/ui checkbox floating in a familiar gray container. This happens because AI models default to whatever UI patterns they've encountered most in training data. Without explicit design constraints, every application converges to the same statistical mode: the neutral, safe, forgettable dashboard.
          </p>

          <p className="text-lg text-foreground/90 leading-relaxed">
            UI standardization is not about imposing taste. It's about preventing drift. When an agent has the freedom to import any component library, choose any color scheme, and define custom component APIs, you end up with technical debt in your UI layer. Dependencies proliferate. Onboarding new engineers takes longer. Design tokens scatter across files. Worse: users notice inconsistency, which erodes perceived quality even if the functionality is sound.
          </p>

          <p className="text-lg text-foreground/90 leading-relaxed">
            The solution is not to hire a designer and pray. It's to lock in a single, versioned UI pack per application, define non-negotiable design tokens, and use automation to enforce these constraints.
          </p>

          <div className="bg-accent/5 border-l-4 border-accent p-6 rounded">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Six Approved UI Packs
            </h3>
            <div className="space-y-6">
              <div className="border border-border rounded p-4">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  SaaS Web Applications
                </h4>
                <div className="space-y-3 text-foreground/80">
                  <p>
                    <span className="font-semibold text-foreground">
                      Tailwind Plus Catalyst:
                    </span>{" "}
                    Premium option for applications demanding custom brand identity. Includes pre-built components (forms, tables, modals), dark mode, and Figma design system. ~$299 one-time.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      shadcn/ui:
                    </span>{" "}
                    Fast MVP path. Copy-paste component library with Tailwind + Radix primitives. Free, open-source, minimal design opinions. Fastest path to a working interface.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      Next.js SaaS Starter:
                    </span>{" "}
                    Skeleton with auth, database schema, stripe integration. Best when you need rapid skeleton + immediate monetization setup.
                  </p>
                </div>
              </div>

              <div className="border border-border rounded p-4">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Mobile Applications
                </h4>
                <div className="space-y-3 text-foreground/80">
                  <p>
                    <span className="font-semibold text-foreground">
                      Ignite (React Native):
                    </span>{" "}
                    Production-grade React Native stack with TypeScript, Ignite CLI, pre-built components, and proven scaling patterns. Use this when mobile is your primary platform.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      Expo Router with Tab Navigation:
                    </span>{" "}
                    Fast MVP for mobile. File-based routing, built-in bottom tab support, OTA updates via EAS. Best for learning or rapid validation.
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      Tamagui:
                    </span>{" "}
                    Web + mobile component parity. Write once, ship to iOS, Android, and web with consistent styling and animation. Solves the "rewrite for mobile" problem.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Non-Negotiable Rules
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-accent/50 bg-accent/5 p-4 rounded">
                <p className="font-semibold text-foreground mb-2">
                  1. Pick ONE pack per app
                </p>
                <p className="text-foreground/80">
                  If you start with shadcn/ui, you do not later introduce Headless UI, Material-UI, or Chakra. Switching costs far outweigh any individual component benefit.
                </p>
              </div>

              <div className="border-l-4 border-accent/50 bg-accent/5 p-4 rounded">
                <p className="font-semibold text-foreground mb-2">
                  2. Lock design tokens
                </p>
                <p className="text-foreground/80">
                  Define your color palette, typography scale, and spacing system in version control. Every component reads from these tokens. Prevent arbitrary inline styles.
                </p>
              </div>

              <div className="border-l-4 border-accent/50 bg-accent/5 p-4 rounded">
                <p className="font-semibold text-foreground mb-2">
                  3. No random UI libraries
                </p>
                <p className="text-foreground/80">
                  If a component isn't in your chosen pack, build it from primitives or wait for approval. Every new dependency introduces version conflicts and hidden upgrades.
                </p>
              </div>

              <div className="border-l-4 border-accent/50 bg-accent/5 p-4 rounded">
                <p className="font-semibold text-foreground mb-2">
                  4. Approval required for new dependencies
                </p>
                <p className="text-foreground/80">
                  UI library additions go through team review. Ask: Does our pack already support this? Can we build it ourselves? What's the maintenance burden?
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Design Tokens to Define Per Product
            </h3>
            <TableBlock
              headers={["Token Category", "Examples", "Why It Matters"]}
              rows={[
                [
                  "Primary color",
                  "#3B82F6 (blue), #8B7355 (bronze)",
                  "Defines the identity of your entire product. Used in buttons, links, highlights.",
                ],
                [
                  "Accent color",
                  "#EC4899 (pink), #F59E0B (amber)",
                  "Draws attention to secondary actions and interactive elements.",
                ],
                [
                  "Typography scale",
                  "12/14/16/18/24/32/48 (px) or 0.75/0.875/1/1.125/1.5/2/3 (rem)",
                  "Ensures consistent hierarchy. Prevents random font sizes scattered across code.",
                ],
                [
                 "Radius scale",
                  "/12/16/20/24 (px or rem)",
                  "Controls how rounded buttons and cards appear. Contributes to brand feel.",
                ],
                [
                  "Shadow scale",
                  "sm/md/lg/xl with consistent blur + offset",
                  "Depth perception. Prevents every element from having different shadow rules.",
                ],
                [
                  "Spacing scale",
                  "4/8/12/16/24/32/48 (px or rem)",
                  "Alignment, padding, margins. Consistent spacing = cleaner layouts.",
                ],
                [
                  "Component tone",
                  "neutral|success|warning|danger (with colors)",
                  "Semantic meaning. A danger button is always red-ish; warning is always yellow-ish.",
                ],
              ]}
            />
          </div>

          <Callout type="warning" title="The Consistency Tax">
            If you don't define tokens, every component author will define their own. You end up with 47 slightly different shades of gray, 12 different button corner radii, and 8 different padding conventions. Refactoring becomes nearly impossible. Define tokens upfront, even if they feel restrictive.
          </Callout>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Mobile-Specific Constraints
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Touch Target Sizes
                </h4>
                <p className="text-foreground/80 mb-4">
                  WCAG 2.5.5 mandates a minimum of 44Ã44px. Apple HIG prefers 48Ã48px. Design every interactive element with this in mind. Failing this costs accessibility compliance and user frustration.
                </p>
                <CodeBlock
                  code={`/* Good: 48x48px minimum for primary actions */
<button className="h-12 w-12 flex items-center justify-center">
  <Icon />
</button>

/* Avoid: Too small on mobile */
<button className="h-6 w-6">
  <Icon />
</button>`}
                  language="jsx"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Safe Area Insets
                </h4>
                <p className="text-foreground/80 mb-4">
                  iOS and modern Android devices have notches, Dynamic Island, and curved edges. Use safe-area-inset CSS variables or react-native-safe-area-context to prevent content hiding behind hardware features.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Bottom Navigation with Haptics
                </h4>
                <p className="text-foreground/80 mb-4">
                  Bottom nav is standard on mobile. When users tap a nav item, trigger haptic feedback. This tiny detailâa 10ms vibrationâincreases perceived responsiveness and polish.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Page Transitions Respecting prefers-reduced-motion
                </h4>
                <p className="text-foreground/80 mb-4">
                  Always check the user's motion preference. Some users get motion sickness from transitions. Provide instant navigation as an alternative.
                </p>
                <CodeBlock
                  code={`const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  // Animate page transition
} else {
  // Instant navigation
}`}
                  language="javascript"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CaseStudyToggle
              generic={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Framework: Six UI Packs
                    </h4>
                    <p className="text-foreground/80">
                      Three options for web, three for mobile. Each is a proven template. Choosing one upfront saves hundreds of hours of refactoring later when the agent inevitably adds incompatible components.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Framework: Design Tokens
                    </h4>
                    <p className="text-foreground/80">
                      The seven categories (color, accent, typography, radius, shadow, spacing, component tone) cover 95% of UI decisions. Lock these in a single config file. Everything else derives from them.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Framework: Mobile Constraints
                    </h4>
                    <p className="text-foreground/80">
                      Touch targets, safe area insets, haptics, and motion preferences aren't luxuries. They're baseline usability on mobile. Build them into your component library from day one.
                    </p>
                  </div>
                </div>
              }
              personal={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Legacy Muse: "Parchment & Ink Editorial" Design System
                    </h4>
                    <p className="text-foreground/80 mb-4">
                      A warm, literary aesthetic for a creator-focused platform.
                    </p>
                    <div className="bg-neutral-900 border border-border rounded p-4 space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground/60 uppercase">
                          Primary Brand Color
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div
                            className="w-12 h-12 rounded"
                            style={{ backgroundColor: "#8B7355" }}
                          />
                          <p className="text-foreground">#8B7355 (warm bronze)</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground/60 uppercase">
                          Secondary (Deep Ink)
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div
                            className="w-12 h-12 rounded"
                            style={{ backgroundColor: "#1A1410" }}
                          />
                          <p className="text-foreground">#1A1410 (near black)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Semantic Color Tokens
                    </h4>
                    <CodeBlock
                      code={`/* Light mode */
--background: #FDFBF7 (cream)
--foreground: #1A1410 (ink)
--primary: #8B7355 (bronze)
--accent: #D4AF37 (gold)

/* Dark mode */
--background: #0F0D0A
--foreground: #E8E4DE
--primary: #A89968
--accent: #E6C85A`}
                      language="css"
                      filename="design-tokens.css"
                    />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Typography Stack
                    </h4>
                    <p className="text-foreground/80 mb-3">
                           Headings in Cormorant Garamond (serif, literary), body in Inter (clean, readable).
                    </p>
                    <CodeBlock
                      code={`@font-face {
  font-family: 'Cormorant Garamond';
  font-weight: 400 700;
  src: url('/fonts/CormorantGaramond.woff2');
}

@font-face {
  font-family: 'Inter';
  font-weight: 400 500 600 700;
  src: url('/fonts/Inter.woff2');
}`}
                      language="css"
                    />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Component Gradients
                    </h4>
                    <p className="text-foreground/80 mb-3">
                      Pre-defined gradient utilities for cards, headers, and CTAs.
                    </p>
                    <CodeBlock
                      code={`/* Tailwind config */
extend: {
  backgroundImage: {
    'gradient-marble': 'linear-gradient(135deg, #E8E4DE, #D4C4B8)',
    'gradient-gold': 'linear-gradient(135deg, #D4AF37, #E6C85A)',
  }
}`}
                      language="javascript"
                    />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Mobile: Touch Targets & Safe Areas
                    </h4>
                    <p className="text-foreground/80 mb-3">
                      Enforced 44px minimum, 48px preferred. Safe area insets for BottomNav.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Animation Constraint
                    </h4>
                    <p className="text-foreground/80 mb-3">
                      "One animation owner per subtree" rule. Prevents competing animations and motion sickness. Only the card fades in; the button inside does not also spin.
                    </p>
                  </div>
                </div>
              }
            />
          </div>

          <Callout type="tip" title="Design System as Code">
            Your design tokens should be in version control, reviewed in PRs, and versioned like any other dependency. When the designer wants to shift from bronze to copper, you update one file. All components update automatically. This is the opposite of manual, scattered Figma-to-code translation.
          </Callout>
        </div>
      </section>
    </main>
  );
}
