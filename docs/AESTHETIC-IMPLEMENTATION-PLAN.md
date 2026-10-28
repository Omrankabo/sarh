# Sarh aesthetic implementation

Keep the architectural notebook identity. Add clearer blue, green and orange accents on warm paper; use dark accessible text on bright tints. Preserve course content, identifiers and learner records.

## Pass 1 — hierarchy and reusable foundations

- [x] Define semantic colors, readable small labels, surfaces, focus and motion tokens.
- Dashboard visual redesign reverted at the user’s request; retain the original compact poetry / metrics / chart-and-timer / Continue layout.
- [x] Distinguish new flashcards from scheduled reviews.
- Expanded weekly summary removed with the dashboard redesign; keep the original daily report and the underlying calculation logic.
- [x] Add named subject states while retaining fixed-width cards.

## Pass 2 — learning interactions

- [x] Sliding topic selection with keyboard and RTL support.
- [x] Stable flashcard reveal and review controls; separate new/due/all queues.
- [x] Clear selected answers, success feedback and progressive disclosure motion.
- [x] Check desktop, phone, English, Arabic and reduced motion.

## Later passes

- Contextual illustrations inside long chapters and distinct artwork per topic family.
- Persist the complete header across route fallback boundaries (requires shell state refactor).
- Define and implement meaningful course mastery milestones before adding achievement feedback.
- Continue the archive solution audit independently of visual polish; never imply that unresolved problems are verified.

## Guardrails

No invented activity or accuracy. No source PDFs, learner records or credentials in the app repository. No changing review dates or historical attempts to improve a dashboard. Keep the first-visit color splash and existing timer alert settings. Preserve reduced-motion alternatives, keyboard focus, current URLs and local progress.

## Validation — 26 October 2026

28 automated checks pass, including new-vs-due queues, fresh-learner introduction, saved-section resume and removed-topic activity. Production build and asset MIME checks pass. Browser review covered English desktop, Arabic at 390 and 320 px, keyboard tab changes, preserved answers on language switch, independent answer feedback, card review scheduling, due empty state, stable reveal height, and Home without duplicate timer. Reduced-motion rules reviewed in code; OS motion preference was not changed. QA attempts and reviews were confined to a separate local origin.

## User-directed correction

Restored the original dashboard and poetry layout. Retained the due-card counting correction and saved-section resume behavior. Hamburger placement and popover anchoring now mirror with language while the timer stays at the physical top right. Sticky rows use measured heights to eliminate the gap below the navigation.

Correction validation: all 28 checks and the production build pass. Browser measurements show a zero gap between header/context/tabs when pinned, in Arabic desktop and English at 320 px. The Arabic phone dropdown remains inside the viewport with no page overflow. Home has the original compact poetry panel and flex-row metrics, with no illustrated hero or duplicate timer widget.
