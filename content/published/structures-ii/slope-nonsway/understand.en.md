Picture a rigid rectangular doorway whose top corners can turn but whose top is held against sideways drift. A load on its beam tries to bend it. The columns resist the corner rotations, so the beam cannot be solved as though it were alone. The purpose of this journey is to find how that resistance is shared.

A rigid connection means the connected members share the joint rotation; it does not mean that the joint has zero rotation. A fixed support has zero prescribed rotation unless the support itself is rotated. A genuine end hinge has zero moment. First decide which of those statements applies at every end. “Non-sway” must come from a real restraint or a justified symmetry argument, not from drawing the frame upright.

Freeze the unknown rotations, calculate fixed-end moments from transverse loading, then allow each joint to turn by an unknown amount. Every connected member contributes its load term and its rotational stiffness term. One independent moment-balance equation per free rotational joint supplies the rotations. Recover shear, axial forces and support actions through member free bodies, and check the entire frame. The following explanation develops that sequence using the lecture frame and its overhang actions.

## Follow the whole solution

### 1. The frame is a connected set of bending springs

The source frame has AB=4 m, BC=6 m, CD=2 m, BF=CE=3 m. A and F are pins, E is fixed, D is a free overhang tip. B and C are rigid joints. A roller under an intermediate continuous beam is not an internal hinge.

**The relationship**

```text
q = [θA, θB, θC, θF]; θE = 0; Δ = 0
```

θ is a cross-section rotation in radians; Δ is horizontal story translation in m. End-hinge rotations can later be eliminated.

**When it applies.** Small deflections; linear elastic prismatic members; neglect axial deformation. Clockwise member-end couples and rotations are positive. State each member direction before assigning its chord rotation.

**Put it to work.** First draw only the allowed movements before drawing any moment arrow.

There are four rotation unknowns before condensation and two after eliminating θA and θF. No extra equation for Δ is needed.

**What the result means.** Choosing freedoms correctly determines the size and meaning of the entire solution.

### 2. Freeze rotations to measure the load’s first push

Use signed fixed-end moments Fij for the initially locked member. AB and BC carry 12 kN/m. The 40 kN horizontal point load acts at mid-height of CE. The overhang load is handled separately by statics.

**The relationship**

```text
Fij = −wL²/12 − Pab²/L²; Fji = +wL²/12 + Pa²b/L²
```

w: kN/m; P: kN; a: distance from i; b=L−a; F: kN·m. Choose the transverse load sense in each member’s local sketch.

**When it applies.** Small deflections; linear elastic prismatic members; neglect axial deformation. Clockwise member-end couples and rotations are positive. State each member direction before assigning its chord rotation.

**Put it to work.** For BC use L=6, w=12, P=36, a=4, b=2.

FBC=−36−16=−52; FCB=36+32=+68 kN·m. FAB=−16 and FBA=+16. For CE, FCE=−15 and FEC=+15 in the source orientation.

**What the result means.** Fixed-end moments are the load contribution, not the final answer: unlocking the rigid joints redistributes them.

### 3. Rotation creates a measurable restoring moment

Member stiffness is not an arbitrary table number. Bending a shorter or more rigid member through the same angle requires more moment. The fixed-end load term remains when all rotations are zero.

**The relationship**

```text
Mij = Fij + (2EI/L)(2θi + θj); Mji = Fji + (2EI/L)(θi + 2θj)
```

M and F: kN·m; EI: kN·m²; L: m; θ: rad. For the lecture let x=EI₀θB and y=EI₀θC, where EI₀ is the reference rigidity.

**When it applies.** Small deflections; linear elastic prismatic members; neglect axial deformation. Clockwise member-end couples and rotations are positive. State each member direction before assigning its chord rotation.

**Put it to work.** BC has rigidity 2EI₀ and length 6 m. CE has 1.5EI₀ and length 3 m with fixed E.

MBC=−52+(2/3)(2x+y); MCB=68+(2/3)(x+2y). MCE=−15+2y and MEC=15+y.

**What the result means.** The fixed support E has zero rotation, yet its reaction couple MEC need not be zero.

### 4. Remove only real hinge freedoms

Eliminate θfar from Mfar=0, rather than pretending θfar=0. A 6 kN load at D, 2 m beyond C, gives MCD=−12 kN·m in the source’s clockwise convention. CD does not acquire a distribution stiffness at C: its free tip cannot restrain rotation.

**The relationship**

```text
Mnear = Fnear − ½Ffar + (3EI/L)θnear; Mfar=0
```

The released member stiffness is 3EI/L, not 4EI/L. The load term must change along with stiffness.

**When it applies.** Small deflections; linear elastic prismatic members; neglect axial deformation. Clockwise member-end couples and rotations are positive. State each member direction before assigning its chord rotation.

**Put it to work.** Condense A in AB and F in BF.

MBA=16−½(−16)+(3·2/4)x=24+1.5x. MBF=(3·1/3)x=x. MFB=MAB=0. MCD=−6·2=−12.

**What the result means.** A real end hinge softens the member; an intermediate roller under a continuous beam does not automatically release the member’s internal bending moment.

### 5. Ask the connected members to agree

At B: MBA+MBC+MBF=0. At C: MCB+MCE+MCD=0. Use the condensed equations to solve only x and y.

**The relationship**

```text
23x + 4y = 168; 2x + 10y = −123
```

x=EI₀θB and y=EI₀θC carry the reference-rigidity scaling; divide by the actual EI₀ to obtain radians.

**When it applies.** Small deflections; linear elastic prismatic members; neglect axial deformation. Clockwise member-end couples and rotations are positive. State each member direction before assigning its chord rotation.

**Put it to work.** Eliminate x or solve the two-equation system.

x=9.783783784; y=−14.256756757. Then EI₀θA=(16−x)/2=3.108108108 and EI₀θF=−x/2=−4.891891892.

**What the result means.** Opposite rotation signs at B and C describe the bending shape; they are not a reason to discard a solution.

### 6. Read the shape and audit the forces

Draw one free-body diagram for each member. Add the known transverse loads and the end couples, then solve forces from equilibrium. Convert member-end couple signs to a consistent internal bending-diagram convention; do not plot every clockwise value directly as sagging.

**The relationship**

```text
ΣMB=0; ΣMC=0; ΣFx=0; ΣFy=0; ΣM=0
```

A joint residual tests local moment balance. Whole-frame force and moment sums test reactions. Member load–shear–moment relations test diagrams.

**When it applies.** Small deflections; linear elastic prismatic members; neglect axial deformation. Clockwise member-end couples and rotations are positive. State each member direction before assigning its chord rotation.

**Put it to work.** Recheck the two rigid corners and the two released ends.

At B: 38.675676−48.459459+9.783784≈0. At C: 55.513514−43.513514−12≈0. MAB=MFB=0 exactly before rounding.

**What the result means.** The small positive EC value is real in this idealized calculation. Rounding the rotations early can hide it or reverse its sign.

## Before you solve independently

- Restraints and independent rotations
- Fixed-end load moments
- Member equations and physical stiffness
- True hinges and the overhang
- Joint equilibrium and elimination
- End moments, reactions and verification

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.