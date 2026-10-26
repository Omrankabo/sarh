**صَرح — explanation first, then guided application**

Planning baseline: 25 October 2026. This document describes the next implementation; it does not certify that the changes below are already built.

1. **Give every topic a complete opening explanation.**

   Replace the short Start panel with an “Understand the topic / افهم الموضوع” chapter. Keep one topic open at a time, with a readable text width of about 65–72 characters, clear paragraph breaks and precise figures beside the relevant explanation. Arabic and English chapters cover the same concepts and preserve the existing topic IDs.

   The chapter has one connected narrative: a familiar physical situation; the practical question we need to answer; what the structure can move or resist; the response we expect; the method’s purpose and limitations; the essential equations introduced at the moment they become useful; and a small worked example interpreted in physical terms. End with a compact map of what the learner will do in the guided steps. Introduce technical words where they first appear.

   For every equation, explain the output, each symbol and unit, the sign convention, assumptions, why it applies here, and what would change if a load, restraint, length or stiffness changed. Explain the relationship in words before displaying the algebra. Finish by interpreting the result and checking equilibrium or boundary conditions as appropriate. The opening chapter must be understandable without playing a video.

   Example opening for continuous beams: imagine a ruler resting on two books, then slide a third book underneath. The extra book changes the shape and takes some load. Force balance alone cannot tell us its share; the deflected ruler must also fit the supports. This introduces compatibility. Only after the learner understands that need do we introduce joint rotation, stiffness, fixed-end moments and slope-deflection. The same example then continues through the story map rather than switching to an unrelated structure.

2. **Keep the guided story as the next layer.**

   The topic sequence becomes Understand → Prerequisites → Story map → Practice → Flashcards. Prerequisites remain directly accessible before any guided work; there are no mandatory reading locks.

   The chapter gives the whole picture. The Story map then applies that picture one decision at a time: predict → observe → explain → introduce the needed formula → calculate → interpret → check. Each step states what it helps the learner decide. Reuse the same structural example and geometry where possible, progressively remove worked guidance, then require independent theoretical, numerical and mixed reasoning.

   Preserve existing attempts, answers, question IDs, card schedules and topic progress. Keep the old `start` identifier as the underlying identifier for the renamed opening tab so saved links continue to work. Do not mark a whole chapter mastered simply because it was opened.

3. **Put relevant YouTube help beside the point of difficulty.**

   Keep the existing prerequisite videos and add a compact “Watch this explained / شاهد شرحًا” dropdown to the opening chapter, relevant story steps and worked problems. Each essential concept is mapped to a resource, which can be reused in several places; do not insert a different video merely to fill every box.

   Offer two useful kinds where available: a visual/concept explanation and a handwritten worked example. Show the actual title, creator, spoken language, the reason it helps and a useful timestamp when verified. Prefer the clearest Arabic or English explanation. Videos remain optional external links, with no embeds or dependency on internet for the lesson itself.

   Check identity, current availability, language, relevant segment and structural assumptions before publishing a link. A matching title or oEmbed response alone does not verify the explanation. Similar examples must be labeled “similar problem”, with relevant differences such as supports, loading or sign convention stated. Never fabricate an exact-match tutorial. If no suitable link is verified, state that plainly and keep the written explanation complete.

   Store resources once in a video registry with stable IDs and concept/problem associations. This makes a broken link replaceable without editing every lesson. Internet research and video review occur during content preparation, not when a learner opens a lesson.

4. **Store publishable teaching separately from the private source archive.**

   Use local Markdown for Arabic/English chapters and worked explanations, structured JSON for IDs, questions, cards, formula metadata and diagram geometry, and original SVG figures generated from checked structural data. This is editable, reviewable content; it does not require an active database to display lessons.

   Proposed organization:

   ```text
   sarh/
     content/published/
       subjects.json
       videos.json
       structures-ii/
         slope-beams/
           topic.json
           understand.ar.md
           understand.en.md
           steps.json
           practice.json
           cards.json
           problems/
             tutorial-1-q1.json
             tutorial-1-q1.ar.md
             tutorial-1-q1.en.md
     public/diagrams/                 # original authored figures only

   private-study-archive/              # outside sarh and its Git repository
     original-documents/
     rendered-pages/
     extracted-text/
     private-audit/
   ```

   Original university documents can remain in their existing folder. Move the app-local rendered source pages and raw audit material into the external private archive without deleting originals. The current `reports/audit-renders` and `reports/review-round2` folders are examples that need separation. The app loader and deployment build must read published content only; neither may require the private archive or the current mixed verified/unresolved register.

   Keep exact source filename, document ID and physical PDF page as small provenance fields on published problems. Include the printed page separately if different. These fields are text references, not document uploads, local disk paths or download links. The learner may see the correct filename even when the underlying file is not distributed.

   Add Git/Vercel exclusions as a second layer, and configure the chosen Firebase deployment target’s own inclusion/exclusion rules when preparing deployment. Do not rely on `.gitignore` to control every deployment path. Add a release check that rejects original PDFs, rendered source pages, raw extracted text, private audit files and learner-notebook exports in the Git candidate list and deployment artifact. Verify a clean checkout can build using published content alone. Production deployment remains a separate task.

