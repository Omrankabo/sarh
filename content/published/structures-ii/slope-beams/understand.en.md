Imagine a long ruler resting on two books. Press down and it bends. Slide a third book underneath the middle. The ruler now touches another support, and its shape and the shares of load change together. That extra support is the whole reason this topic exists: equilibrium tells us what balances, while compatibility tells us which balanced answer the actual beam can adopt.

A continuous beam passes over a support without being cut into separate pieces. The support may stop vertical movement while allowing the beam to rotate. The material on both sides of that joint still has to meet with one common direction. A roller is therefore not automatically an internal hinge. A real hinge releases the transmitted bending moment; a roller under an unbroken beam does not.

Before calculating, sketch where the beam sags between supports and where continuity may create hogging over a support. The calculation will test and refine that prediction. Our outputs are end moments, support reactions and shear/bending diagrams. The unknown joint rotations are the means of finding those outputs.

Hold a member's ends against rotation: loading produces fixed-end moments. Let the ends rotate or move relative to each other: additional moments are needed to make the member fit those movements. Slope-deflection adds those effects. For a prismatic member, using the course's clockwise-positive member-end convention:

$$
M_{ij}=M^F_{ij}+\frac{2EI}{L}(2\theta_i+\theta_j-3\psi),\qquad
M_{ji}=M^F_{ji}+\frac{2EI}{L}(\theta_i+2\theta_j-3\psi).
$$

Here $M$ is an end moment in kN·m, $M^F$ is its fully restrained loading contribution, $E$ is elastic modulus in kN/m², $I$ is second moment of area in m⁴, and $L$ is member length in m. The joint rotations $\theta$ and signed chord rotation $\psi$ are in radians; a radian is dimensionless, so $(EI/L)\theta$ has moment units. Define $\psi$ from the actual relative end movement and the same clockwise convention; do not insert an unsigned settlement magnitude.

The factor 2 on the near-end rotation says that turning this end has twice the local end-moment effect of the same far-end rotation under these member assumptions. Doubling EI doubles the moment needed for an imposed rotation; doubling L halves that rotational stiffness. Those comparisons hold for prescribed rotations. Under fixed loads, the rotations themselves also change, so do not assume doubling EI doubles every final force.

For a member whose far end is held, a small imposed rotation gives $M=4EI\theta/L$. With EI = 12,000 kN·m², L = 6 m and clockwise rotation 0.001 rad, the required near-end moment is 8 kN·m and the far-end moment contribution is 4 kN·m. This is a stiffness demonstration, not yet the answer for an entire loaded beam. A released far-end hinge changes the stiffness to 3EI/L and its moment must be zero.

Now reconnect the spans. At an unloaded joint B, the signed member-end moments acting on that joint must sum to zero. Solve that balance for its shared rotation, then put the rotation back into both member equations. Finally take each span as a free body to find reactions. Check the whole beam's force and moment balance and all actual boundary conditions. End couples in the member convention must be translated consistently into the sagging-positive bending diagram.

This model assumes small deformations, linear elasticity and a prismatic Euler–Bernoulli member with constant EI within the member. Include settlement, imposed support rotation and overhang actions explicitly. If these assumptions no longer describe the structure, change the model before trusting the arithmetic.

## Follow the whole solution

### 1. One more support. One new condition.

Imagine a long ruler resting on two books. It sags when you press it. Slide a third book underneath its middle: that book changes the shape and starts carrying load.
Force balance still matters. But several reaction sets can balance the same load. The right set must also put the beam through the middle support. That requirement is compatibility: the pieces and supports must fit.

**The relationship**

```text
Equilibrium + compatibility + elastic response → one consistent solution
```

Equilibrium balances forces and couples. Compatibility enforces support positions and shared movements. Elastic response relates force and movement.

**When it applies.** Stable planar beam, small displacements and linear elasticity. A terminal pin plus two rollers gives four reaction components and three rigid-body equilibrium equations.

**Put it to work.** How many additional independent compatibility conditions does that one redundant reaction need?

One new independent redundant reaction requires one independent compatibility condition.

**What the result means.** The extra support does not just share the weight. It changes the bending shape and therefore the forces throughout the beam.

### 2. A support holds a point. A connection carries the bend.

Hold a ruler down at one point with your fingertip: its height is fixed there, but the ruler can still tilt. A roller does a similar job in its reaction direction.
An internal hinge is a change inside the beam. It lets the two pieces turn relative to each other. An unbroken joint instead shares one rotation.

**The relationship**

```text
M_BA + M_BC = 0; θ_B(AB) = θ_B(BC)
```

