# Unrestrained beams: stop the sideways escape

A ruler bends easily in one direction and can also twist sideways. A steel I-beam has the same additional escape route: its compressed flange can move laterally while the section twists. A strong cross-section can therefore fail as a member before reaching its full bending resistance. Start with physical restraint, not a table lookup. Then determine design actions, choose the correct section modulus and compare elastic critical moment with yield moment. This journey follows the supplied EN1993-1-1:2005+A1:2014 general-case teaching path. National Annex choices, a verified Mcr model and actual restraint adequacy remain explicit inputs. The older British Standards archives form a separate later track.

## What you must be able to do

- A vertical support is not a lateral brace
- Demand and local class come before resistance
- Compare yield with elastic instability
- Use the chosen curve, then restore units
- One passing check is not the whole beam

### A vertical support is not a lateral brace

A support may hold vertical displacement while allowing sideways movement or twist. A lateral restraint must restrain the relevant compression-flange movement and transmit its forces into a stable system. For a restrained segment the distance between effective restraints matters; the whole9 m beam is not always the unbraced length. Sagging and hogging can swap which flange is compressed.

```text
L_LT = distance between effective lateral restraints
```

L_LT in m or mm consistent with the stability calculation; restraint effectiveness is a physical input.

Actual restraints must have adequate stiffness, strength and a load path; point-load location alone does not create restraint.

**Source beam9 m with effective lateral restraints at0,3,6,9 m.**

Three restrained segments are each3 m. With only end restraint the unbraced length would be9 m, a different stability problem.

Draw brace positions and compression flange before selecting any reduction factor.

### Demand and local class come before resistance

Calculate reactions, moment and shear from the stated design loads. Then classify compression plates because local buckling controls whether plastic, elastic or effective section modulus is available. Class1/2 may use Wpl, Class3 uses Wel and Class4 requires effective properties. A steel grade name alone does not fix fy for every thickness, and local class does not certify global LTB safety.

```text
MEd,mid=P L/3 + w L²/8; RA=RB=P+wL/2
classes1/2: Wy=Wpl; class3: Wy=Wel; class4: effective modulus
```

Two equal point loads P at L/3,2L/3; w UDL; kN,m produce kN·m. Wy in mm³ with fy N/mm².

Simply supported symmetric loading as drawn; section class must use the correct plate widths, stress state, code and thickness-dependent fy.

**Source L=9 m,P=100 kN each,w=4.2 kN/m.**

RA=RB=100+4.2×9/2=118.9 kN. Midspan M=100×3+4.2×81/8=342.525 kN·m. Atx=3: M=118.9×3−4.2×3²/2=337.8. Maximum is atmidspan where shear crosses zero.

Check reactions sum to237.8 kN, matching200+37.8 applied load.

### Compare yield with elastic instability

Mcr is the elastic critical moment for the actual lateral/torsional boundary conditions and moment distribution. It is not the design resistance. Compare Wyfy with Mcr to form nondimensional slenderness. A smaller Mcr means a more vulnerable member and a larger slenderness. The lecture’s L/iz shortcut is limited to its specified doubly symmetric restrained-segment conditions; it cannot replace a verified Mcr model for any arbitrary beam.

```text
λ̄LT=√(Wy fy/Mcr)
```

Wyfy and Mcr must use identical moment units; λ̄LT has no units.

Lecture general-case EC3 path. Mcr must account for actual restraint, load height, section and moment shape; do not infer it solely from span.

**Authored model: Wyfy=500 kN·m,Mcr=800 kN·m.**

λ̄LT=√(500/800)=0.790569. This is an input to the selected buckling curve, not a capacity by itself.

A ratio should be dimensionless before you take its square root.

### Use the chosen curve, then restore units

The general-case buckling curve turns slenderness and imperfection factor into a reduction χLT≤1. Multiplying that by Wyfy and dividing by γM1 gives design buckling resistance. A different EC3 special-case procedure uses different curve choices and expressions; do not mix it with the lecture general case. The numerical practice explicitly supplies α and partial factors so the computation is reviewable.

```text
ΦLT=0.5[1+αLT(λ̄LT−0.2)+λ̄LT²]
χLT=min(1,1/[ΦLT+√(ΦLT²−λ̄LT²)])
Mb,Rd=χLT Wy fy/γM1
```

αLT imperfection factor; ΦLT and χLT dimensionless; γM1 selected partial factor. Mb,Rd in kN·m after dividing N·mm by10⁶.

General case of the stated2005+A1:2014 lecture track; correct curve and National Annex are explicit inputs. No axial force/biaxial interaction is included here.

**λ̄LT=0.8,αLT=0.34,Wyfy=400 kN·m,γM1=1.**

Φ=0.922; χ=1/(0.922+√(0.922²−0.8²))≈0.72445; Mb,Rd≈289.78 kN·m. Use unrounded values in the final check.

A reduction factor is only defensible with its curve, restraint model and parameter basis.

### One passing check is not the whole beam

Compare moment demand to both cross-section and member bending resistance, and check shear with the correct shear area. Large shear can reduce bending resistance; concentrated reactions can trigger local web checks. Then check deflection, restraint and connections. In the supplied exampleχ≈0.8 comes from a graph/shortcut; the arithmetic using it can be verified, but treating that approximate input as a complete certified stability analysis would overstate the source.

```text
Mc,Rd=Wy fy/γM0; Vpl,Rd=Av fy/(√3 γM0)
MEd/Mb,Rd≤1 and cross-section/shear/service checks
```

Av shear area mm²; fy N/mm²; Vpl,Rd N before dividing1000. γM0 and γM1 must be stated.

Plastic shear expression for an eligible section without governing shear buckling or torsion; apply required interaction/local checks separately.

**Source Wpl=1830 cm³,Av=4763 mm²,fy=275,γM0=1; compare VEd=118.9 kN.**

Mc,Rd=503.25 kN·m; Vpl,Rd=4763×275/√3/1000=756.22 kN. VEd/Vpl≈0.157; it is below0.5 in this plastic check. This does not bypass web or LTB checks.

Report the limiting mechanism and any unverified input, not merely “safe”.

## Your independent route

Close this chapter. Sketch the system, label givens and unknowns, predict the direction of change, then solve the Practice challenges without a hint. Use the Story map only to repair the first step you cannot explain. Rating a flashcard schedules its next active recall; finishing a step enrolls its concepts.
