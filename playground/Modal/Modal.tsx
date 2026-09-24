import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Remember what had focus before the modal opened, so we can return it later.
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement;
      // Move focus into the dialog itself once it's rendered.
      dialogRef.current?.focus();
    } else {
      triggerElementRef.current?.focus();
    }
  }, [isOpen]);

  // Escape to close, and Tab/Shift+Tab focus trap.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusableSelectors =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
          focusableSelectors
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="min-w-[320px] max-w-md rounded-xl border border-gray-700 bg-gray-800 p-6 text-gray-100 shadow-[0_0_40px_rgba(168,85,247,0.25)] focus:outline-none"
      >
        <h2 id="modal-title" className="mb-3 text-lg font-semibold text-white">
          {title}
        </h2>
        <div className="text-gray-300">{children}</div>
        <button
          onClick={onClose}
          className="mt-5 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition hover:bg-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:shadow-[0_0_12px_rgba(217,70,239,0.8)]"
        >
          Close
        </button>
      </div>
    </div>
  );
}