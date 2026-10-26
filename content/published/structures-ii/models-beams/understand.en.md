Imagine a small flexible strip shaped like a large bridge. Instead of loading every possible wheel position, release one response and measure the strip's displacement shape. With the correct scale and normalization, those readings can represent an influence line of the full structure. This is an indirect model, not a miniature bridge whose applied loads must copy all real loads.

Identify what the instrument actually reports: ordinates, an area under the displaced shape, or a released-support movement. A length scale changes a measured area through two length factors. Keep model and prototype units separate until the conversion is explicit. Never replace signed areas by their absolute values merely because the result looks more plausible.

Concentrated loads contribute load times normalized reading. Distributed loads contribute intensity times signed normalized area. A couple contributes through its conjugate rotation, not a vertical reading. Use equilibrium to recover other actions only after obtaining enough independent model information. Check interval counts in numerical integration and investigate noisy or inconsistent measurements instead of hiding them.

## Follow the whole solution

### 1. Decide what the model is measuring

For an indirect model, the deformation amplitude is chosen for reliable measurement. The ratio y/δ is the important result. Geometric similarity alone does not guarantee correct relative stiffness.

**The relationship**

```text
ηR=y_m/δ_m
```

ηR is a reaction influence ordinate; ym is signed model displacement under a potential load; δm is imposed translation at the released reaction.

**When it applies.** An indirect, small-displacement model of the released structure with matching relative stiffnesses, geometry and restraints. Model movements are normalized, not literal predictions of prototype deflection.

**Put it to work.** Authored model test: repeat the experiment with a 50 mm release instead of 100 mm.

If a point reading changes from20 to10 mm, both normalized ordinates equal0.2.

**What the result means.** Agreement after normalization checks linearity. It does not verify that the supports or relative EI were modelled correctly.

### 2. Scale the length, then the area

For a reaction line, normalization removes one S: η remains dimensionless, but its area along the prototype is S times the model’s normalized area. Do not multiply a dimensionless ordinate by S again.

**The relationship**

```text
S=Lp/Lm; δp=Sδm; Ap=S²Am; ∫η dxp=S Am/δm
```

S is dimensionless. Am is a signed model displacement area in mm² if both axes use mm. Convert the resulting length to metres before multiplying by kN/m.

**When it applies.** An indirect, small-displacement model of the released structure with matching relative stiffnesses, geometry and restraints. Model movements are normalized, not literal predictions of prototype deflection.

**Put it to work.** Authored lobe contribution: S=20, Am=2000 mm², imposed δm=100 mm.

Prototype normalized area=20×2000/100=400 mm=0.4 m. Under w=10 kN/m its reaction contribution is +4 kN.

**What the result means.** This is one loaded lobe’s contribution; sum the other loaded lobes and point loads to obtain the full reaction.

### 3. Count intervals before pressing calculate

Use Simpson only where spacing and interval parity fit. Split at discontinuities and changes of spacing. An absent reading is not zero; interpolate only with a justified method or obtain the missing measurement.

**The relationship**

```text
Am=(h/3)[y0+4y1+2y2+4y3+…+yn]
```

h is station spacing in model mm; yi are signed model mm. The result is mm². n must be even.

**When it applies.** An indirect, small-displacement model of the released structure with matching relative stiffnesses, geometry and restraints. Model movements are normalized, not literal predictions of prototype deflection.

**Put it to work.** Authored lobe: y=[0,10,20,10,0] mm, h=50 mm.

Am=(50/3)[0+40+40+40+0]=2000 mm². Four equal intervals satisfy Simpson’s requirement.

**What the result means.** The area estimates the signed displacement shape, not the physical area of the steel or timber model.

### 4. Add the loads that do work

The release amplitude belongs in the denominator of every term. Scale only horizontal distances for a reaction influence-area calculation. A common amplitude error can cancel, but relative reading errors do not.

**The relationship**

```text
R=ΣPj ym,j/δm + Σwk S Am,k/(1000 δm)
```

Use P in kN, w in kN/m, ym and δm in mm, Am in mm². The factor1000 converts mm to m. Signs are those of the selected influence line.

**When it applies.** An indirect, small-displacement model of the released structure with matching relative stiffnesses, geometry and restraints. Model movements are normalized, not literal predictions of prototype deflection.

**Put it to work.** Authored contribution sum: S20, δ100 mm, positive area2000 mm² under w10, and P30 kN at reading −10 mm.

UDL contribution=4 kN; point contribution=30×(−10)/100=−3 kN. Total of these loaded regions=+1 kN.

**What the result means.** A small total can result from cancellation of large contributions, making sign and measurement errors especially important.

### 5. Return from the lab to the free-body diagram

A continuous beam can retain more unknown reactions than global equilibrium can determine. Do not claim a complete solution from one measured response unless the remaining system is determinate.

**The relationship**

```text
ΣFy=0; ΣM=0; dM/dx=V
```

R and V are forces; M is moment. A concentrated load causes a shear jump; absent a concentrated couple, internal moment stays continuous.

**When it applies.** An indirect, small-displacement model of the released structure with matching relative stiffnesses, geometry and restraints. Model movements are normalized, not literal predictions of prototype deflection.

**Put it to work.** Authored determinate check: simple beam L10, downward P30 at x4; model reaction ordinate at A is0.6.

RA=30×0.6=18 kN; RB=30−18=12 kN. M under load=18×4=72 kN·m. Right segment gives12×6=72 too.

**What the result means.** Matching the two section cuts is a local check beyond a global reaction sum. Both are needed to trust a final diagram.

### 6. Interrogate the measurements, not just the calculator

The lecture beam model has a printed area inconsistency in a later reaction expression. The recent tutorial model has a different loading. Do not transplant a lecture’s reaction into it.

**The relationship**

```text
rF=ΣR−ΣP−∫w dx; rM=ΣMaboutO
```

rF and rM are equilibrium residuals; a normalized reading η=y/δ also carries measurement uncertainty. A complete model must provide enough independent releases.

**When it applies.** An indirect, small-displacement model of the released structure with matching relative stiffnesses, geometry and restraints. Model movements are normalized, not literal predictions of prototype deflection.

**Put it to work.** Authored sensitivity: point reading y=20±1 mm; accurately imposed δ=100 mm; P=50 kN.

η=0.20±0.01; load contribution=10±0.5 kN, before other uncertainty sources.

**What the result means.** Report appropriate precision. Six calculator decimals do not turn millimetre readings into exact force measurements.

## Before you solve independently

- Direct versus indirect modelling
- Geometric scale and normalization
- Signed areas with Simpson’s rule
- Point and distributed-load work
- Reactions into shear and moment
- Measurement and source checks

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.