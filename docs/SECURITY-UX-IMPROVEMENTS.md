# Security and UX improvements — 29 October 2026

Reviewed against the user-provided security/UX report for f377b8d. The report is reference material; existing user choices remain authoritative.

## Delivered

- Shared liquid-glass treatment for navigation, language/close controls, floating timer and notifications. Lesson reading surfaces remain opaque. Reduced-transparency and reduced-motion fallbacks are included.
- Home, Subjects, Review and Library remain in the hamburger menu. The revised header exposes language and account controls, with a floating timer on non-home pages. Existing dashboard composition retained.
- Route-specific lesson/solution payloads and a lightweight course/recall catalog. Only the requested language's teaching text is serialized. Materials loads one course; recall retains the complete card catalog for reliable offline reminders.
- Prebuilt valid routes and genuine HTTP 404s. Language and direction are set in server HTML. Per-page titles, descriptions, alternate languages, sitemap and sharing metadata.
- Public, account-free first-paint content. Local notebooks are loaded only after authentication resolves; account changes still hide the outgoing workspace. No guest history is automatically attached to accounts.
- WebP entrance artwork, lossless WOFF2 font conversion and no global poetry-font preload. The 300 ms ease-out entrance remains first-main-area-per-fresh-visit as requested. It no longer waits for decorative artwork/fonts and has a skip button.
- Security headers: nosniff, referrer/permissions policies, frame denial, popup-compatible opener policy; CSP is report-only for observation, not an enforced protection or a remotely collected reporting service.
- Offline cache only accepts approved same-origin public routes/assets; account endpoints, arbitrary origins, PDFs and RSC query payloads are excluded.
- Cloud record validation happens before traversing object keys. Unknown paths, prototype keys and malformed records cannot replace a local notebook. Legacy pilot receipts remain supported.
- Introduction video ID and finite-time checks.
- GitHub issue-draft links on solutions, practice feedback and recall cards. No account data or study history is included. The repository is public and issues are enabled; learners choose whether to submit.
- Manifest and app icons, plus a ready-offline status when caching finishes.
- Read-only GitHub Actions checks and scheduled dependency update proposals.

## Measured production build

Gzip computed from HTTP response bodies on localhost; not a network speed or Lighthouse score.

| Page/asset | Report baseline | Current |
|---|---:|---:|
| English Home HTML (gzip) | 667,224 B | 65,717 B |
| English Home HTML (raw) | 3,536,327 B | 311,228 B |
| Arabic Home HTML (gzip) | — | 69,534 B |
| Continuous beams, English HTML (gzip) | approximately whole catalog | 96,576 B |
| Structures library, English HTML (gzip) | approximately whole catalog | 206,899 B |
| Splash image | 2,610,742 B | 103,190 B |
| Four font files | 1,448,900 B | 527,116 B |

## Validation

- 76 automated tests pass, including new hostile-cloud-key and offline cache boundary tests.
- Type checking, production static build, published-content validation and private-source deployment-trace checks pass.
- All 38 topics, 207 steps, 561 questions, 623 cards and 140 worked solutions remain present; checked calculations and stable IDs were not changed.
- HTTP checks confirm Arabic RTL / English LTR HTML, the public first-paint shell, security headers, and real 404s.
- Browser checks cover Arabic/English phone navigation, 320 px controls, preserved guest notebook, language switching and the earlier glass layout. The revised theme requires its own final browser check. No real study submissions were fabricated.

## Outstanding / deliberate boundaries

- Firebase App Check monitoring/enforcement, quotas/alerts, API-key restrictions, password policy and stricter server-side value schemas still need platform-specific configuration and emulator/live validation. Existing verified-owner rules remain unchanged.
- Current production dependency audit reports 8 affected package entries (4 high / 4 low), tracing to grpc-js and KaTeX. The suggested automatic fixes downgrade Firebase and math integrations; they were not applied blindly. Test compatible overrides/upstream updates in a separate dependency batch, including emulator and equation-rendering regression checks.
- Google redirect behavior under third-party-storage blocking, verification cooldowns and a full two-account/cross-device live acceptance run remain separate checks. This batch does not claim they passed.
- Branch protection, CodeQL, secret-scanning settings and a license were not silently enabled or chosen.
- Materials still ships the selected course, and the recall catalog includes all cards in the selected language. Further lazy loading is possible; do not sacrifice offline schedules to remove a small payload.
- No claim of a full screen-reader, axe, enlarged-text or offline installation certification. Manifest availability does not guarantee every browser will offer installation.
- Riyadh day boundaries and fresh-visit splash behavior are preserved by explicit user preference.

Technical reference: [Firebase redirect guidance](https://firebase.google.com/docs/auth/web/redirect-best-practices), [CSP report-only guidance](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP). Next.js changes were checked against the installed Next 16 documentation.

## Theme revision

The subsequent user request supersedes the quick-navigation dock: the header now mirrors hamburger/logo and language/profile controls, with a separate top-right floating timer. Mint and burgundy glass themes are available in Settings; the theme is stored on the current device. The home route and install start URL now default to English; existing language-specific links and notebook history are preserved. Side padding is reduced. The supplied font image names Proxima Nova Condensed and Sailors but contains no usable font files; locally bundled IBM Plex fonts provide an offline-ready approximation until appropriately licensed fonts are supplied.