M_BA and M_BC are moments applied to the members at B, in kN·m, positive clockwise. With no external joint couple their sum is zero.

**When it applies.** A rigid unbroken joint without an applied couple. A loaded overhang is a different boundary case from an unloaded terminal pin.

**Put it to work.** At an unbroken B, M_BA = +45 kN·m and M_BC = −45 kN·m. Calculate their sum.

The moments sum to zero at the joint even though the beam carries a nonzero internal moment there.

**What the result means.** The support can provide zero external reaction couple while the continuous beam has a nonzero internal bending moment above it.

### 3. How much moment buys one small rotation?

Keep the far end of a ruler from rotating. Turn the near end through a small angle. A short, deep or stiff ruler resists more strongly.
E is material stiffness. I measures the cross-section’s resistance to bending about the chosen axis. L is member length. Their combination controls rotational stiffness.

**The relationship**

```text
M_ij = (4EI/L)θ_i; M_ji = (2EI/L)θ_i
True far hinge: K_near = 3EI/L; carry-over = 0
```

EI: kN·m²; θ_i: imposed clockwise rotation in radians; L: m. 4EI/L is near rotational stiffness and 2EI/L is the far-end response.

**When it applies.** Prismatic, linear-elastic member; small bending displacement, no member load or chord movement; far rotation held zero. A true far hinge gives 3EI/L and zero carry-over.

**Put it to work.** For EI=80,000 kN·m², L=6 m and imposed θ_i=0.001 rad with far end fixed, calculate both end moments.

EI=80,000 kN·m², L=6 m, θ_i=0.001 rad, far fixed. M_ij=53.333333 and M_ji=26.666667 kN·m.

**What the result means.** Under an imposed angle, increasing EI raises the required moments. Under a prescribed force, increasing EI instead reduces the resulting movement. Keep input and output clear.

### 4. First hold the ends. Then let the joints move.

Imagine clamping both ends of a ruler and pressing down. Your hands must apply end moments to keep the clamps from turning. Those are the fixed-end moments, F.
Now connect that span to the rest of the structure. Its joints may rotate, adding another contribution. Linear behaviour lets us add the contributions without mixing their causes.

**The relationship**

```text
F_ij = −wL²/12; F_ji = +wL²/12
Point load: F_ij = −Pab²/L²; F_ji = +Pa²b/L²; a+b=L
```

w: downward kN/m; L: m; F: kN·m. P: downward point load in kN; a and b: distances from the ends, a+b=L.

**When it applies.** Prismatic beam with both end rotations and chord rotation held zero. Use the formula matching the actual load shape and extent.

**Put it to work.** A downward 12 kN/m UDL acts over 6 m. Calculate the left clockwise fixed-end moment.

−12 × 6²/12 = −36 kN·m. The right clockwise fixed-end moment is +36.

**What the result means.** F is not a guess at the final answer. It is the exact load contribution for the temporarily clamped member under the stated model.

### 5. Make both spans agree about B.

We now use the actual lecture beam: AB is 8 m with rigidity 2EI₀ and a centred 10 kN load. BC is 6 m with rigidity 3EI₀ and a 4 kN/m UDL. A is a pin, B a roller beneath the continuous beam, C fixed.
Unknowns: θ_A, θ_B. Known: θ_C = 0. No support settles, so ψ = 0. Use M_AB = 0 and M_BA + M_BC = 0.

**The relationship**

```text
M_ij = F_ij + (2EI/L)(2θ_i + θ_j − 3ψ)
M_ji = F_ji + (2EI/L)(θ_i + 2θ_j − 3ψ)
X_A + 0.5X_B = 10; 0.5X_A + 3X_B = 2
```

M_ij: clockwise-positive member-end couple in kN·m; F_ij: load-only fixed-end moment. EI: kN·m²; L: m. θ_i,θ_j: clockwise radians. ψ=(d_j−d_i)/L with downward d positive. X=EI₀θ has units kN·m².

**When it applies.** Prismatic linear-elastic bending; small displacements; axial and shear deformation neglected. Share each rigid-joint rotation, and reverse the θ coefficients at the far end.

**Put it to work.** Solve the two equations. Enter X_B.

Substitute X_A = 10 − 0.5X_B: 5 + 2.75X_B = 2, so X_B = −12/11 = −1.090909.

**What the result means.** X_B’s negative sign means the joint rotates counterclockwise under our convention. Substituting it gives member moments [0,+14.18182,−14.18182,+10.90909] kN·m.

### 6. Turn four end moments into a whole beam.

