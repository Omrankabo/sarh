# صَرح | Sarh

A personal, bilingual Next.js study app for six Semester 7 civil-engineering subjects. Arabic opens first; English is available from the navigation menu. The original HTML guides remain outside this folder and are unchanged.

## Open the app

On Windows, double-click **Start-Sarh.cmd** in this folder. Then open **http://127.0.0.1:3000/ar**. The launcher checks the app, study content and assets and rebuilds when needed. It safely stops an existing Next server belonging to this exact Sarh folder before rebuilding/restarting, leaves other applications alone, and checks the actual stylesheet/script responses before reporting ready. A startup lock prevents simultaneous builds. Refresh already-open tabs after an update. Keep the app's terminal open while studying. Stop it with Ctrl+C when finished.

For development:

```text
npm install
npm run dev
```

For the production local version, including offline caching:

```text
npm run build
npm start
```

The default app needs no Firebase account, configuration or internet connection after its production pages/assets have finished caching. YouTube links need internet. The app serves extracted lessons and worked solutions only; original PDFs remain outside its public files. Browser data belongs to the exact origin: use the same hostname and port each time.

## What is included

- Six subjects with real teaching content: twelve Structures II journeys, fifteen Engineering Economics, three Soil Mechanics II, three Hydraulics, three Environmental Engineering I and two Steel II. The four expanding subjects retain course maps for the remaining content. Existing lesson URLs and notebook IDs are preserved.
- Thirty-eight Arabic/English journeys, each with a full Markdown opening chapter before the guided story map.
- 207 connected story steps, 561 training questions and 623 flashcards across the published journeys.
- Engineering Economics adds 75 story steps, 225 questions, 225 flashcards and a suggested four-week plan, covering all six lecture chapters plus FE/PE transfer practice.
- A subject-grouped study library with 140 checked worked solutions. Figures include 36 structural schematics, 18 cash-flow timelines, 3 soil-profile/stress sketches and 7 additional course SVGs. The other 76 entries identify exact source filenames/pages; one solution is an explicitly authored transfer exercise. No original PDFs are served.
- Fifty-one optional YouTube resources, with context in chapters, guided work, practice and worked solutions. Related examples are labeled.
- Shared 380 px course cards, a 300 ms color reveal after readiness on fresh entry and first entry to each main area, a rotating poetry panel on the dashboard and practice rows that grow with their text.
- Six course covers and 38 distinct topic illustrations, shared across cards, introductions and the study library. All 88 local WebP delivery assets together occupy approximately 4.72 MiB and join the offline cache.
- The beam pilot's original 30 challenge IDs and 36 card IDs, with Arabic translations.
- A focus timer and stopwatch in the revised dashboard; optional breaks never count as study. The session continues through navigation and refresh.
- A compact timer at the physical top right on every page except Home, where the full timer is already shown. It follows study tabs and scrolling, shows countdown progress or stopwatch elapsed time, and shares start/pause/resume/finish controls with the dashboard. Arabic and English use the same saved session.
- A rolling seven-day dashboard, compared with the previous seven days, and Riyadh-based streaks. A committed day needs 20 focus minutes and a question attempt or card review.
- A private audit report that distinguishes checked archival solutions from problems still awaiting verification. Only checked solutions appear in the study library.

## Content completeness — an open requirement

The **full archival solution requirement is not complete**. The Structures II private register has 113 records: 76 checked solutions and 37 unresolved entries; see `../private-study-archive/sarh/reports/source-audit.md` for its review extent. Engineering Economics maps the concepts in all six lecture chapters across 15 journeys and includes 51 checked source problems, but additional questions in its 16-file, 840-page archive still await verified solutions. Lesson completeness does not mean every archival question is solved. No exam-percentage coverage is claimed.

See `docs/COURSE-COVERAGE.md` for the distributed coverage summary. Running `npm run content:check` generates `reports/content-coverage.json` with current totals. Economics numerical fixtures are distributed in `tests/fixtures/economics-calculation-checks.json` and verified by `tests/economics.test.ts`. Private archival reports remain outside the repository.

Do not promote an archival entry to `verified` without reviewing its source figure and independently checking the numerical solution. The recent test's 12 m beam on source 23 page 22 is a **propped cantilever**, fixed at A and roller-supported at B. Its full-UDL midpoint moment is +90 kN·m; treating B as free is incorrect. Source inconsistencies and corrections are documented in the reports.

## Automatic progress saving

Progress remains in IndexedDB in this browser, at the same hostname/port. Settings contains focus and break durations, a completion-sound toggle, an optional desktop-notification control and a sound/alert preview. Import, backup and export controls have been removed at your request. Existing topic, question and card identifiers are preserved. No active cloud synchronization is enabled.

