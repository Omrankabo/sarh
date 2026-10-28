# صَرح design system

The app uses an architectural notebook: cream paper, sage surfaces, dark green ink and precise structural sketches. Blue marks the next action and current location; green marks learning progress; orange highlights intention and feedback. Bright colors are accents with accessible darker foregrounds. `src/app/polish.css` defines the shared refinement layer over the original shell.

| Role | Color | Use |
|---|---|---|
| Paper | #F7F4EC | Main canvas |
| Surface | #FFFDF7 | Cards and learning panels |
| Ink | #263C35 | Text and primary buttons |
| Primary | #355E49 | Links and selected controls |
| Sage | #E3EEE4 | Selected tabs and navigation |
| Progress | #799477 | Progress indicators |
| Terracotta | #BD6D3A | Small highlights |
| Peach | #FAE9DB | Warm supporting cards |
| Border | #D9DFD2 | Dividers and card edges |
| Muted | #5D6A61 | Supporting text |
| Focus blue | #0054D6 | Keyboard focus, links, selected answers |
| Focus tint | #E7EFFF | Selected tabs and next action icon |
| Success ink / tint | #086342 / #E0F5E9 | Correct answers and progress |
| Action ink / tint | #A4401B / #FFF0E6 | Intention and useful correction |
| Achievement | #FFD700 | Tiny decorative details |

Use dark foregrounds on tinted backgrounds. State labels, icons and values accompany color cues. Preserve visible keyboard focus and reduced-motion support.

Typography: locally bundled IBM Plex Sans Arabic and IBM Plex Sans for reading and controls, Amiri for poetry, Georgia for English editorial headings and Cambria/Georgia for equations. Learning copy is 16 px with generous line height; most interface labels are 12–14 px. Equations and numerical diagrams retain left-to-right direction in Arabic.

Spacing follows 4, 8, 12, 16, 24, 32, 48 and 64 px. Cards have 14–18 px corners, quiet borders and restrained shadows. Summary cards use one row: icon, label, number and unit. They switch from four columns to two on smaller screens. A thin line graph shows seven real days of focus time. Learning tabs and step maps scroll within their own rows on phones.

The persistent header contains the wordmark صَرح and hamburger navigation. The compact timer remains at the physical top right outside Home. Home has its full timer panel, with no duplicate widget. Navigation, language and settings live in the hamburger popover. Home retains the original compact poetry panel, summary row, chart with full timer, and Continue section beneath them. The later illustrated hero was removed at the user’s request. New learners start with the topic introduction; returning learners resume their saved section and step. Subject cards retain a maximum width of 380 px and explicit New journey / In progress / Complete labels.

The existing raster artwork remains in the first-visit splash: a complete 3.2-second watercolor reveal on a fresh load/reload and the first entry to each main area in that visit. Revisiting an area uses a short progress cue; language switching stays immediate. The dashboard uses its original poetry treatment, with no added illustration.

Motion uses `cubic-bezier(.16,1,.3,1)`: 180 ms controls, 220 ms sliding tab selection, 280 ms reveals, 500 ms progress fills. Feedback combines a symbol, words and color. Native details reveal gently; flashcards reserve answer space and keep review controls in place before disclosure. Review queues distinguish new cards from cards with a real due date. Reduced-motion preferences replace movement with short fades and remove sliding, drawing and hover translation. The first-visit splash retains a gentle fade for the requested duration.

Weekly summaries compare today and six preceding Riyadh dates with the preceding seven. Show longest commitment, real attempts and reviews, and first independent accuracy. Never manufacture activity or call unseen cards overdue. All secondary labels should be at least 12 px except the compact timer caption (10 px); touch controls are at least 44 px.

Dashboard reference: https://in.pinterest.com/pin/185632815880799653/

Header direction: the hamburger and its popover use the selected language’s logical start edge. English places them left; Arabic places them at the right edge on every page. The timer stays in the upper-right area, immediately inside the Arabic menu button so both controls remain reachable. Actual header, context and tab heights determine sticky offsets, including after wrapping or font loading; no fixed empty gap separates those rows.
