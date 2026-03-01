import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Agentic Coding Bible | Principal Engineer's Playbook",
  description:
    "A battle-tested playbook for engineers who use AI agents as their senior dev team. Security-first, architecture-driven, production-realistic.",
  openGraph: {
    title: "The Agentic Coding Bible",
    description:
      "From vibe coding to Staff-level agentic engineering. The complete playbook.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Agentic Coding Bible",
    description:
      "From vibe coding to Staff-level agentic engineering. The complete playbook.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
