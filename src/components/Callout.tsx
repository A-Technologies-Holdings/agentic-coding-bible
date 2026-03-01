"use client";

type CalloutType = "warning" | "info" | "danger" | "tip";

const styles: Record<CalloutType, { border: string; bg: string; icon: string }> = {
  warning: { border: "border-yellow-500/30", bg: "bg-yellow-500/5", icon: "!" },
  info: { border: "border-blue-500/30", bg: "bg-blue-500/5", icon: "i" },
  danger: { border: "border-red-500/30", bg: "bg-red-500/5", icon: "X" },
  tip: { border: "border-green-500/30", bg: "bg-green-500/5", icon: ">" },
};

export default function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}) {
  const s = styles[type];
  return (
    <div className={`my-6 p-4 rounded-lg border ${s.border} ${s.bg}`}>
      {title && (
        <div className="font-semibold text-sm mb-1">{title}</div>
      )}
      <div className="text-sm text-muted leading-relaxed">{children}</div>
    </div>
  );
}
