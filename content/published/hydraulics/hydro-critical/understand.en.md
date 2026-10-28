# Specific energy: the two-depth story

Pour the same flow through a channel at two depths. The shallow state is fast and carries much of its energy as motion; the deep state stores more as depth above the bed. Add those two contributions and you obtain specific energy. At fixed discharge there is a minimum: below it no depth can carry the flow within this model. That minimum is critical flow. This story explains alternate depths, choking over a hump and why a normal-depth calculation cannot replace critical-depth reasoning. We will keep energy measured from the local bed separate from total head measured from one fixed datum.

## What you must be able to do

- Depth and speed share the energy budget
- The minimum is a capacity boundary
- Can a surface signal travel upstream?
- Two depths can spend the same energy
- A raised bed can choke the original flow

### Depth and speed share the energy budget

Total head includes bed elevation z, depth y and velocity head. Specific energy removes only bed elevation: E=H−z. Its datum therefore changes with the bed. For a rectangle, V=q/y, so a shallower depth increases the velocity-head term strongly. A lossless reach conserves H, not automatically E when the bed rises.

```text
H=z+E; E=y+αV²/(2g); rectangular α=1: E=y+q²/(2gy²)
```

Heads z,E,H,y in m; q=Q/b in m²/s; α kinetic-energy coefficient, taken1 in examples.

Hydrostatic, small-slope section-averaged flow; no pump/turbine contribution in these examples.

**q=5.5 m²/s,y=2 m,α=1. Find E.**

V=2.75 m/s; E=2+2.75²/(2×9.81)=2.38545 m, matching the source table rounding.

Head terms have length units even though they describe energy per unit weight.

### The minimum is a capacity boundary

At fixed q, reducing depth eventually increases velocity head faster than it saves depth head. The E–y curve turns at its minimum. Setting dE/dy=0 gives q²=gyc³. The shallow and deep branches meet there. For a rectangle only, Emin=1.5yc; do not apply that factor unchanged to a trapezoid.

```text
dE/dy=1−q²/(gy³); yc=(q²/g)^(1/3); Emin=3yc/2
```

yc critical depth in m; Emin minimum specific energy in m for fixed rectangular q.

Rectangular horizontal/small-slope section with α=1; general sections use Q²T/(gA³)=1.

**Source q=5.5 m²/s. Find yc and Emin.**

yc=(30.25/9.81)^(1/3)=1.45552 m; Emin=2.18328 m. At yc the source table gives Fr≈1.

The minimum is a feasibility boundary, not a preferred operating depth for every canal.

### Can a surface signal travel upstream?

The long gravity-wave speed relative to shallow water is approximately √(gD). Compare the flow velocity with that speed. Below Fr=1, small disturbances can communicate upstream; above1, the current sweeps both directions downstream in the fixed frame. This is why downstream controls and boundary choices differ across regimes.

```text
c=√(gD); Fr=V/c; critical Q²T/(gA³)=1
```

c wave celerity m/s, D=A/T m; Fr dimensionless. c is relative to the water.

Small-amplitude long waves, hydrostatic pressure and small slope; not a turbulent eddy speed or an arbitrary wave model.

**q=5.5,y=1 m in a rectangle.**

V=5.5 m/s,c=√9.81=3.1321,Fr=1.756>1: shallow supercritical branch.

A rapid shallow stream and a deep slow stream with the same q respond differently to controls.

### Two depths can spend the same energy

Above the minimum, a horizontal line of constant specific energy normally cuts the rectangular E–y curve twice: shallow-fast and deep-slow. These are alternate depths, not the conjugate depths of a hydraulic jump. Jump depths are linked by momentum while energy is lost. Never join two alternate depths and call that a physically lossless jump.

```text
fixed q,E: y³−Ey²+q²/(2g)=0
```

Keep positive physical roots only; q in m²/s and y,E in m.

Rectangular section, α=1 and the same local bed datum; a root alone does not determine the actual branch.

**Choose q²/(2g)=4 m³ and E=3 m. Test y=2 m.**

E=2+4/4=3. Cubic y³−3y²+4=(y−2)²(y+1): this is the minimum, yc=2, so the two positive branches meet rather than forming distinct depths.

Check energy against Emin before asking for two distinct positive depths.

### A raised bed can choke the original flow

Over a short smooth hump with negligible loss, the rise in bed elevation consumes specific energy. On an initially subcritical branch depth decreases toward critical as the crest rises. The largest crest rise compatible with the original upstream state is E1−Emin. A higher crest forces a changed upstream state or discharge; do not continue the calculation into a nonexistent depth.

```text
E2=E1−Δz−hL; allowable Δz at critical crest = E1−Emin−hL
```

Δz positive bed rise and hL head loss in m; q fixed in the stated rectangular example.

Short transition, hydrostatic approach/control sections, selected upstream branch; include losses if significant.

**q=5.5,y1=2 m. Find the lossless critical crest rise.**

E1=2.38545; Emin=2.18328; Δzmax=0.20217 m. A0.30 m rise cannot pass the same q with that unchanged approach state.

Energy feasibility tells you when upstream conditions must be revisited.

## Your independent route

Close this chapter. Sketch the system, label givens and unknowns, predict the direction of change, then solve the Practice challenges without a hint. Use the Story map only to repair the first step you cannot explain. Rating a flashcard schedules its next active recall; finishing a step enrolls its concepts.
