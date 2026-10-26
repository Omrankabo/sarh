A sloping roof member does not know which direction the page calls horizontal. It responds to movement along its own length and perpendicular to it. Imagine sliding the roof ridge: part of that movement may stretch a rafter and part may bend it. This is why a horizontal-frame shortcut can fail on a gable.

Write joint coordinates, find the actual member length, then construct a unit tangent and a unit normal. Project relative joint motion onto those directions. Under an inextensible-member assumption the tangential relative motion must vanish; this constrains the ridge's vertical movement as well as its horizontal movement. Bending uses the transverse relative movement divided by the actual length, with its sign retained.

Resolve a load in the same local axes, and be explicit whether a distributed load is quoted per sloping length or per horizontal projection. Build compatible joint movements, apply the member equations, then rotate forces back into global axes for equilibrium checks. The 3–4–5 member example gives coordinates you can sketch and test before handling a complete roof.

## Follow the whole solution

### 1. First find the member you actually have

Write coordinates before displacement triangles. The unit tangent e points along the member. The unit normal n is obtained by turning e counterclockwise by 90°. This removes ambiguity over which angle is measured from the vertical.

**The relationship**

```text
L=√(dx²+dy²); e=(dx/L,dy/L); n=(−dy/L,dx/L)
```

dx,dy,L in m; e and n dimensionless. Bending stiffness uses the actual L.

**When it applies.** Linear elastic bending and small rotations; neglected member axial strain. Global x is right, y is up; positive end couples and section rotations are clockwise. Each local axis points i→j. All numerical dimensions in this journey are explicitly authored training variants unless stated otherwise.

**Put it to work.** Authored member A(0,0)→B(3,4), EI=10000 kN·m².

L=5 m; e=(0.6,0.8); n=(−0.8,0.6). Held-far-end rotational stiffness=4EI/L=8000 kN·m/rad.

**What the result means.** Using L=4 would overestimate rotational stiffness by 25%. Geometry errors propagate even when the algebra is perfect.

### 2. A sideways joint can also move vertically

Compatibility constrains the tangential component of relative displacement to zero. The transverse component then determines the chord rotation. Because clockwise is positive, take the negative of the counterclockwise geometric slope change.

**The relationship**

```text
e·(uj−ui)=0; ψCW=−n·(uj−ui)/L
```

u=(ux,uy) in m; e,n dimensionless; ψCW in radians. This projection formula replaces any memorized Δ/L shortcut.

**When it applies.** Linear elastic bending and small rotations; neglected member axial strain. Global x is right, y is up; positive end couples and section rotations are clockwise. Each local axis points i→j. All numerical dimensions in this journey are explicitly authored training variants unless stated otherwise.

**Put it to work.** A is fixed; uBx=0.004 m for the authored 3–4–5 member.

0.6(0.004)+0.8uBy=0 gives uBy=−0.003 m. n·uB=−0.8(0.004)+0.6(−0.003)=−0.005 m, so ψCW=+0.001 rad.

**What the result means.** The actual transverse movement is 5 mm, larger than the horizontal 4 mm. Its effect cannot be obtained by blindly dividing 4 mm by 5 m.

### 3. Bending sees the transverse part of a load

Project a global line-load vector defined per actual member length. If instead it is given per horizontal metre, first multiply by the horizontal-to-actual length ratio. Do not assume the source sketch’s w convention applies to every new problem.

**The relationship**

```text
q⊥=qglobal·n; |F|=|q⊥|L²/12 for a full-span uniform transverse load
```

qglobal is kN/m of actual length; n=(−0.8,0.6). The pair of signed end moments follows the chosen local load sense.

**When it applies.** Linear elastic bending and small rotations; neglected member axial strain. Global x is right, y is up; positive end couples and section rotations are clockwise. Each local axis points i→j. All numerical dimensions in this journey are explicitly authored training variants unless stated otherwise.

**Put it to work.** Authored uniform vertical qglobal=(0,−10) kN/m on the 5 m member.

q⊥=(0,−10)·(−0.8,0.6)=−6 kN/m. Fixed-end magnitude=6·25/12=12.5 kN·m. If 10 kN/m is per horizontal metre instead, q⊥=−3.6 and magnitude=7.5.

