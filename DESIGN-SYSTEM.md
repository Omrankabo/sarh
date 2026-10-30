# صَرح — Guided Study Desk (Concept A)

The learner should always know where they are, what they are trying to understand, and what to do next. The user selected Concept A on 30 October 2026.

## Appearance ownership

`src/lib/appearance.ts` owns the browser appearance record and validation. `AppearanceProvider` applies changes and listens for appearance changes in other tabs. It never accesses learner notebooks. A layout effect applies saved preferences before interactive content appears; the startup script also restores document attributes without persisting defaults. The readiness splash covers server-rendered content while the notebook initializes. Invalid/unavailable storage falls back safely. Explicit legacy Mint/Burgundy and Solid/Glass preferences are read without overwriting them.

Interface: theme `mint | burgundy`, finish `solid | glass`, typography `default | proxima-sailors`. New/unset preferences use Solid Mint and bundled IBM Plex. Licensed Proxima Nova/Sailors webfont kits are still required; the custom control remains disabled. No font purchase or unlicensed download is included. Arabic keeps IBM Plex Sans Arabic; poetry keeps Amiri. Math remains LTR.

`tokens.css` owns colors, radii, spacing, dimensions and easing. `appearance.css` owns shared controls, selection, feedback and panels. `dashboard.css`, `learning.css`, `session-widget.css`, `recall.css` and `accounts.css` own their respective layouts. The conflicting glass/polish override sheets were removed.

## Composition and geometry

- Canvas 60%: Mint #F0F7F6 / Burgundy #F5F1F2.
- Surfaces 30%: white, supporting Mint #DCF2E1 / Burgundy #F4DCE2.
- Emphasis budget 10%: Mint #0F4E36 / Burgundy #6D001A, with small orange #FF8A4C cues.
- Main text #1F2933 / #2D2528; secondary #58665F / #665C61.
- Selection follows the theme. Success/error/attention have their own labeled semantic states.
- Shell capped at 1440px, outer padding 12px. Scale: 4, 8, 12, 16, 24, 32, 48, 64.
- Header minimum 72px desktop / 64px phone. The non-home timer reserves additional header space; it stays at physical top right in either language. Home uses its main timer.
- Controls 44px minimum, horizontal padding 16px, radius 12px. Cards 20px radius; dialogs 24px. Circular avatars and pill badges are deliberate exceptions.
- Panels 24px padding desktop / 16px phone. Grid gaps 24px / 12px. Course cards cap at 360px and never stretch a final row.
- Phones show two course cards above 359px. A 390px layout has 177px cards where the browser uses overlay scrollbars; a desktop browser's reserved scrollbar reduces the available content width. Narrow screens or an enlarged effective viewport use one column.
- Reading measure capped at 720px. English lessons 16/26px; Arabic lessons 18/32px. Titles 32/40px desktop, 28/36px phone. Labels 14/20px.

## Screen behavior

Dashboard: Continue/Start and Recall lead, then compact poetry, real metrics, weekly focus report and main timer. Empty records remain empty; screenshots use a new guest notebook, not fabricated activity.

Courses/library: Semester 7 course collections. Course overviews use compact topic rows and family filters. Existing `/subjects` paths, stable course IDs and topic IDs remain intact; displayed vocabulary is Courses / المقررات.

Learning: Understand, Prerequisites, Story Map, Practice and Flashcards show only the selected content. The course/topic/location bar stays visible. On phones duplicate display headings are visually hidden while remaining available to assistive technology. Step/question outlines become disclosures. Previous/Next, drafts and grading retain their existing behavior.

Accounts: 440px form, opaque in Solid mode; glass is optional. Existing authentication and account scoping are unchanged.

## Motion contract

Easing: cubic-bezier(.23,1,.32,1). Press 100ms, release 140ms, hamburger/menu 180ms, timer state 200ms, dialog entrance 220ms, confirmation 200ms. Timer digits stay stable. No repeated page/card entrances or icon jumping. Reading/topic/language navigation stays immediate. Reduced motion removes movement. Hover effects require a fine pointer.

Fresh document visits retain readiness-based progress and a skippable 300ms edge-color completion splash. Topic subtabs and language changes do not replay it. No runtime motion assets are fetched from reference sites.

Reference intent: useAnimations menu/play-pause/check/notification; Ripplix tab switching. Implemented locally with CSS/SVG, without redistributing third-party animation assets.

## Validation

Run `npm run check`, `npm test`, `npm run build`. The build includes content, release, offline-asset and deployment-trace checks. Browser evidence and local comparison/motion previews live outside the app in `../ui/sarh-design-review`; raw source PDFs and private learner records remain excluded.
