#Comparing hand-built components to shadcn/ui (Base UI)

After building Modal, Tabs, and Disclosure by hand against the W3C ARIA
Authoring Practices, I installed shadcn/ui (Base UI preset) and added its
`dialog` and `tabs` components to compare against my own implementation.

## Modal vs. shadcn/ui Dialog

**1. No portal rendering.**
Base UI wraps the dialog content in `<DialogPortal>`, which renders it into
a separate DOM node (effectively at the end of `<body>`), detached from
wherever `<Dialog>` is called in the component tree. My `Modal.tsx` renders
inline, wherever it's placed in JSX. This matters in practice: if the modal
is opened from inside a container with `overflow: hidden` or its own
stacking context, my version can get visually clipped or trapped behind
other elements. shadcn's version can't, because it always escapes to the
document root.

**2. No `aria-describedby`.**
Base UI has a separate `DialogDescription` component that automatically
links to the dialog root and sets `aria-describedby`. My Modal only sets
`aria-labelledby` (for the title) — there's no way to attach an additional
description that screen readers announce alongside the title. For a
confirmation dialog like "Delete this item?", this is the difference between
announcing just "Delete this item" and announcing "Delete this item — this
action cannot be undone."

**3. No scroll lock on the background.**
Base UI's dialog locks page scroll while open. My Modal traps keyboard focus
correctly, but the page behind it can still be scrolled with a mouse wheel
or touchpad while the modal is open. A fully modal experience should make
the background completely inert, not just keyboard-inert.

## Tabs vs. shadcn/ui Tabs

**4. No vertical orientation support.**
Base UI's Tabs explicitly supports `orientation="horizontal"` and
`"vertical"` via `data-orientation`. Per the W3C ARIA Tabs Pattern, vertical
tabs should use `ArrowUp`/`ArrowDown` for navigation instead of
`ArrowLeft`/`ArrowRight`. My `Tabs.tsx` hardcodes horizontal arrow-key
behavior only — adding vertical tabs later would mean rewriting the keyboard
handler, not just changing CSS.

**5. No disabled-tab support.**
Base UI's `TabsTrigger` has built-in `disabled:pointer-events-none` styling
and `aria-disabled` handling. My Tabs component has no way to mark an
individual tab as unavailable (e.g. "content not ready yet") — every tab is
always focusable and selectable.

## What I got right

The core ARIA mechanics I implemented by hand — `role="dialog"` +
`aria-modal`, focus trap with Tab/Shift+Tab cycling, focus return to the
trigger element on close, roving tabindex on Tabs with `ArrowLeft`/
`ArrowRight`/`Home`/`End`, and `aria-expanded` on the Disclosure button —
all matched the W3C patterns and worked correctly under keyboard-only
testing. The gaps above are mostly about robustness and edge cases
(portals, scroll locking, orientation, disabled state) rather than missing
the core accessibility contract.

## Lesson

Writing these by hand made it clear how much of what a library like shadcn
provides isn't the ARIA roles themselves — those are well documented and
not hard to get right — but the surrounding plumbing (portals, scroll
locking, flexible orientation, disabled states) that only shows up once you
use a component in more situations than a single demo page.