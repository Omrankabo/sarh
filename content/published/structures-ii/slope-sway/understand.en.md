Imagine pushing a doorway sideways: its roof translates while both columns bend. A vertical load placed off centre can also produce sideways movement in an unbraced frame. Joint rotations describe the turning of corners, but cannot describe this translation on their own.

Add the sideways displacement as another independent unknown. The chord of each column rotates when the top moves relative to its base. That chord rotation changes the end moments even if the joint rotations were held fixed. Start with the restrained movements the supports actually allow, not an assumption that every column has the same Δ/L when heights or orientations differ.

Moment balance at the corners closes the rotational questions. Horizontal equilibrium or an equivalent storey-shear equation closes the translation question. Solve them together; do not tune the drift until the drawing looks plausible. Interpret the answer through drift direction, paired column shears and global force balance. The eccentric 72 kN example below gives a concrete load for this reasoning.

## Follow the whole solution

### 1. Let the whole top move

Count motions before equations: θB, θC and Δ. There are two rigid-joint moment balances, so a third independent equilibrium equation is required.

**The relationship**

```text
q = [θB, θC, Δ]; θA=θD=0
```

θ: radians; Δ: m. A rigid joint shares one rotation; the beam’s axial compatibility ties the two horizontal translations.

**When it applies.** Linear elastic, small movements; prismatic members; constant EI; ignore axial strain. Clockwise end couples and section rotations are positive. Positive Δ is the source figure’s rightward drift.

**Put it to work.** The source portal has AB=CD=3 m, BC=6 m and fixed A,D. A downward 72 kN load is 2 m from B and 4 m from C.

The unknown count is 3, not 2 or 4. ΔB=ΔC=Δ while the fixed-base rotations are known zeros.

**What the result means.** A load need not be horizontal to excite an allowed horizontal motion.

### 2. Separate turning from drifting

A formula containing only θ cannot represent imposed translation. Include the chord term −3ψ in both end expressions. For a column of height h with rightward drift use the local orientation shown in the source.

**The relationship**

```text
Mij=Fij+(2EI/L)(2θi+θj−3ψ); ψ=Δ⊥/L
```

Δ⊥ is transverse relative endpoint translation in the member’s signed local direction; ψ is radians. For the portal’s columns ψ=Δ/3 in the source equations.

**When it applies.** Linear elastic, small movements; prismatic members; constant EI; ignore axial strain. Clockwise end couples and section rotations are positive. Positive Δ is the source figure’s rightward drift.

**Put it to work.** Authored scale check: EI=9000 kN·m², h=3 m, Δ=0.006 m and both rotations fixed.

ψ=0.006/3=0.002 rad. M=−6EIΔ/h²=−36 kN·m at each held end under this convention.

**What the result means.** Drift is a length; chord rotation is an angle. Substituting millimetres into a metre-based equation creates a thousandfold error.

### 3. An eccentric vertical load asks an asymmetric question

The beam load has a=2 m, b=4 m. Keep the sign convention consistent between load moments and rotation moments; do not import unsigned magnitudes into a signed equation.

**The relationship**

```text
FBC=−Pab²/L²; FCB=+Pa²b/L²
```

P=72 kN; L=6 m; a=2 m; b=4 m. The unloaded columns have zero fixed-load moments.

**When it applies.** Linear elastic, small movements; prismatic members; constant EI; ignore axial strain. Clockwise end couples and section rotations are positive. Positive Δ is the source figure’s rightward drift.

**Put it to work.** Calculate the two beam fixed-end moments before solving any freedoms.

FBC=−72·2·4²/6²=−64 kN·m; FCB=72·2²·4/6²=+32 kN·m.

**What the result means.** The unequal values anticipate an asymmetric rotation field, but the sign of sway must come from the complete equilibrium solution.

### 4. Add the equation the two corners cannot supply

For this unloaded-column portal, use HA=(MAB+MBA)/3 and HD=(MCD+MDC)/3 with the source’s signed reaction convention. There is no applied horizontal load, so HA+HD=0.

**The relationship**

```text
MBA+MBC=0; MCB+MCD=0; (MAB+MBA)/3+(MCD+MDC)/3=0
```

Let x=EIθB, y=EIθC and z=EIΔ. Then MAB=(2/3)(x−z), MBA=(2/3)(2x−z), MBC=(2x+y)/3−64, MCB=(x+2y)/3+32, MCD=(2/3)(2y−z), MDC=(2/3)(y−z).

**When it applies.** Linear elastic, small movements; prismatic members; constant EI; ignore axial strain. Clockwise end couples and section rotations are positive. Positive Δ is the source figure’s rightward drift.

**Put it to work.** Substitute these six end moments into the three equilibrium equations.

2x+y/3−2z/3=64; x/3+2y−2z/3=−32; 2x+2y−8z/3=0.

**What the result means.** The third equation is a force-equilibrium condition after substitution. It is not another arbitrary rotation constraint.

### 5. Solve rotations and drift together

Solve the three linear equations without imposing a guessed symmetry. The source supplies the equations; the following values are independently calculated, rather than read from a rounded distribution table.

**The relationship**

```text
x=40.8; y=−16.8; z=18; θB=x/EI; θC=y/EI; Δ=z/EI
```

Use EI in kN·m² to obtain θ in radians and Δ in m. Here x has units kN·m² and z has units kN·m³.

**When it applies.** Linear elastic, small movements; prismatic members; constant EI; ignore axial strain. Clockwise end couples and section rotations are positive. Positive Δ is the source figure’s rightward drift.

**Put it to work.** For an authored scale choice EI=18000 kN·m², interpret the movements.

θB=0.002266667 rad; θC=−0.000933333 rad; Δ=0.001 m=1 mm. End moments [AB,BA,BC,CB,CD,DC]=[15.2,42.4,−42.4,34.4,−34.4,−23.2] kN·m.

**What the result means.** The frame drifts right even without an external horizontal load. Its horizontal reactions form a balanced internal restraint system.

### 6. Make the whole frame pass a force audit

At BC, an explicit free-body gives VC=[P·a+MBC+MCB]/L and VB=P−VC. These upward forces are the vertical support reactions when column axial loading has no other vertical contribution.

**The relationship**

```text
HA=+19.2; HD=−19.2; VA=49.333333; VD=22.666667 kN
```

All listed reactions use global right/up positive, with end-moment signs from the stated clockwise member convention.

**When it applies.** Linear elastic, small movements; prismatic members; constant EI; ignore axial strain. Clockwise end couples and section rotations are positive. Positive Δ is the source figure’s rightward drift.

**Put it to work.** Use the solved moments to verify the horizontal and vertical sums.

HA=(15.2+42.4)/3=19.2; HD=(−34.4−23.2)/3=−19.2. VC=(72·2−42.4+34.4)/6=22.666667; VB=72−VC=49.333333.

**What the result means.** A wrong sway sign often survives one equation but fails several independent checks. Keep a short residual audit in every final solution.

## Before you solve independently

- The independent sway freedom
- Chord rotation versus section rotation
- Eccentric loads can cause sway
- Joint and horizontal equilibrium
- Solve the three freedoms together
- Drift and reaction checks

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.