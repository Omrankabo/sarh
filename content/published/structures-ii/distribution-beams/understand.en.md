Two people hold the ends of a flexible strip while a third holds its middle. If the middle grip is released slightly, both sides resist its turn. The shorter or stiffer side takes more of the correcting moment. Moment distribution turns this physical sharing into a sequence of small balances.

Begin with the load-induced fixed-end moments. At a joint, add the signed end moments to find its unbalance, then apply the opposite correction. Share that correction according to each member's rotational stiffness divided by the total stiffness at the joint. Transfer the appropriate part to the far end and balance the next joint. The transfer creates new unbalance, so repeat until the remaining residual is small enough.

A real far hinge changes both stiffness and carry-over: 3EI/L and zero carry-over replace 4EI/L and one-half for a held far end. A roller under continuous material is not that release. Settlement contributes imposed-movement moments before balancing; symmetry is usable only when geometry, loading, stiffness and restraints all support it. A converged table is only the start of the final reaction and diagram checks.

## Follow the whole solution

### 1. The stiffer route takes more correction

Distribution factors are ratios of near-end rotational stiffnesses under the restraints assumed during balancing. With fixed far ends the common factor 4E cancels, so I/L is enough when E matches.

**The relationship**

```text
Kj=4EIj/Lj; DFj=Kj/ΣK; ΣDF=1
```

K: kN·m/rad; DF dimensionless. A fixed support is not released for distribution, so its displayed DF is zero.

**When it applies.** Small-displacement linear elastic prismatic bending. Clockwise member-end moments and section rotations are positive. Released ends, prescribed movements and symmetry conditions must match the actual model.

**Put it to work.** Lecture beam: A and C fixed, continuous B on a roller. AB=6 m under 12 kN/m; BC=8 m under a 40 kN midpoint load; constant EI.

DFBA=(1/6)/(1/6+1/8)=4/7. DFBC=3/7. Their sum is 1.

**What the result means.** The roller at B restrains translation but does not insert a hinge into the continuous beam.

### 2. Balance the sum, not each end separately

Lock B to calculate fixed-end moments first: AB gives −36,+36; BC gives −40,+40. Then release B conceptually and distribute the negative of its unbalanced sum.

**The relationship**

```text
U=ΣMjoint; ΔMbalance=−U; ΔMj=DFj(−U)
```

U and ΔM: signed kN·m. With an applied joint couple, include it in the joint equilibrium consistently before finding U.

**When it applies.** Small-displacement linear elastic prismatic bending. Clockwise member-end moments and section rotations are positive. Released ends, prescribed movements and symmetry conditions must match the actual model.

**Put it to work.** Use DFBA=4/7 and DFBC=3/7.

ΔMBA=(4/7)4=16/7=2.285714. ΔMBC=(3/7)4=12/7=1.714286. Corrected B moments are +38.285714 and −38.285714.

**What the result means.** Zero joint sum means the members balance one another; it does not mean each end moment is zero.

### 3. The correction travels to the far restraint

The factor follows directly from slope-deflection: own-end coefficient 4EI/L and far-end coefficient 2EI/L. In a multi-joint beam, incoming carry-over unbalances the next free joint, so repeat until residuals are acceptably small.

**The relationship**

```text
ΔMfar=½ΔMnear; stop when max |ΣMjoint| ≤ chosen moment tolerance
```

The one-half factor assumes a prismatic member and a held far end. It is not a universal rule for releases or nonprismatic members.

**When it applies.** Small-displacement linear elastic prismatic bending. Clockwise member-end moments and section rotations are positive. Released ends, prescribed movements and symmetry conditions must match the actual model.

**Put it to work.** In the lecture example, A and C stay fixed, so no further free joints remain after balancing B.

Carry to A:8/7; to C:6/7. Final [MAB,MBA,MBC,MCB]=[−244/7,268/7,−268/7,286/7]=[−34.857143,38.285714,−38.285714,40.857143] kN·m.

**What the result means.** Add every signed row in a distribution table. A final row copied from an unfinished iteration may look plausible but violate equilibrium.

### 4. A real hinge changes two pieces of the table

Use 3EI/L at the near end and zero carry-over into the hinge. For a full UDL, the condensed near-end load term has magnitude wL²/8, not wL²/12.

**The relationship**