## Motion and timer alerts

The color splash uses a gray backdrop, central artwork and real readiness progress, followed by a 300 ms color reveal. It plays on fresh load/reload and first entry to each main area within that visit. Revisiting an area, switching language or changing topic tabs does not replay it. Dashboard values count up, timer digits settle gently, and icons, feedback and dialogs use the same ease-out curve. Reduced-motion preferences use brief fades instead of moving content.

A completed focus or break countdown shows a dismissible alert on any page. A separate atomic IndexedDB ledger prevents the same session from producing multiple sounds or desktop notifications across tabs or reloads. A stopwatch or manually finished session does not trigger the countdown alarm. Breaks never start automatically. Alert preferences are optional additions to the existing notebook format, so older progress remains valid.

Keep the app open for completion alerts. After a reload, a tap or keypress unlocks sound; Settings → Timer alerts → Preview sound & alert tests it without adding focus time. Desktop notifications require permission from the explicit Settings button. The in-app alert works without that permission. Audio is generated locally and needs no downloaded sound file. These controls follow the browser's [audio activation policy](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices) and [notification permission rules](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API).

If an older page looks unstyled, run `Start-Sarh.cmd` again and refresh it once the launcher says styles and scripts have passed. The offline worker rejects HTML responses masquerading as styles/scripts, and its cache version has been updated to retire previously invalid assets. This does not clear IndexedDB or your study history. Avoid running a separate manual build while another local Sarh server is serving the same `.next` folder.

## Verification

```text
npm run check
npm test
npm run content:check
npm run release:check
npm run build
```

Numerical source checks are recorded under `reports/`. The additional frame solutions have been checked using both an exact inextensional formulation and an independently assembled conventional planar-frame element, with global force and moment audits.

## Personal study accounts

Google and email/password accounts use separate local notebooks and private Firestore records. Guests keep their original notebook. Importing guest progress requires an explicit choice. Password accounts must verify their email before cloud syncing. See [account setup and validation](docs/ACCOUNTS.md) for configuration, syncing behavior and remaining live acceptance checks. Without Firebase environment variables, the app remains available in local guest mode.

The owner-only Firestore rules were verified against the local emulator and published to `sarh-ba9c3` in `europe-west1`: verified-owner read/write succeeds; other users, guests, unverified users and unspecified paths are denied.

For the existing project-local Windows test runtime:

```powershell
$taskJava = (Get-ChildItem '.runtime/java11' -Recurse -Filter java.exe | Select-Object -First 1).DirectoryName
$env:PATH = "$taskJava;$env:PATH"
npm run firebase:test
```

The pinned Firebase CLI supports this Java runtime. Java 21/17 hit a Windows Unix-domain socket startup failure on this machine, so the test used the supported Java 11 baseline. Future Firebase CLI upgrades may require a newer Java runtime; the app itself does not depend on Java.

## Design and artwork

See `DESIGN-SYSTEM.md` for tokens and component conventions. Fonts are bundled locally with their licenses in `public/fonts`. The splash artwork is `public/sarh-hero.png`; it was generated with the built-in image tool. The complete course/topic collection is in `public/illustrations/v1`; its final prompts and delivery details are in [the illustration guide](docs/ILLUSTRATIONS.md). Calculation and experiment figures remain code-drawn SVGs.

Course PDFs remain in the original university folder; no copies are included in the repository or app public directory.

## Adding a future subject

Register a course in `src/lib/subjects.ts` with a stable ID, Arabic/English title and description, semester and topic IDs. Add its teaching content to the server content loader and associate those stable topic IDs with the course. The Subjects page, dashboard entry, course navigation and offline route list are generated from this registry. Do not rename existing Structures II topic IDs: they identify saved learner progress.

## Publishing content without the sources

See `CONTENT-PUBLISHING.md`. The application loads `content/published` only. Original PDFs, rendered pages, raw source extraction/audit inputs and legacy authoring scripts are outside the app folder. The build checks published content, source exclusions and server deployment traces. Use `sarh` as the repository/deployment root. Git/Vercel exclusions and a Firebase App Hosting configuration example are included. Completed, checked updates are pushed to `Omrankabo/sarh` for the connected live site, as requested by the user; see [working agreements](docs/WORKING-AGREEMENTS.md).

## Active recall

Open **Review / المراجعة** to see your ranked due cards and upcoming dates. Mark a story step understood to enroll its concepts, then use a short recall session. The app saves adaptive schedules, ratings and the current session locally. Reminders stay inside Sarh. See [the active-recall guide](docs/ACTIVE-RECALL.md) for scheduling, migration, offline behavior and the new 300 ms visit entrance.
