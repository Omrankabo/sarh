**Publish the app and finished teaching content only.**

Use `sarh` as the Git repository/project root. Original university documents remain outside this folder. Rendered source pages, raw extraction/audit inputs and legacy authoring scripts were moved to `../private-study-archive/sarh`. That private folder is not needed to build or run the app.

The runtime loader reads only `content/published`. Each topic has `topic.json`, `understand.ar.md` and `understand.en.md`. The manifest `topics.json` identifies the published topics. Questions, cards, stable IDs and formula meanings remain in the topic data; `problems.json` contains final checked worked solutions and original schematic geometry. `references.json` stores exact document filenames and physical page counts, with no original files or local absolute paths. `videos.json` contains optional public YouTube links and bilingual relevance notes.

Edit the Markdown directly to improve a chapter. Keep mathematical blocks on their own `$$` lines. Do not rename topic, question or flashcard IDs: existing progress uses them. Add new subjects in `src/lib/subjects.ts`, and their topic entries in the published manifest.

Before publishing, run:

```text
npm run content:check
npm run release:check
npm run build
```

The normal build runs the first two checks automatically. Its final trace check rejects private source references in the server deployment manifests. `.gitignore` and `.vercelignore` exclude PDF files, raw source-render folders, reports, logs and local runtimes. Authored hero artwork, fonts and original instructional figures remain part of the app. No database credentials are required for the local notebook or published teaching content.

For Vercel, select the `sarh` project root. For Firebase App Hosting, initialize/configure from this same folder, merge the ignore list in `firebase.apphosting.example.json` into the generated configuration, and replace the example backend identifier with the real one. The current `firebase.json` remains emulator-only. Firebase CLI can upload the directory containing `firebase.json`, so do not place its deployment configuration in the parent university folder. This is described in the [official source-deployment documentation](https://firebase.google.com/docs/app-hosting/alt-deploy).

Production Firebase activation and hosted app deployment remain separate steps. Private originals are preserved outside the repository. Across the published journeys, 130 checked solutions are distributed with 35 structural schematics, 18 cash-flow timelines, 3 soil-profile/stress sketches and 74 exact filename/page fallbacks. Exhaustive archival coverage remains incomplete; see `docs/COURSE-COVERAGE.md`. The numerical fixtures needed by the test suite live in `tests/fixtures`, independent of private reports.

Video checks establish current public metadata availability, creator identity and topic relevance from publisher descriptions. They do not guarantee playback in every region or constitute a full narration audit. Similar worked videos are labeled as related examples; the written teaching remains usable without them.
