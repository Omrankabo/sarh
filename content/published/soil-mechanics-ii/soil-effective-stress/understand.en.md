Imagine standing at the bottom of a swimming pool while a stack of grains rests on the floor. The water above has weight, yet not all pressure is grain contact. Soil mechanics keeps those two jobs separate: total stress counts what loads the cut, pore pressure records what the connected water supports, and effective stress describes the skeleton. The aim is not to remember three symbols. It is to draw a point, trace the material and water above it, calculate two independent ledgers, and explain their difference.

Start with geometry and units. Then predict what changing the water table will do. A higher water table can change both soil weight and pore pressure, whereas a blanket of still water above an already submerged bed adds equally to both. Drainage removes excess pressure without requiring the pores to empty. These distinctions prepare you for shear strength, consolidation and seepage later in this course.


## Follow the whole story


### 1. A load needs an area

Imagine placing a broad book, then a narrow pencil, on a sponge. The force can be the same while the pressure changes. In soil, we report a force per unit of the whole cross-sectional area, not per microscopic grain contact. Compression is positive here. Start with the loading and the area: the division tells you how strongly the ground is being asked to carry the load.

```text
σ = Q/A; 1 kPa = 1 kN/m²
```

Q: applied force in kN; A: loaded area in m²; σ: average total normal stress in kPa.

**Assumptions.** Uniform loading on the stated area. This gives average stress, not the full three-dimensional stress distribution beneath a small footing.

**Try it.** A 240 kN force is uniformly applied to 4 m². Find average pressure.

σ=240/4=60 kN/m²=60 kPa. Doubling area to 8 m² would give 30 kPa.

**Interpret.** Stress is load intensity. A result in kN without dividing by area is still a force.


### 2. One total, two carriers

Now imagine the sponge is a skeleton of grains with water between them. At a cut through a saturated sample, the total load is supported by the skeleton and pore water together. Effective stress describes the skeleton contribution on the gross area. It is not a second externally applied load. Water pressure matters because it can take over part of the support without supplying grain-to-grain friction.

```text
σ = σ′ + u; σ′ = σ − u
```

σ: total normal stress; u: gauge pore-water pressure; σ′: effective normal stress, all in kPa.

**Assumptions.** Terzaghi saturated-soil model with consistent compression-positive signs. Unsaturated soil suction needs an extended model.

**Try it.** At one point, σ=100 kPa and u=40 kPa. Find σ′.

σ′=100−40=60 kPa. Check: 60+40=100.

**Interpret.** At unchanged total stress, increasing pore pressure reduces effective stress. This is a stress partition, not loss of equilibrium.


### 3. Count only the material above your point

Walk down a soil profile carrying a ledger. Every metre adds the weight of the material just crossed. At a layer boundary, the accumulated stress stays continuous but its slope changes with unit weight. A point halfway through clay has only half that clay thickness above it. Do not use submerged unit weight when building the total-stress ledger: water contained in saturated soil still has weight.

```text
σ_v(z) = q + Σ(γ_i h_i)
```

γ_i is actual bulk unit weight (kN/m³); h_i is the thickness above the point (m). q is a uniform surcharge (kPa).

**Assumptions.** Horizontal extensive layers. A constant q at depth assumes loading over a sufficiently large area, not a finite footing.

**Try it.** Above P: 3 m sand at γ=17, then 2 m saturated sand at γ=20. Find σ_v.

σ_v=3×17+2×20=91 kPa. The sand below P contributes nothing to this vertical overburden sum.

**Interpret.** The total-stress profile is a running sum of actual weights. Each segment has slope γ, not γ′.


### 4. Water reads head, not soil type

Put a tiny pressure gauge at P and connect it to still pore water. Its reading is set by the vertical distance below the free water level. It does not care whether the surrounding grains are sand or clay. Above the water table this introductory model sets u to zero only because it deliberately ignores capillary suction. With seepage or excess pressure, the measured water head must replace a guessed hydrostatic triangle.

```text
u = γ_w h_w = 9.81 h_w; h_w = max(0, z − z_WT)
```

h_w: vertical water head above P (m); z and z_WT are depths from the same datum. γ_w=9.81 kN/m³. u is gauge pressure in kPa.

**Assumptions.** Connected water at rest, atmospheric pressure at the water table, no excess pressure, and capillarity ignored.

**Try it.** Find u at z=9 m with WT at 3 m.

h_w=9−3=6 m; u=9.81×6=58.86 kPa.

