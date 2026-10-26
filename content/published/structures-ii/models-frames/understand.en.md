A frame model can move horizontally, vertically and by rotating. A measured arrow is useful only when you pair it with the force component acting in that direction. Picture a horizontal jack pushing the roof while gravity acts on the beam: the jack works through horizontal travel, while gravity works through vertical travel.

Release the action you want to measure. Balance the virtual work of every applied force and couple against that action's conjugate movement. A moment requires a rotation in radians; a distributed load requires integration of its matching displacement field. Resolve inclined-member readings into the same global or local directions as their loads.

Normalize with the actual imposed release and geometric scale. One independent work equation supplies one independent missing action; global equilibrium may then supply others, but does not replace missing compatibility information in a more highly indeterminate frame. Test a second independent movement where available, then use member free bodies to reconstruct and check the response.

## Follow the whole solution

### 1. Ask for one frame action

A horizontal reaction pairs with horizontal translation, a vertical reaction with vertical translation, and a support couple with rotation. Different released coordinates require distinct experiments.

**The relationship**

```text
H↔u; V↔v; M↔θ
```

Arrows identify work-conjugate pairs, not equality of numerical values. Each release must leave a meaningful stable model shape.

**When it applies.** Small-displacement linear frame with geometrically compatible release shapes and matching relative stiffness. Below, global +x is right, +y is up and positive couple/rotation is counterclockwise unless specified.

**Put it to work.** Lecture scalar calculation: a signed area with magnitude22500 mm², S20, release100 mm, and w30 kN/m.

Magnitude of the UDL contribution=30×20×22500/(1000×100)=135 kN. Its sign requires the actual released shape and load directions.

**What the result means.** A table of unsigned area magnitudes cannot determine reaction directions on its own. Label the signed lobes before calculating.

### 2. Make every force meet its own movement

With signed global forces and movements, total external virtual work is zero. Solve the one unknown reaction from that balance. For translation releases, prototype displacement scales by S; rotation does not acquire a length-scale factor.

**The relationship**

```text
H uA + Σ(Fx u+Fy v+Cθ)+∫(qx u+qy v)dx=0
```

Use prototype translations in m, forces in kN, couples in kN·m and rotations in radians. Every term then has kN·m units.

**When it applies.** Small-displacement linear frame with geometrically compatible release shapes and matching relative stiffness. Below, global +x is right, +y is up and positive couple/rotation is counterclockwise unless specified.

**Put it to work.** Authored release lab: S20, uA,m=10 mm right; downward Fy=−30 kN at vm=+4 mm up; applied C=+8 kN·m has θ=+0.05 rad.

uA,p=0.2 m; vp=0.08 m. Work:0.2H−30×0.08+8×0.05=0. Thus0.2H−2=0 and H=+10 kN right.

**What the result means.** The couple reduces the required positive H in this experiment. Dropping its rotation term would give12 kN and be wrong.

### 3. Normalize a moment with radians

Geometric length scaling changes translations but leaves corresponding rotations unchanged. Convert degrees to radians before using moment times rotation as work.

**The relationship**

```text
M=−[ΣF·δp+ΣCθ+∫q·δp dx]/θA
```

θA is the imposed signed release rotation. For a point-force term, δp=Sδm/1000 m when δm is mm. For a distributed-load term, displacement area scales as S².

**When it applies.** Small-displacement linear frame with geometrically compatible release shapes and matching relative stiffness. Below, global +x is right, +y is up and positive couple/rotation is counterclockwise unless specified.

**Put it to work.** Authored lab: rotationθA=+0.02 rad, S20, downward P20 kN where measured upward vm=+3 mm. No other load work.

vp=20×3/1000=0.06 m. Equation0.02M−20×0.06=0 gives M=+60 kN·m.

**What the result means.** A rotation denominator produces a moment. A translation denominator would produce force, exposing a dimensional error immediately.

### 4. Turn inclined readings into matching directions

Work is invariant under an orthogonal coordinate rotation. A load specified per horizontal metre also needs conversion before treating it as per member metre; identify the original intensity definition.

**The relationship**

```text
u∥=c ux+s uy; u⊥=−s ux+c uy; F·u=F∥u∥+F⊥u⊥
```

c=Δx/L and s=Δy/L. Positive local transverse direction is (−s,c). L is actual member length.

**When it applies.** Small-displacement linear frame with geometrically compatible release shapes and matching relative stiffness. Below, global +x is right, +y is up and positive couple/rotation is counterclockwise unless specified.

**Put it to work.** Authored3–4–5 member rising right: c0.6,s0.8; global displacement ux10 mm,uy0.

u∥=0.6×10=6 mm; u⊥=−0.8×10=−8 mm. Magnitude√(6²+8²)=10 mm.

**What the result means.** A model omitting axial strain still needs kinematically compatible joint motions. Do not invent independent member slips to make a convenient shape.

### 5. Use the model where statics runs out

Global equilibrium does not replace joint equilibrium. Member end moments must also agree with measured reaction lever arms, applied distributed loads and connection restraints.

**The relationship**

```text
ΣFx=0; ΣFy=0; ΣMO=0; ΣMjoint=0
```

Global equations constrain the full frame; joint equations constrain each connection. Count unknowns after each measured action.

**When it applies.** Small-displacement linear frame with geometrically compatible release shapes and matching relative stiffness. Below, global +x is right, +y is up and positive couple/rotation is counterclockwise unless specified.

**Put it to work.** Authored force-balance lab, not a complete source-frame solution: total downward load300 kN; measured vertical reactions are−15.48 and+135 kN at two supports.

Third vertical reaction=300−(−15.48)−135=+180.48 kN. This balances vertical force, but coordinates and remaining actions are still needed for the moment check.

**What the result means.** A negative support reaction is a direction result. Verify whether the real support can resist uplift before accepting the elastic model.

### 6. Test work from more than one direction

A moment-release measurement needs especially careful angle units. A table without directions or sufficient independent releases cannot support a unique full-frame answer. Record the missing information instead of guessing.

**The relationship**

```text
normalized result = load work / release movement
```

The denominator is translation for a force and radians for a moment. In signed equilibrium use the negative of the known external-work sum.

**When it applies.** Small-displacement linear frame with geometrically compatible release shapes and matching relative stiffness. Below, global +x is right, +y is up and positive couple/rotation is counterclockwise unless specified.

**Put it to work.** Authored angle audit: an analyst divides by0.5 instead of0.5π/180 for a half-degree release.

The denominator is57.2958 times too large, so the reported moment is57.2958 times too small. Correct by multiplying that result by180/π.

**What the result means.** A dimensional and magnitude check can catch an error before detailed algebra. Preserve unrounded readings until the final reported result.

## Before you solve independently

- Conjugate frame releases
- Signed vector work
- Rotation-release normalization
- Local and global directions
- Recover remaining actions
- Independent checks and uncertainty

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.