# Semester 7 — checked content batch, 27 October 2026

## Delivered

| Course | New journeys | Steps | Challenges | Cards | Library solutions added |
|---|---:|---:|---:|---:|---:|
| Soil Mechanics II | Shear strength; triaxial and drainage | 10 | 30 | 40 | 3 |
| Hydraulics | Geometry/continuity; uniform flow; specific energy/critical flow | 15 | 45 | 60 | 2 |
| Environmental Engineering I | Demand; quality/chemistry foundations; coagulation/flocculation | 15 | 45 | 60 | 3 |
| Steel II | Unrestrained beams/LTB; compound beams | 10 | 30 | 40 | 2, including 1 explicitly authored transfer exercise |
| Total added | 10 | 50 | 150 | 200 | 10 |

All additions use stable topic/concept/question/card IDs, English and Arabic introductory chapters, prerequisite checks and optional videos, the connected prediction-to-check story, mixed assessment and adaptive recall. Each of the 50 concepts appears in teaching, assessment and recall. Course cards and study libraries group the journeys by subject and family. The course map is expandable so learners reach the published lessons directly.

Ten prediction-gated experiments and original introductory sketches accompany the new topics. The library adds seven quantitative SVG figures and one beam schematic; two text-only calculations retain exact filename/page references. The pure calculation module is `src/lib/course-calculations.ts`. Existing progress, original guides and source exclusions are preserved.

## Source inspection and interpretation

The private scan covers 88 PDFs and 2,251 pages: Soil20/391, Hydraulics31/706, Environmental25/695, Steel12/459. Extractable text was indexed outside the repository; image-only and unextractable pages still need visual inspection. Eighty selected lecture/tutorial pages were rendered and inspected for this batch. This is not an exhaustive problem audit or a claim that every page has been interpreted.

The published library uses nine source-based calculations and one clearly titled authored steel transfer model. The checked scope of partial source examples is explicit: the flocculator solution covers dose, nominal volume/dimensions and water power; the beam example verifies actions and resistance arithmetic using supplied properties and an approximate supplied reduction factor. Paddle sizing and independent verification of that source beam's Mcr/restraint model are not claimed complete.

Corrections and ambiguities are visible in the teaching content:

- Soil Lecture2 p.9: the four stated measurements fit c=83.19727891 kPa and phi=17.48265439 degrees. The slide's graphical85/17 is approximate, and the large positive intercept conflicts with an automatic clean uncemented dry-sand interpretation. Data are retained; material/test labeling remains unresolved.
- Soil Lecture4 p.7: the failure-plane shear156.4588 kPa differs from maximum shear166.5 kPa. The source labels the former as maximum; the lesson explicitly distinguishes them.
- Soil drainage: drained means no remaining excess for the selected boundary conditions, not necessarily zero baseline pore pressure. A total-stress phi_u=0 idealisation does not mean all clays have effective phi_prime=0.
- Demand source pp.24–25: the average is240000 m³/day; a following intermediate drops one zero. Fire61.76 m³/min is88934.4 m³/day equivalent, not8893.4. The source comparison still selects peak-hour rate. No fire duration or current adopted regulation is inferred.
- Flocculation p.11:771.604938/(15×5)=10.288066 m width; the printed denominator225 is inconsistent. Staged water power is849.562757 W before drive losses.
- Water-quality pp.16–17: equivalent sums are recomputed without rounding each ion first; the old acceptance expression is labeled as a classroom audit, not current drinking-water regulation.
- Steel: retain EN1993-1-1:2005+A1:2014 lecture track and explicit general-case assumptions. The source's shortcut and approximate chi=0.8 are inputs to the checked arithmetic, not an independently certified Mcr solution. Older BS archive and NPTEL code factors stay separate.

## Optional video checks

Twelve newly added links returned successful YouTube oEmbed identity metadata on27 October2026; titles and publisher identities were checked against descriptions/course lists. Links are external, optional and English-labeled. This does not guarantee playback in every region or constitute a complete narration audit. Old NPTEL steel videos are explicitly marked as a different code context. Their factors must not be copied into the Eurocode lesson. No media is embedded or copied.

## Validation and continuation

The new tests independently check all100 numerical/mixed expected values, the source fit, Mohr-circle invariance and failure plane, continuity, normal/critical flow, demand rates/fire conversion, charge balance, flocculator exposure/volume/power, beam equilibrium, compound geometry/shear sharing and enrollment in adaptive recall. The full suite also exercises both language chapters after formula rendering, storage, timer and reports.

Resume from the remaining tasks in `SEMESTER-7-ROLLOUT.md`; do not rebuild these10 journeys or restart an archive audit from zero. Private indexing/authoring work is in the workspace sibling private archive and is never loaded by the app. No sources, source renders, OCR or private working inventory are distributed. Production Firebase, deployment and Git push remain outside this batch.

Final result:59 tests passed, TypeScript passed, production build passed,77 offline assets were listed, and all4 deployment traces excluded private sources. The normal launcher verified9 stylesheet/script assets and serves the updated app on port3000. Browser checks confirmed subject counts3/3/3/2 for the expanding subjects, one selected learning panel, prediction gating, the channel experiment response, correct numerical grading, Arabic phone layout at390px, desktop at1280px and internal figure scrolling without page overflow. Test submissions were confined to the separate port3002 origin; the test server/tab were then closed. Existing port3000 focus history remained intact.