**What the result means.** Different load bases describe different physical total loads. They cannot share a fixed-end-moment answer merely because both labels say kN/m.

### 4. The roof ridge must fit both rafters

Let the left roof rise at angle α, the right roof fall at angle β. With vertical eave movements zero, let eave horizontal movements be u1 and u2. Solve two dot-product compatibility equations for ridge uC and vC. This is an algebraic version of the lecture displacement triangle.

**The relationship**

```text
vC=(u1−u2)/(tanα+tanβ); uC=(u1tanβ+u2tanα)/(tanα+tanβ)
```

All u,v in m; α,β measured from horizontal. This formula assumes inextensible roof members and fixed eave elevations.

**When it applies.** Linear elastic bending and small rotations; neglected member axial strain. Global x is right, y is up; positive end couples and section rotations are clockwise. Each local axis points i→j. All numerical dimensions in this journey are explicitly authored training variants unless stated otherwise.

**Put it to work.** Authored symmetric roof: tanα=tanβ=0.75, each rafter length 5 m; u1=6 mm, u2=2 mm.

vC=(6−2)/1.5=2.666667 mm upward; uC=(6·0.75+2·0.75)/1.5=4 mm right. The ridge neither stays at the same elevation nor follows one eave alone.

**What the result means.** Do not borrow a five-unknown count for every roof. Recount if there are axial strains, different support restraints or hinges.

### 5. Turn compatible geometry into moments

Compute each local normal and project the relative endpoint displacement. Insert the resulting signed ψ into the two slope-deflection expressions for that member. Then write three joint moment equations and two independent translation-equilibrium equations for the five freedoms.

**The relationship**

```text
Mij=Fij+(2EI/L)(2θi+θj−3ψij)
```

θ and ψ are clockwise radians; EI in kN·m² and L in m. Translational equations can come from carefully chosen free bodies or virtual work with compatible unit displacement patterns.

**When it applies.** Linear elastic bending and small rotations; neglected member axial strain. Global x is right, y is up; positive end couples and section rotations are clockwise. Each local axis points i→j. All numerical dimensions in this journey are explicitly authored training variants unless stated otherwise.

**Put it to work.** Continue the authored roof: left e=(0.8,0.6), right e=(0.8,−0.6). Use the previous ridge movement.

Left normal displacement=(−0.6,0.8)·(−2,2.666667)=3.333333 mm, so ψBC=−0.000666667 rad. Right normal displacement=(0.6,0.8)·(−2,−2.666667)=−3.333333 mm, so ψCD=+0.000666667 rad.

**What the result means.** Equal magnitudes here follow the explicitly symmetric authored geometry. The method still works for unequal slopes and rigidities.

### 6. Return local answers to the whole structure

The source explicitly includes an additional force lever arm for its inclined leg. Audit your complete free body instead of using a vertical-column shear formula outside its geometry. A compatibility residual e·(uj−ui) also exposes a bad displacement triangle.

**The relationship**

```text
Fglobal=N e+V n; e·(uj−ui)=0; ΣFx=ΣFy=ΣM=0
```

N is local axial force; V is local transverse force; their signs must be defined on a chosen member free body.

**When it applies.** Linear elastic bending and small rotations; neglected member axial strain. Global x is right, y is up; positive end couples and section rotations are clockwise. Each local axis points i→j. All numerical dimensions in this journey are explicitly authored training variants unless stated otherwise.

**Put it to work.** Authored transformation: e=(0.6,0.8), n=(−0.8,0.6), N=10 kN and V=5 kN on the chosen face.

Fx=10·0.6+5(−0.8)=2 kN; Fy=10·0.8+5·0.6=11 kN. Magnitude √(2²+11²)=√(10²+5²), as rotation preserves force magnitude.

**What the result means.** The lecture’s general gable figures are symbolic, not a numerical test case. These authored projection examples verify the method without inventing source dimensions.

## Before you solve independently

- Real length and local axes
- Axial compatibility and projected movement
- Project loads before fixed-end moments
- Gable-roof freedoms and compatibility
- Equations for coupled inclined members
- Geometry and global force audits

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.