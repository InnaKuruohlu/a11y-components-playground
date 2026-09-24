import { useState, type ReactNode } from "react";

type DisclosureProps = {
  summary: string;
  children: ReactNode;
};

export function Disclosure({ summary, children }: DisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `disclosure-content-${summary.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-900">
      <button
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-gray-100 transition hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:shadow-[0_0_10px_rgba(217,70,239,0.7)] rounded-lg"
      >
        {summary}
        <span className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}>▾</span>
      </button>
      <div id={contentId} hidden={!isExpanded} className="border-t border-gray-700 px-4 py-3 text-gray-300">
        {children}
      </div>
    </div>
  );
}