```text
Knear=3EI/L; Fnear,released=Fnear−½Ffar; COhinge=0
```

The “0.75 I/L” shortcut assumes comparison with ordinary 4EI/L members. Use actual stiffnesses if boundary conditions differ.

**When it applies.** Small-displacement linear elastic prismatic bending. Clockwise member-end moments and section rotations are positive. Released ends, prescribed movements and symmetry conditions must match the actual model.

**Put it to work.** Authored variant: i fixed initially, j later hinged; L=4 m and downward w=8 kN/m.

Fi=−10.666667, Fj=+10.666667. Condensed Fi=−10.666667−5.333333=−16 kN·m; Mj=0.

**What the result means.** A hinged support at an outer beam end qualifies. A roller beneath an unbroken interior joint does not qualify by itself.

### 5. Settlement is a load on compatibility

With a horizontal member i→j and downward settlements di,dj positive, ψ=(dj−di)/L is clockwise. Add the displacement-only end moments to the fixed-load starting row, then perform ordinary distribution.

**The relationship**

```text
ψ=(dj−di)/L; Msettlement,ij=Msettlement,ji=−6EIψ/L
```

Settlements in m; EI in kN·m²; moments in kN·m. Only relative settlement matters for that member.

**When it applies.** Small-displacement linear elastic prismatic bending. Clockwise member-end moments and section rotations are positive. Released ends, prescribed movements and symmetry conditions must match the actual model.

**Put it to work.** Authored held-end span: EI=12000 kN·m², L=4 m, di=0, dj=4 mm.

ψ=0.004/4=0.001 rad; both clockwise end moments are −6·12000·0.001/4=−18 kN·m. If both supports settle equally, ψ=0 and this contribution vanishes.

**What the result means.** A rigid downward translation does not bend the beam. Differential settlement does. Keep this distinction when interpreting the experiment.

### 6. Earn the symmetry shortcut

For θj=−θi and ψ=0, the rotational part is 2EIθi/L. For θj=θi it is 6EIθi/L. Use these only when full geometry, restraints and loading establish the appropriate symmetry or antisymmetry.

**The relationship**

```text
θj=−θi ⇒ K=2EI/L; θj=θi ⇒ K=6EI/L (ψ=0)
```

The coefficients are the total local rotational contribution under the stated coupling, not independent far-end-fixed stiffnesses.

**When it applies.** Small-displacement linear elastic prismatic bending. Clockwise member-end moments and section rotations are positive. Released ends, prescribed movements and symmetry conditions must match the actual model.

**Put it to work.** Authored variant: EI=10000, L=5 and θi=0.001 rad, with no loads and ψ=0.

Opposite end rotations give Mi=2·10000/5·0.001=4 kN·m. Equal rotations give Mi=6·10000/5·0.001=12 kN·m.

**What the result means.** A settlement or eccentric load can destroy the symmetry that a geometry sketch suggests. Re-evaluate the complete load case.

### 7. Convert the table into a structural answer

For a horizontal span with clockwise applied end couples, Rright=[Σ(Pa)+Mleft+Mright]/L. For a full UDL, Σ(Pa)=wL²/2. Plot internal end moments as Mleft and −Mright in a sagging-positive convention.

**The relationship**

```text
Rright=[Σ(Pa)+Mleft+Mright]/L; Rleft=ΣP−Rright
```

P in kN, a,L in m, M in kN·m; reactions in kN. A support shared by two spans receives both end-force contributions.

**When it applies.** Small-displacement linear elastic prismatic bending. Clockwise member-end moments and section rotations are positive. Released ends, prescribed movements and symmetry conditions must match the actual model.

**Put it to work.** Revisit the lecture two-span beam and its final end moments.

AB gives RA=35.428571 and RB,left=36.571429. BC gives RB,right=19.678571 and RC=20.321429. Thus RB=56.25; total reactions=112 kN, matching 72+40.

**What the result means.** Accept the solution only after checking joints, releases, total forces and total moments; then interpret the diagram’s hogging regions and zero crossings.

## Before you solve independently

- Member stiffness and distribution factors
- Joint unbalance and balancing increments
- Carry-over and convergence
- Released far-end shortcut
- Settlement load terms
- Symmetry and antisymmetry reductions
- Final moments and reaction checks

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.