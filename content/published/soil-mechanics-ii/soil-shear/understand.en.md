# Shear strength: why grains slide

Imagine pushing a heavy box across the floor. Adding weight makes it harder to slide because the contact force increases. Soil has millions of such contacts, modified by grain shape, packing, bonding and water pressure. A footing or slope fails when the demand on a possible sliding surface reaches the resistance available there. The task is to measure that resistance under drainage and stress conditions relevant to the field. We begin with force and area, build the Mohr–Coulomb line, then test what a laboratory result can and cannot justify. The lecture’s worked dry-sand data are retained, including their unexpected positive intercept; that inconsistency becomes an interpretation exercise rather than a hidden correction.

## What you must be able to do

- A sliding surface has demand and capacity
- Normal stress buys frictional resistance
- Read a line, not just two numbers
- The box chooses the failure plane
- Challenge the “dry sand” answer

### A sliding surface has demand and capacity

A horizontal force tries to slide the upper half of the box while a normal load presses the two halves together. Shear stress is force divided by the area carrying it. Strength is the limiting shear stress reached at failure, not the shear stress at every earlier load. Keep demand τ and capacity τf separate so that a safe sample is not mistakenly assumed to be failing.

```text
σn = N/A; τ = T/A; at failure τ = τf
```

N normal force and T shear force in kN; A shear-plane area in m²; stresses in kPa.

Uniform average stresses on the stated area; note whether nominal or corrected overlap area is used.

**A 60×60 mm box carries N=360 N and failure T=414 N.**

A=0.06²=0.0036 m². σn=0.360/0.0036=100; τf=0.414/0.0036=115 kPa.

Both loads must use the same area convention. Strength exceeding normal stress is possible when a fitted cohesion intercept is present.

### Normal stress buys frictional resistance

Draw measured failure points with effective normal stress horizontally and shear strength vertically. A straight Mohr–Coulomb approximation has an intercept c′ and slope tan φ′. The intercept is a fitted parameter over the tested stress range; it is not proof that every clay is purely cohesive or every soil has permanent bonding. Raising pore pressure at fixed total stress reduces the frictional part by reducing contact stress.

```text
τf = c′ + (σn − u) tan φ′
```

c′ in kPa; φ′ effective friction angle in degrees; u pore pressure and σn total normal stress in kPa.

A selected effective-stress failure envelope and relevant drained/known-u conditions; do not mix total-stress parameters with σ′.

**c′=10 kPa, φ′=30°, σn=120 kPa and u=40 kPa.**

σ′n=80; τf=10+80 tan30°=56.19 kPa. If u rises by 20, capacity falls by 20 tan30°=11.55 kPa.

Water pressure affects available grain friction; it does not subtract directly from shear stress.

### Read a line, not just two numbers

One test supplies one failure point. Several normal loads let you estimate a slope and intercept and see whether a straight line is reasonable. For two exact points, slope is rise divided by run. For scattered measurements use regression or a clearly stated graphical fit. Never take the angle itself as the slope; calculate the inverse tangent after fitting.

```text
m = Δτf/Δσ′n; φ′ = atan(m); c′ = τf − mσ′n
```

m is dimensionless; c′ and τf use the same pressure units. atan returns degrees only if the calculator is in degree mode.

Same soil preparation, density and drainage condition across tests; fit only the relevant stress range.

**Two tests: (σ′,τf)=(100,70),(200,120) kPa.**

m=(120−70)/(200−100)=0.5; φ′=26.565°; c′=70−50=20 kPa. Check the second point:20+0.5×200=120.

The independent second-point check catches a wrong intercept or mixed units.

### The box chooses the failure plane

A split box forces relative movement along its horizontal split. Record normal force, horizontal force and both horizontal and vertical displacement. Dense sand may dilate while loose sand may contract; the change is information about packing, not a broken test. Drainage rate and overlap area matter. The simple apparatus does not directly reveal principal stresses or measure pore pressure, so fast tests on low-permeability soil need careful interpretation.

```text
A_overlap = B(L − δ); τ = T/A_overlap
```

B and L box plan dimensions; δ relative horizontal displacement, all in m; use T in kN for kPa.

Rectangular overlap correction if required by the test procedure; not a universal replacement for the source’s nominal-area convention.

**B=L=60 mm, δ=5 mm, T=0.33 kN.**

A=0.060×0.055=0.00330 m²; τ=100 kPa. Nominal-area stress is 91.67 kPa. State which one you report.

A laboratory result needs its procedure and stress basis, not just a final angle.

### Challenge the “dry sand” answer

The supplied lecture labels four specimens dry sand but reports a positive cohesion intercept near 85 kPa. The force-to-stress conversions are consistent. A least-squares line through the four given points gives an intercept near 83.20 kPa and φ near 17.48°. This is a fit to those data, not evidence that clean dry sand has true cohesion. Preserve the measured values and flag the labeling or test/model issue before using the parameters in a field calculation.

```text
m = Σ[(σ−σ̄)(τ−τ̄)] / Σ(σ−σ̄)²; c = τ̄ − mσ̄
```

Four source points: σ=[100,200,350,500], τ=[115,145,195,240] kPa. Bars denote means.

A statistical classroom fit only. The source’s soil label and large intercept remain unresolved; do not silently force c=0.

**Use the source’s rounded graphical fit c=85 kPa and φ=17°. Predict τ at σ=300 kPa.**

τ=85+300tan17°=176.72 kPa. This is an interpolation of that fitted line; it does not resolve the soil-label inconsistency.

A credible solution reports both the numerical fit and the reason its physical interpretation may be wrong.

## Your independent route

Close this chapter. Sketch the system, label givens and unknowns, predict the direction of change, then solve the Practice challenges without a hint. Use the Story map only to repair the first step you cannot explain. Rating a flashcard schedules its next active recall; finishing a step enrolls its concepts.
