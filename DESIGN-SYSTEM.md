# صَرح design system

The app follows the architectural notebook in `../Structures-II-Slope-Deflection.html`: cream paper, sage surfaces, dark green ink, muted terracotta details and precise structural sketches. Pinterest course dashboards informed the hierarchy of navigation, summary cards and the study area; their artwork is not embedded in the app.

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

Use dark foregrounds on tinted backgrounds. State labels, icons and values accompany color cues. Preserve visible keyboard focus and reduced-motion support.

Typography: locally bundled IBM Plex Sans Arabic and IBM Plex Sans for reading and controls, Amiri for poetry, Georgia for English editorial headings and Cambria/Georgia for equations. Learning copy is 16 px with generous line height; most interface labels are 12–14 px. Equations and numerical diagrams retain left-to-right direction in Arabic.

Spacing follows 4, 8, 12, 16, 24, 32, 48 and 64 px. Cards have 14–18 px corners, quiet borders and restrained shadows. Summary cards use one row: icon, label, number and unit. They switch from four columns to two on smaller screens. A thin line graph shows seven real days of focus time. Learning tabs and step maps scroll within their own rows on phones.

The top contains only the wordmark صَرح and a hamburger button. There is no header bar, decorative brand symbol, sidebar or bottom navigation bar. Navigation, language and notebook settings live in a compact hamburger popover. The timer is a dashboard panel, beside the focus graph on desktop and first on phones. A compact continue section retains the current topic and step. A topic retains its context and a single visible learning panel.

The former hero artwork appears only in loading states. A grayscale sketch receives an expanding watercolor reveal through CSS clipping and masks. It adds no artificial delay. Reduced-motion preferences disable the animation. No new raster asset was generated.

Dashboard reference: https://in.pinterest.com/pin/185632815880799653/