**Interpret.** A change in soil type does not reset hydrostatic pore pressure. A change in water head does.


### 5. Two routes must reach the same effective stress

You can count the entire saturated soil weight and subtract its water pressure once. Or, under hydrostatic conditions, you can count the submerged weight directly. These are two accounting routes to the same skeleton stress. Using submerged weight and then subtracting water again makes the same correction twice. Above the water table, retain the stated moist or dry unit weight rather than subtracting water weight there.

```text
γ′ = γ_sat − γ_w; σ′_v = Σ_aboveWT(γ h) + Σ_belowWT(γ′ h)
```

γ′: submerged unit weight in kN/m³. It gives the effective-stress gradient below static WT, not total unit weight.

**Assumptions.** Hydrostatic saturated layers with no excess pore pressure or capillary correction. Include any wide drained surcharge separately.

**Try it.** Use the tutorial profile: 3 m at 17, 2 m saturated sand at 20, 4 m saturated clay at 19. Find σ′ at 9 m.

Direct route: 3×17+2×(20−9.81)+4×(19−9.81)=108.14 kPa. Full route: σ=167; u=58.86; σ−u=108.14.

**Interpret.** Agreement between the two routes is a powerful error check. A disagreement usually means a wrong depth, wrong unit weight, or a repeated water subtraction.


### 6. Drain excess pressure, not all the water

Place a broad additional load on saturated clay. In the ideal undrained instant, water can initially carry the increment; as drainage proceeds, excess pore pressure dissipates and the skeleton takes more of the increment. At the end, pore pressure can still be hydrostatic and positive. The pores do not have to become empty. The lecture’s piston description on page 4 must be read alongside page 7, which correctly separates hydrostatic and excess pressure.

```text
u(t) = u_h + Δu(t); Δσ′(t) = Δσ − Δu(t)
```

u_h: baseline hydrostatic pressure; Δu: excess pressure; Δσ: applied total-stress increment. All in kPa.

**Assumptions.** Ideal one-dimensional saturated loading with fixed total load after application and unchanged water level. The initial Δu≈Δσ assumption is not universal for all soil or stress paths.

**Try it.** Baseline u_h=30 kPa. A 40 kPa surcharge is held fixed. Later excess Δu=10 kPa. Find the skeleton increment.

Δσ′=40−10=30 kPa; current u=30+10=40 kPa. At full dissipation u returns to 30, not zero.

**Interpret.** Keep total pressure, baseline water pressure and excess pressure in separate ledgers. Drained describes pressure equilibration, not an empty soil.


### 7. Carry the whole profile yourself

For the tutorial, first mark ground, the water table at 3 m, the sand–clay boundary at 5 m and the base at 9 m. Build three columns: total, pore and effective. Plot each boundary value and join with the correct linear gradient. For the lecture lake problem, reset the datum carefully: the soil bed is below a 3.05 m water blanket, with 7.92 m sand and 3.66 m clay. The clay midpoint has 1.83 m clay above it. The water blanket adds equally to total and pore pressure, so it cancels from effective stress at a fixed point in the soil.

```text
Lake midpoint: σ = γ_w H + γ_sand·7.92 + γ_clay·1.83
u = γ_w(H + 7.92 + 1.83); σ′ = σ − u
```

H=3.05 m; saturated γ_sand=19.62 and γ_clay=18.36 kN/m³. Use γ_w=9.81 kN/m³.

**Assumptions.** Static lake, saturated connected soil and unchanged soil density. This cancellation does not justify ignoring groundwater changes inside the soil or seepage.

**Try it.** Calculate all three stresses at the lecture lake clay midpoint.

u=(3.05+7.92+1.83)9.81=125.568; σ=3.05×9.81+7.92×19.62+1.83×18.36=218.9097; σ′=93.3417 kPa. Check: 125.568+93.3417=218.9097. The source rounds to 125.6, 93.3 and 218.9.

**Interpret.** You are ready when your diagram, your total-minus-water route and your submerged-weight route all agree, and you can explain which changes would break those assumptions. FE/PE relevance: effective stress and groundwater interpretation; no claim of exam-percentage coverage.


## Your independent mission

Solve Tutorial 1 Q1 at depths 0, 3, 5 and 9 m without opening the worked solution. Label every axis and verify σ−u=σ′ at every boundary. Then solve Q2: convert w=56% to 0.56, assume saturated clay (S=1), obtain e=wGs, and calculate the clay midpoint at depth 10 m. Compare the three checked solutions in the study library only after your attempt.
