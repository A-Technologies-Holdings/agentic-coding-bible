"use client";
import { useState } from "react";

export default function CodeBlock({
  code,
  language = "typescript",
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-white/[0.06]">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#181825] text-[#a6adc8] text-xs font-mono border-b border-white/[0.06]">
          <span>{filename}</span>
          <span className="text-[#585b70]">{language}</span>
        </div>
      )}
      <button
        onClick={copy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 text-[#a6adc8] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
        aria-label="Copy code"
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a6e3a1" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        )}
      </button>
      <pre className="!m-0 !rounded-none !border-0">
        <code>{code}</code>
      </pre>
    </div>
  );
}
