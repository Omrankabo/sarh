# Sarh course and topic illustrations

44 distinct selected illustrations: six course covers and one introduction for every one of the 38 currently published topics. Generated with the built-in `image_gen` tool in `illustration-story` mode. The exact final prompt for each selected image is in [illustration-prompts.json](illustration-prompts.json).

## Where they appear

- Subject cards and the subject library use each course's cover.
- Course pages introduce their subject with its cover, then show individual topic images.
- Topic cards, full topic introductions and library explanations share the matching topic image.
- Library families preview a topic in that family.

All titles remain real Arabic/English text outside the image. Artwork is not mirrored when the language changes. Introductory art is separate from the dimensioned SVGs, experiments and calculated diagrams in the teaching steps.

## Assets and delivery

Published files: `public/illustrations/v1/courses/` and `public/illustrations/v1/topics/`. Each illustration has a 1,200-pixel WebP and a 600-pixel card WebP, preserving the selected image's proportions. All 88 delivery files together occupy approximately 4.72 MiB. Re-encoding does not crop, retouch or composite the generated illustration. Generated PNG masters are preserved in the workspace's `study-work/artwork-masters-v1/`, outside the app repository.

`content/published/artwork.json` maps stable course/topic IDs to local paths, dimensions, Arabic/English alternative text and integrity hashes. `StudyArtwork` uses these static paths directly, with lazy loading and intrinsic dimensions. No third-party image host, image service credentials or external fonts are required.

The offline manifest includes every full image and thumbnail. Service-worker cache v8 checks the WebP response type before caching, preventing an HTML fallback from being saved as an illustration. `Start-Sarh.cmd` validates these public assets along with the built JavaScript and styles.

## Adding the next topic

1. Generate a new distinct scene using the style and subject structure in the prompt set. Use text-free introductory art; keep calculations in labeled SVGs.
2. Inspect the result for incorrect restraints, unintended hinges, impossible connections and distracting visual details. Revise before selection where needed.
3. Save the selected generated master in the workspace. The optional local `scripts/prepare-illustrations.mjs` helper accepts generation records with `kind`, `id`, bilingual `en`/`ar` titles, `prompt`, optional `alt`, and the built-in result's `hint`. It writes the complete catalog from the supplied records, so supply all selected records together.
4. Add the new topic/course entry to the catalog and prompt set, preserving existing identifiers. Supply a descriptive localized alternative text.
5. Run content, type, asset and release checks. Restart through the normal launcher and inspect both languages at desktop and phone widths.

The asset test requires every published course/topic to have a distinct image, checks that both sizes decode and verifies their dimensions, hashes and download budget. It also tests that offline caching rejects non-image responses.

Original course PDFs and rendered source pages are not included in this artwork collection or the app.
