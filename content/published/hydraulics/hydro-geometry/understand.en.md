# Open channels: read the water section

Stand beside an irrigation canal. The water has a free surface, so its depth is an unknown response rather than a pipe diameter imposed by the wall. A narrow reach, a rough bed or a downstream gate can change that depth. Start with the slice perpendicular to flow: water occupies an area, touches a wetted boundary and has a top width. Those three measurements lead to two different hydraulic lengths. Then continuity tells you how fast water must move. Finally distinguish change along the canal from change at the same location over time. This sketch-first habit prevents using a familiar formula on the wrong flow.

## What you must be able to do

- A free surface makes depth a response
- Trace the water, wall and top separately
- Two lengths answer different questions
- The same water must pass both sections
- Space and time are different changes

### A free surface makes depth a response

Open-channel flow has a free surface exposed approximately to atmospheric pressure. The conduit need not be uncovered: a partially full sewer can behave as an open channel. A prismatic reach has unchanged cross-section shape and bed slope along its length; that geometric property does not itself guarantee uniform flow.

```text
p_gauge = 0 at free surface; p/γ = h below a hydrostatic surface
```

p gauge pressure in kPa; γ water unit weight 9.81 kN/m³; h vertical depth below the surface in m.

Hydrostatic pressure away from sharp vertical accelerations; steep/curved flow can require corrections.

**Find gauge pressure 2 m below a hydrostatic free surface.**

p=γh=9.81×2=19.62 kPa. The surface itself has zero gauge pressure.

Channel classification depends on the flow state, not merely the presence of a cover.

### Trace the water, wall and top separately

In a trapezoid with side slope m horizontal to one vertical, the bottom rectangle contributes by and the side triangles together contribute my². The wetted perimeter follows the bed and submerged walls; it excludes the free surface. Top width includes both side extensions. A number such as 2H:1V means m=2, not one half.

```text
A=y(b+my); P=b+2y√(1+m²); T=b+2my
```

b bed width, y depth and T,P in m; A in m²; m side slope H/V.

Symmetric trapezoid, vertical flow depth and straight sides. Use separate side slopes if asymmetric.

**b=3 m, y=2 m, m=1. Find A,P,T.**

A=2(3+2)=10 m²; P=3+4√2=8.657 m; T=3+4=7 m.

The same water section supplies three different geometric measures.

### Two lengths answer different questions

Hydraulic radius compares water area with frictional contact, so R=A/P belongs in resistance laws. Hydraulic depth compares area with surface width, so D=A/T belongs in gravity-wave and critical-flow reasoning. For a rectangle D=y exactly, while R=by/(b+2y) only approaches y when the channel is very wide. Calling both “depth” causes many wrong substitutions.

```text
R=A/P; D=A/T; rectangular D=y, R=by/(b+2y)
```

R and D have length units (m) but different physical meanings.

Small bed slope and hydrostatic depth for gravity-wave interpretation. The wide-channel R≈y shortcut needs b≫y.

**For b=3,y=2,m=1 find R and D.**

R=10/8.65685=1.1552 m; D=10/7=1.4286 m. Neither equals the actual 2 m depth.

Choose the length from the mechanism: boundary resistance or free-surface response.

### The same water must pass both sections

For steady incompressible flow with no side inflow or outflow, the volume passing each section per second is the same. A larger area therefore means a smaller mean velocity for fixed discharge. Continuity does not by itself conserve energy: a transition can dissipate energy while conserving water. The source transition supplies enough data to solve area and velocity without guessing a water-surface shape.

```text
Q=VA; Q1=Q2; V1=Q/A1; y2=Q/(b2V2)
```

Q m³/s, V m/s, A m²; b2 is rectangular receiving width in m.

Steady incompressible flow without storage change or lateral exchange between sections.

**Source: trapezoid b=3,y=2.4,m=2, Q=13.1 m³/s. Rectangle b2=4 m, V2=0.9 m/s.**

A1=18.72; V1=13.1/18.72=0.6998 m/s. A2=13.1/0.9=14.5556 m²; y2=14.5556/4=3.6389 m. Check 4×3.6389×0.9≈13.1.

The specified lower rectangular velocity requires a sufficiently large flow area.

### Space and time are different changes

A depth that changes between two stations is nonuniform. A depth that changes with time at one gauge is unsteady. A steady backwater profile can be nonuniform, and a flood wave is generally both. Count the independent comparisons before selecting an equation; a channel may be geometrically prismatic while its water depth varies along it.

```text
steady: ∂y/∂t=0; uniform: ∂y/∂x=0
Fr=V/√(gD)
```

x distance along channel, t time, g=9.81 m/s², D=A/T. Fr is dimensionless.

Section-averaged classification; Fr uses hydraulic depth and small-slope gravity-wave assumptions.

**V=2 m/s in a rectangular section y=1 m.**

D=1; Fr=2/√9.81=0.6386<1, subcritical. Time/space classification still requires observations, not Fr alone.

Froude regime, steadiness and uniformity answer three different questions.

## Your independent route

Close this chapter. Sketch the system, label givens and unknowns, predict the direction of change, then solve the Practice challenges without a hint. Use the Story map only to repair the first step you cannot explain. Rating a flashcard schedules its next active recall; finishing a step enrolls its concepts.