Isolate one span. Include its real loads and both solved end couples. Ordinary equilibrium now gives that span’s reaction contributions. At a shared support, add contributions from both adjacent spans.
For AB, the left upward reaction is (40 − 14.18182)/8 = 3.22727 kN. AB supplies 6.77273 kN at B; BC supplies another 12.54545 kN there. Total R_B = 19.31818 kN.

**The relationship**

```text
M_internal,left = M_ij; M_internal,right = −M_ji
dM/dx = V; dV/dx = −w
```

M: sagging-positive internal moment, kN·m; V: shear, kN; x: m; w: downward load intensity, kN/m. A point load jumps shear; shear gives the moment gradient.

**When it applies.** Use the stated cut-face signs consistently. Isolate each span before adding its contributions at common supports.

**Put it to work.** Use the AB free body to calculate upward R_A.

Take moments on AB: R_A = (10×4 − 14.181818)/8 = 3.227273 kN. Reactions [A,B,C]=[3.227273,19.318182,11.454545] kN. BC: M(s)=−14.181818+12.545455s−2s²; max +5.491736 kN·m at s=3.136364 m. External clockwise support couple C=10.909091 kN·m. Total load34 kN.

**What the result means.** The diagrams tell you where the beam bends most, where bending changes sign, and where shear must jump. They also expose a wrong support model that a single final number might hide.

### 7. The ground can bend an unloaded beam.

Lower only one end while both clamps keep their angles fixed. The ruler must curve to fit. Lower both clamps equally and keep their angles: it simply moves down without bending.
That is why the equation uses a difference in displacement. A support rotating by a given angle is also a prescribed input, replacing the usual θ = 0 at that support.

**The relationship**

```text
ψ = (d_j−d_i)/L
M_settlement,each end = −6EI(d_j−d_i)/L²
M_overhang,support = −wa²/2
```

d: downward displacement in m; ψ: clockwise chord rotation in radians. Equal end settlements eliminate only the direct chord term, not the adjoining-span rotation effects.

**When it applies.** Small movements and constant member EI. In the settlement example both end rotations are held zero. A free overhang support moment follows from the overhang free body.

**Put it to work.** An unloaded 6 m member has EI=80,000 kN·m² and both end rotations held zero. Right settlement is10 mm. Find the left moment.

EI=80,000 kN·m², L=6 m, both rotations zero; Δ=0.010 m. ψ=0.001666667 rad. Both clockwise end moments are −133.333333 kN·m. A 3 m overhang under24 kN/m gives internal support moment −108 kN·m.

**What the result means.** Ask which movement is prescribed before predicting what a stiffness change will do. With imposed movement, increasing EI can increase force effects. With common rigid translation alone, it creates no bending.

### 8. Now carry the whole story yourself.

The lecture gave every step. The tutorial now gives only the setup questions and graduated hints. The test adds settlement and loaded overhangs. Keep the source solution closed until you have an independent attempt. Tutorial geometry: AB=BC=6 m, A pin/B roller/C fixed, 250 kN at2 m fromA, 120 kN midBC. Test geometry: 3 m overhang each side, main spans8,9,8 m, UDL24 kN/m over both full11 m outside regions, two75 kN loads3 and6 m fromB; EI=800 kN·m², B/C settle15 mm.

**The relationship**

```text
Read → model → load effects → shared movements → solve → reactions → check
```

First choose the unknown joint rotations, then calculate FEMs, share movements and enforce joint equilibrium. Each 3 m test overhang fixes an internal −108 kN·m boundary moment.

**When it applies.** Use the constant EI ratio for the tutorial. Its printed I is implausibly small and can violate the small-rotation assumption; it is not silently corrected. Test geometry is on source 23 p.20.

**Put it to work.** Solve the tutorial first, then the test. Check M_BC and upward reactions.

Tutorial: [M_AB,M_BA,M_BC,M_CB]=[0,165.555556,−165.555556,52.222222] kN·m; upward reactions[139.074074,189.814815,41.111111] kN, total370. Test: internal moments A,D=−108, B,C=−145.325581 kN·m; reactions A,D=163.334302, B,C=175.665698 kN, total678. BC moment plateau=+79.674419 kN·m.

**What the result means.** You understand the method when you can explain what each unknown and term does, then solve a changed beam without leaning on a memorized sequence of numbers.

## Before you solve independently

- Support freedoms
- Continuity & joint balance
- Equilibrium + compatibility
- Rotational stiffness
- Fixed-end load effects
- Equations & signs
- Units & radians
- Prescribed movements
- Overhang boundaries
- Solving joint rotations
- Reactions & diagrams
- Checks & linearity

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.