Return to the doorway held against side drift. Slope-deflection solved its corner rotations simultaneously. Moment distribution solves the same connected bending problem by repeatedly correcting one joint's moment balance. The final structural answer must agree even though the bookkeeping changes.

Treat every beam and column attached to a joint as a route for restoring moment. Its share depends on length, EI and the actual far-end restraint. Include the known effect of a loaded overhang at its joint; an overhang action is not another spring stiffness to put blindly in the denominator.

Keep a clear record of distributed and carried-over corrections. Repeat whole sweeps until the largest free-joint residual is acceptable in moment units. The sum at an unloaded joint should tend to zero, not each individual member end. Then recover reactions and verify horizontal force, vertical force and moment equilibrium for the complete frame.

## Follow the whole solution

### 1. Reuse the physics, change the solving method

AB=4 m with 2I; BC=6 m with 2I; BF=3 m with I; CE=3 m with 1.5I. A and F are true hinges, E fixed, and CD is a 2 m free overhang. Only B and C are distributed.

**The relationship**

```text
Δ=0; distribute at B,C; retain MAB=MFB=0
```

I denotes the reference second moment of area; EI₀ is the common reference flexural rigidity.

**When it applies.** Small-displacement elastic prismatic bending; axial strains neglected. Clockwise member-end couples are positive. The worked geometry is lecture 14 page 3, re-solved here by moment distribution, not a different source example.

**Put it to work.** Compare the physical freedoms with the slope-deflection non-sway journey.

Both methods represent the same two independent joint rotations after hinge condensation. Moment distribution solves their equilibrium iteratively.

**What the result means.** A solving method is interchangeable; boundary conditions are not.

### 2. Keep every external cause of joint moment

Condense the loaded hinge at A first. At B use MBA=24, MBC=−52 and MBF=0. At C use MCB=68, MCE=−15 and MCD=−12. Retain MEC=+15 as the fixed-end starting value at E.

**The relationship**

```text
UB=24−52+0=−28; UC,initial=68−15−12=41 kN·m
```

These are signed starting moments after true-hinge condensation. CD has zero distribution factor but a known −12 kN·m moment.

**When it applies.** Small-displacement elastic prismatic bending; axial strains neglected. Clockwise member-end couples are positive. The worked geometry is lecture 14 page 3, re-solved here by moment distribution, not a different source example.

**Put it to work.** The source loads are 12 kN/m on AB and BC, 36 kN at 4 m from B on BC, 40 kN leftward at mid-height of CE, and 6 kN downward at D.

For AB, MBA,released=16−½(−16)=24. For CD, MCD=−6·2=−12. The starting C sum is 41, before any carry-over from B.

**What the result means.** A zero factor describes the response to joint rotation; a load term describes the action of applied loads. Do not conflate them.

### 3. Build factors from the actual far restraints

B sees BA with a far hinge, BC with its far joint temporarily held during local balancing, and BF with a far hinge. C sees CB and CE with held far ends. CD remains a known load action.

**The relationship**

```text
KB/EI₀=[3(2)/4,4(2)/6,3(1)/3]=[3/2,4/3,1]; KC/EI₀=[4/3,2]
```

Order at B: BA,BC,BF. Order at C: CB,CE. Factors are dimensionless ratios of these stiffnesses.

**When it applies.** Small-displacement elastic prismatic bending; axial strains neglected. Clockwise member-end couples are positive. The worked geometry is lecture 14 page 3, re-solved here by moment distribution, not a different source example.

**Put it to work.** Normalize each joint independently.

ΣKB/EI₀=23/6. DFB=[9/23,8/23,6/23]. ΣKC/EI₀=10/3. DFC=[2/5,3/5].

**What the result means.** More branches at a joint do not imply equal shares. The support and rigidity model determines each share.

### 4. Follow one full balancing sweep

Apply the full B correction +28 in its three factors. Carry only half the BC increment to CB. Then balance C with its updated sum, carry half the CB increment back to BC and half the CE increment to EC.

**The relationship**

```text
ΔMB=[9/23,8/23,6/23](28); ΔMC=[2/5,3/5](−UC)
```

Each increment is kN·m; signs are the same during ordinary prismatic carry-over. Hinges receive zero carry-over.

**When it applies.** Small-displacement elastic prismatic bending; axial strains neglected. Clockwise member-end couples are positive. The worked geometry is lecture 14 page 3, re-solved here by moment distribution, not a different source example.

**Put it to work.** Start from UB=−28 and UC,initial=41.

B increments=[10.956522,9.739130,7.304348]. Incoming at C=4.869565; UC=45.869565. C increments=[−18.347826,−27.521739]; carry back to BC=−9.173913 and to EC=−13.760870.

**What the result means.** The first sweep reopens a residual at B. That is expected; it is why the process is iterative.

### 5. Stop at a checked answer, not a pretty table

Use a stated moment tolerance, such as 0.001 kN·m for this example, and test both B and C after a complete sweep. Retain full precision internally and round only the reported final values.

**The relationship**

```text
max(|MBA+MBC+MBF|,|MCB+MCE+MCD|)<0.001 kN·m
```

A tolerance controls remaining equilibrium error; it is not permission to ignore a wrong support or load.

**When it applies.** Small-displacement elastic prismatic bending; axial strains neglected. Clockwise member-end couples are positive. The worked geometry is lecture 14 page 3, re-solved here by moment distribution, not a different source example.

**Put it to work.** Compare the converged result to the independently solved slope-deflection benchmark.

[MBA,MBC,MCB,MBF,MCE,MEC]=[38.675676,−48.459459,55.513514,9.783784,−43.513514,0.743243] kN·m. Both joint sums vanish before rounding.

**What the result means.** Agreement between two independent methods is strong evidence only when both used the same correctly transcribed physical model.

### 6. Close the global reaction audit

Take global right/up positive. For AB and BC obtain vertical end forces by span moment equilibrium. Sum forces at B and C, including the overhang. For horizontal reactions, use each loaded column’s full free body, including the 40 kN leftward force on CE.

**The relationship**

```text
ΣRy=162 kN; ΣRx=40 kN; ΣMA=0
```

Support locations: A(0,0), F(4,−3), E(10,−3). The upward reaction at F includes all vertical force transferred at B; at E it includes all at C.

**When it applies.** Small-displacement elastic prismatic bending; axial strains neglected. Clockwise member-end couples are positive. The worked geometry is lecture 14 page 3, re-solved here by moment distribution, not a different source example.

**Put it to work.** Use the verified final end moments from the preceding step.

Ry[A,F,E]=[14.331081,80.493243,67.175676] kN. Rx[A,F,E]=[30.995495,3.261261,5.743243] kN. The E reaction couple is clockwise 0.743243 kN·m. ΣRy=162 and ΣRx=40 oppose the applied loads.

**What the result means.** Whole-frame moment equilibrium about A additionally checks the column-load lever arm and the fixed-support couple.

## Before you solve independently

- Non-sway restraint model
- A complete starting moment row
- Frame-joint distribution factors
- Balancing connected joints
- Residuals and independent agreement
- Global reactions from local moments

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.