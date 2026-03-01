"use client";
import { useState } from "react";

export default function CaseStudyToggle({
  generic,
  personal,
}: {
  generic: React.ReactNode;
  personal: React.ReactNode;
}) {
  const [showPersonal, setShowPersonal] = useState(false);

  return (
    <div className="my-6">
      <button
        onClick={() => setShowPersonal(!showPersonal)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-accent/30 text-accent hover:bg-accent/10 transition-all mb-4"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${showPersonal ? "rotate-90" : ""}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        {showPersonal ? "Hide" : "See"} real-world example
      </button>
      <div>{generic}</div>
      {showPersonal && (
        <div className="mt-4 p-5 rounded-xl border border-accent/20 bg-accent/5">
          <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-accent uppercase tracking-wide">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            Real Example: Legacy Muse
          </div>
          {personal}
        </div>
      )}
    </div>
  );
}
