import { useState, useRef, type ReactNode } from "react";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export function Tabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: React.KeyboardEvent) {
    let newIndex = activeIndex;

    if (event.key === "ArrowRight") {
      newIndex = (activeIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      newIndex = 0;
    } else if (event.key === "End") {
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(newIndex);
    tabRefs.current[newIndex]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Example Tabs"
        onKeyDown={handleKeyDown}
        className="inline-flex gap-1 rounded-lg border border-gray-700 bg-gray-900 p-1"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={index === activeIndex}
            aria-controls={`panel-${tab.id}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:shadow-[0_0_10px_rgba(217,70,239,0.7)] ${
              index === activeIndex
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={index !== activeIndex}
          tabIndex={0}
          className="mt-4 rounded-lg border border-gray-700 bg-gray-900 p-4 text-gray-200 focus:outline-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}