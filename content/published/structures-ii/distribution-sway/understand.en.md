Imagine temporarily tying an unbraced frame's roof to a wall. That tie makes the rotational calculation easier, but it also introduces a horizontal reaction that the real structure does not possess. The whole sway procedure is the removal of that artificial force by a physically compatible displacement.

First solve the tied frame completely. Next impose a trial drift on the corresponding unloaded frame and distribute its moments to convergence. Calculate the horizontal reaction associated with that trial response. Scale the trial solution so that its reaction cancels the tie reaction, then add the two sets of moments.

The trial drift can be convenient rather than the final drift; its scale factor comes from force equilibrium. If there are two independent storey movements, one scalar correction cannot remove both artificial restraints: solve a small system for the two factors. Inclined members still require local movement projections. Finish with joint and whole-frame checks, not merely a neat distribution table.

## Follow the whole solution

### 1. Temporarily prevent the motion you cannot yet solve

Use two linear systems: the original loads with sway restrained, and a compatible trial sway with no original member loads. Superpose the latter at the scale that restores lateral force equilibrium.

**The relationship**

```text
Mfinal=M0+kM1; residual0+k·residual1=0
```

M0 is the converged restrained moment vector; M1 is the converged trial-sway vector; residual is the signed unbalanced horizontal force after including original loads.

**When it applies.** Linear elastic superposition, small movements, prismatic members and neglected axial strain. Clockwise member-end couples are positive; positive lateral applied forces and drift point right. Each restrained/trial distribution must converge before scaling.

**Put it to work.** The source example has AB=7.5 m, CD=5 m and BC=6 m. Column rigidity is EI₀, beam rigidity 2EI₀. A and D are fixed.

Loads: 96 kN downward at beam midspan; 48 kN rightward on AB at 4.5 m above A. One independent sway coordinate is required.

**What the result means.** Superposition combines complete compatible solutions. Adding arbitrary end-moment numbers without a common sway pattern is invalid.

### 2. Solve the restrained frame to convergence

Use actual geometry rather than a garbled extracted denominator. DF at B is [2/7,5/7] for BA,BC; at C [5/8,3/8] for CB,CD. Source fixed-load moments are [−34.56,+51.84,−72,+72,0,0] in order AB,BA,BC,CB,CD,DC.

**The relationship**

```text
DFBA=(1/7.5)/(1/7.5+2/6)=2/7; DFCB=(2/6)/(2/6+1/5)=5/8
```

Reference EI₀ factors cancel in DF. All listed end moments are clockwise kN·m.

**When it applies.** Linear elastic superposition, small movements, prismatic members and neglected axial strain. Clockwise member-end couples are positive; positive lateral applied forces and drift point right. Each restrained/trial distribution must converge before scaling.

**Put it to work.** Iterate restrained rotation balances until joint residuals are below 0.001 kN·m.

M0=[−27.700101,65.559799,−65.559799,33.431156,−33.431156,−16.715578]. The signed horizontal residual with the original 48 kN load is +23.818613 kN; the temporary support supplies −23.818613 kN.

**What the result means.** The printed lecture table stops early. Its rounded restrained values are demonstrations of the iteration, not the converged benchmark used here.

### 3. Give the trial columns one compatible drift

Choose a convenient trial z1=EI₀Δ1=1000 kN·m³. Hold section rotations first to build its initial column moments, then unlock the corner rotations through ordinary distribution. The beam has no direct chord rotation in this geometry.

**The relationship**

```text
Ftrial,column=−6EI₀Δ1/h²; rightward Δ1 gives negative clockwise trial moments here
```

z1 carries units kN·m³; moments are kN·m. Only relative trial scaling matters, provided the trial remains a compatible linear displacement pattern.

**When it applies.** Linear elastic superposition, small movements, prismatic members and neglected axial strain. Clockwise member-end couples are positive; positive lateral applied forces and drift point right. Each restrained/trial distribution must converge before scaling.

