# Uniform flow: the depth gravity can sustain

Imagine a long straight canal after disturbances from its inlet have faded. Gravity pulls the water downhill; bed and walls resist. At normal depth the forces balance, the mean velocity no longer changes along the reach and water depth remains constant. The resistance equation is an empirical closure for that balance. Geometry, roughness and slope must work together to carry the required discharge. You will learn why a slope in percent is dangerous to substitute directly, why making a channel smoother changes capacity, and why normal depth usually needs a trial rather than a memorized isolated formula.

## What you must be able to do

- Weight and drag reach a truce
- Turn resistance into velocity
- Give the section its carrying capacity
- Find normal depth by a checked trial
- Improve a section without hiding assumptions

### Weight and drag reach a truce

For a long control volume in steady uniform flow, upstream and downstream hydrostatic pressure forces cancel. The remaining downslope weight balances the total resisting boundary shear. Dividing by wetted boundary area produces a mean boundary shear γRS0. It is an average over walls and bed, not the exact local bed stress everywhere.

```text
τ̄0=γ R S0; R=A/P; uniform: S0=Sw=Sf
```

τ̄0 kPa if γ=9.81 kN/m³; R m; positive downward slope S0 as m/m.

Steady, uniform, small bed slope, prismatic reach; nonuniform flow need not have parallel bed, water and energy lines.

**R=1 m and S0=0.001; calculate mean boundary shear.**

τ̄0=9.81×1×0.001=0.00981 kPa=9.81 Pa.

Small slope can still generate enough boundary stress to move sediment.

### Turn resistance into velocity

Chezy represents mean velocity with a resistance coefficient C and the square root of hydraulic radius times energy slope. Manning expresses the same velocity using roughness n and a different power of R. Their coefficients are related, not numerically interchangeable. Use the SI form here; the common US customary multiplier belongs to another unit system.

```text
V=C√(RSf); V=(1/n)R^(2/3)Sf^(1/2); C=R^(1/6)/n
```

V m/s; R m; C in m^(1/2)/s; Manning n in s/m^(1/3) in this SI expression; Sf head loss per length.

Empirical turbulent open-channel resistance; select n for actual surface and conditions. Do not use laminar-flow assumptions interchangeably.

**R=1 m,n=0.02,Sf=0.0004.**

V=50×1×0.02=1 m/s; C=1/0.02=50 m^(1/2)/s. Both equations give the same V.

The inverse dependence on n is a capacity effect at fixed depth; a prescribed Q may instead force a different normal depth.

### Give the section its carrying capacity

Multiply the mean velocity by wetted area to obtain discharge. A depth change changes A and R together, so discharge is not generally proportional to depth. Use real wall lengths in P. The tempting R≈y approximation would overpredict capacity in a narrow deep rectangular channel.

```text
Q=(A/n)R^(2/3)√Sf; K=(A/n)R^(2/3); Q=K√Sf
```

Q m³/s; K is conveyance, m³/s for Sf dimensionless; A m².

Same roughness and slope assumptions as the selected Manning model; full cross-section treated with one n only if appropriate.

**Rectangle b=4,y=2 m,n=0.02,Sf=0.0004.**

A=8,P=8,R=1; Q=(8/0.02)×1×0.02=8 m³/s. Velocity is1 m/s.

Capacity is conditional on the selected depth and slope; it is not automatically the actual discharge.

### Find normal depth by a checked trial

When Q is prescribed, y is hidden inside both area and hydraulic radius. Choose a trial depth, compute its carrying discharge, then increase depth if capacity is too small. A bracket around the desired Q is safer than an unexplained calculator root. Recompute Q from your final y as an independent residual check.

```text
F(y)=(A(y)/n)[A(y)/P(y)]^(2/3)√S0−Qtarget=0
```

F residual in m³/s; normal depth yn in m; use A(y),P(y) for the actual shape.

Positive slope, steady uniform flow and no downstream control dominating the reach. A computed yn is not a full water profile.

**Find yn for b=4,n=0.02,S0=0.0004,Q=8 in SI.**

Trial y=1 gives Q≈3.0526; y=3 gives Q≈13.5509, bracketing8. At y=2, A=8,R=1 and Q=8 exactly. Residual zero.

Use the root only after identifying what physical conditions make it a normal depth.

### Improve a section without hiding assumptions

For a rectangular channel with fixed flow area and one roughness, reducing wetted perimeter increases R and capacity. Differentiating P=b+2y with A=by fixed gives the hydraulically efficient proportion b=2y. This is a friction optimum, not a universal cheapest or safest construction: freeboard, lining, land, erosion, maintenance and side stability still matter.

```text
fixed A: P=A/y+2y; dP/dy=0 → b=2y; R=y/2
```

b,y,R in m; fixed A in m². This optimum is for rectangles only.

One n, fixed area and hydraulic efficiency as the objective; do not transfer the ratio unchanged to trapezoids.

**A=8 m². Find the efficient rectangular b and y.**

A=2y²=8 gives y=2 m, b=4 m; P=8,R=1 m. Compare b=8,y=1: P=10,R=0.8, lower capacity at the same n,Sf.

State the optimisation constraint before calling a section “best”.

## Your independent route

Close this chapter. Sketch the system, label givens and unknowns, predict the direction of change, then solve the Practice challenges without a hint. Use the Story map only to repair the first step you cannot explain. Rating a flashcard schedules its next active recall; finishing a step enrolls its concepts.
