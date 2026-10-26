Stand at one section of a bridge and watch a single wheel cross it. Your question stays fixed—perhaps the moment at that section—while the load position changes. An influence line plots that one response against load position. A bending-moment diagram instead plots many sections for one fixed loading arrangement.

To see the influence-line shape, release the restraint that corresponds to the response you want and impose its positive conjugate movement. A support reaction pairs with a translation; an internal moment pairs with a relative rotation; an internal shear pairs with a relative transverse slip. Releasing the wrong action produces the wrong question even if the sketch looks smooth.

Reciprocity and virtual work explain why this released shape carries information about the moving-load response. Normalize the movement correctly before using numerical ordinates. Indeterminate structures generally have curved influence lines, and a shear line has a jump at the observed section. Read signs and what is held fixed before assigning any load.

## Follow the whole solution

### 1. Follow a truck, keep one question

A bending-moment diagram varies the section under fixed loading. An influence line varies load position for one fixed response. Never exchange these horizontal-axis meanings.

**The relationship**

```text
E(x)=P ηE(x)
```

E is the selected effect; P is a concentrated load; ηE is its influence ordinate. Reaction/shear ordinates are dimensionless; bending-moment ordinates have length units.

**When it applies.** Linear elastic response, small displacements, unchanged supports and a stable released system. Use the same positive directions in loads and movements.

**Put it to work.** Authored warm-up: ηRA=0.7 at a chosen position, with a 20 kN downward load.

RA=20×0.7=14 kN upward under the stated positive convention.

**What the result means.** A negative ordinate means the selected effect reverses its defined direction; it is not a negative load location.

### 2. Swap the load and the observer

Maxwell concerns matching load–movement directions. It does not say that every location has equal deflection. A vertical force pairs with vertical displacement; a couple pairs with rotation.

**The relationship**

```text
f12=f21; δ2←1=P f21
```

fij is movement at i from a unit action at j. For translation/force it has units m/kN. Reciprocity requires the same structural stiffness and boundary conditions.

**When it applies.** Linear elastic response, small displacements, unchanged supports and a stable released system. Use the same positive directions in loads and movements.

**Put it to work.** Authored check: 5 kN at 1 moves point 2 by 2 mm. Apply the same 5 kN at 2.

Point 1 moves 2 mm. The cross-flexibility is 2/5=0.4 mm/kN.

**What the result means.** If the second experiment changes a support or cracks the beam, it is no longer the same reciprocal experiment.

### 3. Compare two complete loading stories

Betti generalizes the two-point swap. Couples and rotations belong in the sum too. This is mutual work, not the strain energy of one gradually applied system; no extra factor 1/2 is inserted.

**The relationship**

```text
ΣPi ui(Q)+ΣMi θi(Q)=ΣQi ui(P)+ΣCi θi(P)
```

Each term has work units, for example kN·m. Rotations must be radians; include algebraic signs and matching directions.

**When it applies.** Linear elastic response, small displacements, unchanged supports and a stable released system. Use the same positive directions in loads and movements.

**Put it to work.** Authored two-system example: P=10 kN acts where Q causes +3 mm; Q=5 kN acts where P causes an unknown displacement.

10×3=5×u gives u=6 mm. Both sides are 30 kN·mm.

**What the result means.** The equation is a route from measured model displacements to unknown prototype forces later in the course.

### 4. Lift exactly the support you want to measure

Müller–Breslau converts the wanted action into its work-conjugate movement. A lift of 2 mm does not give unit ordinates until every measured displacement is divided by 2 mm.

**The relationship**

```text
ηRB(x)=y(x)/yB
```

y(x) is signed displacement of the released structure; yB is the imposed support displacement. The ratio is dimensionless.

**When it applies.** Linear elastic response, small displacements, unchanged supports and a stable released system. Use the same positive directions in loads and movements.

**Put it to work.** Authored normalization: lift B by +2 mm; point x moves −0.6 mm.

ηRB=−0.6/2=−0.3. A 50 kN load there contributes −15 kN to upward RB.

**What the result means.** Negative lobes are meaningful. Other supports may hold the beam down while this support tends toward uplift. Contact-only supports need a separate uplift check.

### 5. Let the two sides slide, not separate by a hinge

A pin removes bending resistance; it is not a shear release. For a standard positive left-segment shear V=RA minus loads to the left of the cut, a downward unit load crossing left-to-right gives a +1 jump.

**The relationship**

```text
ηV(x)=ηRA(x)−H(s−x)
```

s is the fixed cut location; H(s−x)=1 when the unit load lies left of the cut and 0 to its right. Endpoints are evaluated with left/right limits.

**When it applies.** Linear elastic response, small displacements, unchanged supports and a stable released system. Use the same positive directions in loads and movements.

**Put it to work.** Authored simple beam: L=10 m, cut s=4 m. Reaction ordinate at the cut is 0.6.

ηV(s−)=0.6−1=−0.4; ηV(s+)=0.6. Jump=+1.

**What the result means.** A jump is not a broken calculation. It represents the load changing which free-body segment contains it.

### 6. Open a hinge and control the relative angle

Normalize by the difference between the two end rotations, not one arbitrary tangent angle. With rotation measured in radians, displacement divided by relative rotation has length units.

**The relationship**

```text
ηM(x)=y(x)/Δθ; M=ΣPηM
```

Δθ is signed relative hinge rotation in radians. ηM is in m when y is in m. Orient Δθ so the released displacement does positive work against the chosen moment.

**When it applies.** Linear elastic response, small displacements, unchanged supports and a stable released system. Use the same positive directions in loads and movements.

**Put it to work.** Authored example: Δθ=0.02 rad; the signed displacement at the load is 0.04 m.

ηM=0.04/0.02=2 m; a 30 kN load contributes +60 kN·m.

**What the result means.** Moment lines are continuous at the section, typically with a change of tangent. Draw a slope change, not the vertical jump used for shear.

## Before you solve independently

- One effect, moving load
- Maxwell reciprocity
- Betti reciprocal work
- Release a reaction
- Release shear
- Release moment

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.