**Put it to work.** Build and converge the trial for AB=7.5 m and CD=5 m.

Initial column moments: AB=BA=−106.666667; CD=DC=−240. Converged M1=[−101.574539,−96.482412,96.482412,154.773869,−154.773869,−197.386935]. Trial lateral residual=−96.839754 kN.

**What the result means.** Equal trial end moments in the two unequal-height columns would represent incompatible drifts.

### 4. Scale by the force that must disappear

Use the converged residuals of both cases. Do not mix a converged moment vector with a truncated table’s scaling factor.

**The relationship**

```text
k=−residual0/residual1; Mfinal=M0+kM1
```

k is dimensionless; original drift satisfies EI₀Δ=k·1000 kN·m³.

**When it applies.** Linear elastic superposition, small movements, prismatic members and neglected axial strain. Clockwise member-end couples are positive; positive lateral applied forces and drift point right. Each restrained/trial distribution must converge before scaling.

**Put it to work.** Use residual0=+23.818613 and residual1=−96.839754 kN.

k=0.245959041; EI₀Δ=245.959041. Final [AB,BA,BC,CB,CD,DC]=[−52.683277,41.829077,−41.829077,71.499188,−71.499188,−65.264679] kN·m.

**What the result means.** These replace the source’s approximate final table. With EI₀=20000 kN·m² as an authored scale choice, Δ=12.297952 mm.

### 5. Two independent movements need two corrections

The second source example introduces two sway freedoms. Build a restrained solution plus independent unit patterns. Put each trial’s reaction effects into one matrix column and solve for both scales together.

**The relationship**

```text
R0+A·k=0; M=M0+k1M1+k2M2
```

Aij is reaction residual at restrained coordinate i from trial j. Trials must be independent; an almost singular matrix may indicate a mechanism or redundant trial patterns.

**When it applies.** Linear elastic superposition, small movements, prismatic members and neglected axial strain. Clockwise member-end couples are positive; positive lateral applied forces and drift point right. Each restrained/trial distribution must converge before scaling.

**Put it to work.** Authored two-coordinate stiffness check: K=[[10,−4],[−4,8]] kN/mm and force vector [20,12] kN.

10Δ1−4Δ2=20 and −4Δ1+8Δ2=12 give Δ1=3.25 mm, Δ2=3.125 mm. The off-diagonal terms represent coupled response.

**What the result means.** This authored matrix is a training check, not the numerical solution of the source’s second frame. Source geometry must be transcribed before solving that separate problem.

### 6. Finish with independent force checks and inclined geometry

Use local-vector projection to find each member’s transverse relative displacement; project distributed loads as needed. Compute trial forces with full member free bodies. For the lecture 17 vertical-column benchmark the converged solution can be checked independently with global reactions.

**The relationship**

```text
ψCW=−n·(uj−ui)/L; Fglobal=N e+V n; ΣFx=ΣFy=ΣM=0
```

e: local unit tangent; n: local unit normal; N,V: signed local forces. For source 17, support D is 2.5 m above A because the column heights differ.

**When it applies.** Linear elastic superposition, small movements, prismatic members and neglected axial strain. Clockwise member-end couples are positive; positive lateral applied forces and drift point right. Each restrained/trial distribution must converge before scaling.

**Put it to work.** Use global right/up positive for the converged source-17 answer.

HA=−20.647227, HD=−27.352773, VA=43.054982, VD=52.945018 kN. Check HA+HD+48=0; VA+VD−96=0. About A: 6VD−2.5HD−MAB−MDC−96·3−48·4.5=0.

**What the result means.** The D horizontal-reaction lever arm is easy to miss because the beam is horizontal but the bases have different levels.

## Before you solve independently

- Restrained plus correction response
- Restrained analysis with actual stiffness
- A compatible trial sway
- Scale the trial by force equilibrium
- Independent story movements
- Convergence and inclined-frame force checks

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.