5. **Turn worked solutions into visible structural problems.**

   Every drawable problem should open with an original, accurate SVG showing member/joint labels, supports, releases, dimensions, load positions and directions, and relevant stiffness or imposed movement. Keep geometry and labels readable on phones, use left-to-right numerical figures in both languages, and provide a textual description.

   Use a typed geometry model shared by the drawing and the solution data. Support continuous beams, overhangs, point/distributed loads and couples first, then non-sway/sway frames, inclined members and influence-line/model figures. Draw from an individually checked source figure. A schematic need not be to scale, but must say so; load positions and dimensions must agree with the calculation.

   Solution order: problem sketch → givens and required result → qualitative prediction → method choice → equations and calculations → reactions/diagrams where required → physical interpretation and checks → optional related video. Existing supplied solutions are the starting material; preserve their source references and check significant inconsistencies rather than silently rewriting them.

   If a figure cannot be reconstructed reliably, show “Diagram unavailable — refer to [exact filename], PDF page N.” Explain the unresolved detail. Do not invent a support, dimension or loading pattern. A trustworthy filename/page fallback is acceptable; a misleading generic figure is not.

   Start with the two pilot problems already drawn and the current checked solutions. There are 76 checked register entries and 37 unresolved entries in the present private register; this is not a certified exhaustive count of all unique source questions. Redrawing a problem does not by itself resolve its calculation or source ambiguity.

6. **Make the Study library follow the subject hierarchy.**

   Library landing → Theory of Structures II → topic families → one topic’s chapter, formula explanations and worked problems. Do not open with all topics or all solutions expanded. Preserve keyword search, but show subject/topic context on every result. Direct problem links should keep that context and open the relevant entry.

   Use the same course-card component in Subjects and at the library entrance. Structures II remains the only course until another course is ready. Existing library links should resolve to the new entry point, and translated URLs should preserve the chosen subject/topic/problem.

   Course cards use a 380 px desktop width, a maximum width of 380 px and a 100% container limit on smaller screens. Keep a 24 px grid gap and align cards to the start of the language direction. A lone card must not stretch across the page. Keep the existing 1200 px page container and the current quiet visual design. Test the shared card at phone widths and with longer Arabic/English titles.

7. **Remove backup/import/export from the current interface.**

   Remove notebook import/export buttons, the backup modal and copy directing the learner to export. Keep automatic local saving, current progress, timer settings and language controls. Rename any retained settings entry to Settings / الإعدادات. Do not clear IndexedDB or remove the existing progress records. A brief automatic-save status can remain; do not imply active cloud sync.

8. **Deliver in small, reviewable stages.**

   First: separate private/public content; implement the shared capped course cards and subject-grouped library; remove backup controls. Then complete one vertical example: the continuous-beam chapter, its guided steps, verified supplementary videos and the two pilot problem sketches/solutions.

   Verify that example end to end before applying its content template to the remaining eleven journeys. Reuse the existing supplied teaching and solutions; add the missing explanatory bridges, diagrams and relevant video associations. Keep unresolved source issues explicit rather than allowing them to delay the whole interface indefinitely.

   Acceptance: every topic has a coherent bilingual opening chapter; every declared essential concept appears in that chapter or an explicit linked foundation and is developed in guided work; formulas have meaning, units and assumptions; every published practical problem has a checked sketch or exact filename/page fallback; video links are reviewed and contextual; the library starts at subjects; course cards stay capped; backup controls are absent; progress and existing links survive; published lessons work offline; a clean deployment package contains no private sources.

Technical references checked for this plan: [Next.js Markdown/MDX support](https://nextjs.org/docs/app/guides/mdx), [Vercel deployment exclusions](https://vercel.com/docs/deployments/vercel-ignore), [Firebase Hosting file selection](https://firebase.google.com/docs/hosting/full-config#specify-which-files-to-deploy). These support the proposed content/deployment approach; they do not mean those migrations or deployment configurations have already been implemented.
