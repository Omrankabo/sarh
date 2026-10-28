# Semester 7 rollout

## Artwork checkpoint — 28 October 2026

The current image request is complete at the asset level: six course covers and 38 topic introductions, with local full/card WebP files, bilingual alternative text and an offline manifest. See `ILLUSTRATIONS.md` and `illustration-prompts.json`. Add a distinct introduction when publishing each new journey; preserve the precise instructional SVGs. The next course-content work remains the dependency list below.

## Course checkpoint — 27 October2026

The active-recall/loading implementation is complete. The next course batch has published10 additional journeys,50 steps,150 challenges,200 cards and10 library calculations across all four expanding subjects. See `COURSE-BATCH-2026-10-27.md`. The older “first published batch” below records the initial effective-stress delivery; it is historical, not the current total. All six subjects now have real teaching content.

Next work, in dependency order:

1. Soil: inspect Lecture5–10 and consolidation tutorial/test diagrams. Build compressibility/settlement, time and stress history, permeability, flow nets/seepage/filter safety and improvement. Retain meaningful lab/test variants. Inspect both laboratory RARs before claiming their coverage.
2. Hydraulics: build the lake/discharge control, momentum/jump, GVF classification/computation, unsteady flow, sediment/morphology/transport and trap-efficiency journeys. Inspect the workbook and remaining source problems; distinguish actual lab measurements from ideal models.
3. Environmental: extend storage/distribution/intakes/pumps, chemical equilibrium/kinetics, microbiology, sedimentation, filtration, disinfection and integrated design. Complete the flocculator paddle sizing only after checking its geometry and mechanical inputs. Keep historical classroom values separate from current regulations.
4. Steel: inspect Plate Girder lectures3–6 and Composite Slabs7, then publish their complete journeys. Independently validate the unrestrained-beam source Mcr/restraint model before upgrading its conditional arithmetic solution to full design. Audit Eurocode tutorial/test problems separately from the older BS track.
5. Existing Structures/Economics: retain the explicitly unresolved archival problems in their coverage report; finish those as source inspection permits. Do not count lecture coverage as all archive problems solved.

Every batch must preserve stable IDs, show the checked scope of each solution, test numerical/mixed answers independently, update current coverage and this checkpoint, and leave original sources outside the app. A local hourly continuation task is attached to this chat to resume unfinished work when usage is available. It must stop scheduling when the agreed course scope is complete; no deployment/push is implied.

Only extracted, authored teaching content enters the app. Original PDFs, page images, first-page text and the working inventory stay outside the repository. File/page references remain as plain attribution.

## Scope audit

| Remaining course | PDFs | PDF pages | Initial build sequence |
|---|---:|---:|---|
| Soil Mechanics II | 20 | 391 | Stress → shear and laboratory tests → consolidation → seepage → improvement |
| Hydraulics | 31 | 706 | Geometry → uniform/critical flow → jumps → profiles → unsteady flow → sediment |
| Environmental Engineering I | 25 | 695 | Demand/quality → chemistry/microbiology → treatment train → unit design |
| Design of Steel Structure II | 12 | 459 | Restraint/LTB → compound beams → plate girders → composite slabs |

88 PDFs and 2,251 pages inventoried by filename, page count and introductory text. This is a scope inventory, **not** a claim that all problems have been solved. Soil laboratory RAR files and the Hydraulics workbook are additional inputs; they require separate inspection. Several soil filenames repeat internal lecture headings: compare content before merging, retain meaningful variants.

## Execution order

1. **Soil Mechanics II:** publish the effective-stress journey now. Next, audit and build shear/direct-shear, triaxial/drainage, consolidation amount/time/history, permeability/flow nets, seepage forces/filters and improvement.
2. **Hydraulics:** begin with geometry, continuity and energy. Extend to uniform and critical flow, the lake problem, momentum/jumps, GVF classification/computation, unsteady flow, sediment and reservoir trap efficiency. Add lab interpretation after inspecting the workbook.
3. **Environmental Engineering I:** demand and quality, chemistry and microbiology, then coagulation/flocculation, sedimentation, filtration and disinfection. Keep optional special processes explicit. Date every external water-quality limit; do not treat an old lecture value as a current requirement.
4. **Steel II:** use a code/version gate. The new lecture sequence starts with Eurocode 3 EN 1993-1-1:2005+A1:2014; older filenames explicitly identify British Standards. Solve and tag these as separate tracks. Verify every section table, coefficient and restraint diagram before publication.

## Per-journey publication gate

- Full Arabic/English explanation before formulas, followed by prerequisites, a connected story, mixed practice and recall.
- Predict → observe → explain → formula → calculate → interpret → check.
- Every essential concept mapped to teaching, assessment and flashcards.
- Every source problem gets a stable ID, exact filename/page, inspected geometry and an independent numerical check. Merge only exact duplicates.
- Diagrams are redrawn from checked inputs. Ambiguities and corrections stay visible.
- Optional videos have verified identity and relevance. No original source attachments are deployed.
- Existing learner records and original HTML guides remain untouched.

## First published batch

`soil-effective-stress`: 7 steps, 21 questions (7 conceptual, 7 numerical, 7 mixed), 28 flashcards, 3 checked lecture/tutorial solutions, a prediction-gated water-table experiment and 3 original soil-profile/stress sketches.

Source pages visually inspected: Lecture 1 pp.9–11; Tutorial 1 statement p.3, Q1 solution pp.4–5 and Q2 setup p.6. References use PDF page numbers. The Q2 solution explicitly distinguishes moist sand above WT from submerged sand below it and corrects the handwritten clay unit-weight intermediate. Lecture p.4 drainage wording is clarified using its own hydrostatic/excess distinction on p.7.

Other new course cards show build maps, not placeholder lessons or fabricated completion. The existing two courses retain their content and progress.

## Validation

34 automated checks pass, including all 14 new numerical/mixed answers, tutorial boundary ordinates, independent submerged-weight checks, lake water-blanket invariance, and saturated phase conversion. Production build, content coverage and source-exclusion checks pass. The new optional video identity/availability was confirmed with YouTube oEmbed metadata. Browser review includes Arabic navigation on Subjects, topic and Materials pages; the first-entry/reload splash; the topic-specific experiment; and the redrawn tutorial profile. Reduced-motion color fade was verified in the browser; the normal circular reveal remains defined separately.

Final phone check: at 320 px, Arabic and English headers have no overlap or page overflow with an active timer. Planned Hydraulics opens a ten-part map with zero published lesson cards. All test activity stayed on an isolated local origin.

Pending source clarification: Lecture 1 Example 1 (pp.9–10) uses a well-style sketch whose boundary/loading idealization needs to be stated before publication. Its printed B total is 169.3 although its own rounded components 98.1+70.2 sum to 168.3 kPa. It is not included in the three checked solutions and must not be silently reused as a validated answer.
