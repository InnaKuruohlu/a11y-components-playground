import { useState, type ReactNode } from "react";

type DisclosureProps = {
  summary: string;
  children: ReactNode;
};

export function Disclosure({ summary, children }: DisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `disclosure-content-${summary.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div>
      <button
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {summary}
      </button>
      <div id={contentId} hidden={!isExpanded}>
        {children}
      </div>
    </div>
  );
}