# Compound beams: make separate pieces act together

Stack two rulers without bonding them and they can slide; connect them and the bending response changes. A steel beam with cover plates is the same structural idea. Extra flange steel is efficient because it sits far from the neutral axis, but it can contribute only if connections transfer the changing longitudinal force. Start with geometry and the assumed bond, then compute properties and bending resistance. Finally calculate interface shear, treat plate ends as force-development zones and check service deflection. A compound all-steel beam is distinct from a steel–concrete composite slab, which has its own shear-connection and construction-stage story.

## What you must be able to do

- Connections create the shared action
- Distance from the neutral axis does the work
- Add a force couple, then reclassify
- Follow the changing plate force into welds
- Plate ends and deflection complete the story

### Connections create the shared action

A cover plate can slide relative to a rolled beam unless welds or bolts transfer longitudinal force. Full interaction assumes slip is negligible and strain varies linearly through the assembled section in elastic bending. Simply adding isolated section inertias misses the benefit of separation. The load path must exist over the plate length, including its ends.

```text
elastic bending: ε(y)=κy; σ(y)=Eκy; no-slip interaction
```

ε strain dimensionless,κ curvature1/mm,y distance from neutral axis mm,E N/mm².

Compatible homogeneous steel section, elastic plane-section behavior and connections sufficient to justify full interaction.

**κ=10⁻⁶ mm⁻¹,y=200 mm,E=200000 N/mm².**

ε=0.0002; σ=40 N/mm². An interface that slips invalidates the assumed single-section strain field.

Compatibility is a design assumption that connections must earn.

### Distance from the neutral axis does the work

For equal top and bottom cover plates on a symmetric beam, the neutral axis remains at middepth. Add each plate’s own inertia and its area times squared centroid distance. The new extreme-fibre distance grows too, so elastic section modulus is I divided by the new outer distance, not the original beam half-depth.

```text
Inew=IUB+2[Bt³/12+(Bt)((D+t)/2)²]; Wel=Inew/(D/2+t)
```

B plate width,t thickness,D original beam depth in mm; I mm⁴,Wel mm³.

Symmetric identical plates of the same E, full interaction and no material removed from the original section.

**Authored section: IUB=200×10⁶ mm⁴,D=400,B=200,t=10 mm.**

Each plate A=2000,d=205 mm. Inew=200×10⁶+2(16666.667+2000×205²)=368133333.333 mm⁴. Wel=Inew/210=1753015.873 mm³.

Check the neutral axis and new outer depth before calculating W.

### Add a force couple, then reclassify

If both plates can fully yield, their areas form an added tension–compression couple. With a central plastic neutral axis the added plastic modulus is2Aplate d. However cover plates introduce new compressed outstands and panels between welds, so the assembled section must be classified afresh. A rolled beam’s old Class1 label does not automatically survive strengthening.

```text
ΔWpl=2Bt(D+t)/2=Bt(D+t); Mpl,Rd=Wpl,new fy/γM0
```

ΔWpl mm³,fy N/mm²; B,t,D as above. Wpl is not generally I/y.

Eligible plastic Class1/2 section, full plate force development and adequate lateral restraint; otherwise use appropriate elastic/effective and stability checks.

**D=400,B=200,t=10 mm; original Wpl=1.2×10⁶ mm³.**

ΔWpl=200×10×410=820000; Wpl,new=2020000 mm³. Withfy275 andγM0=1, Mpl=555.5 kN·m, conditional on plastic class and full interaction.

A larger W is useful only after local and member stability conditions are satisfied.

### Follow the changing plate force into welds

Bending moment varies along the beam, so the longitudinal force carried by a flange plate changes too. Its rate of change is interface shear flow VQ/I. This is force per unit length, not shear stress. If two identical weld lines share an interface demand symmetrically, each carries half the flow; converting that into throat stress requires throat area per length and the selected connection design rules.

```text
qinterface=VQ/I; Q=Aplate d; qline=qinterface/2 for two equal lines
```

V N,Q mm³,I mm⁴ → q N/mm. For one interface use only the connected plate’s first moment Q.

Elastic shear-flow theory, full interaction and stated symmetric load sharing; weld resistance needs separate EN1993-1-8 inputs.

**V=100000 N,Q=2000×205=410000 mm³,I=368133333.333 mm⁴.**

qinterface=111.3727 N/mm; each of two equal welds55.6863 N/mm. Verify dimensions: N·mm³/mm⁴=N/mm.

Do not size a weld by comparing force per length directly to a material stress.

### Plate ends and deflection complete the story

A plate cannot develop its full force at the point where it suddenly starts without a load-transfer length. Extending beyond the theoretical bending cutoff and designing the connection develops that force; fatigue may also govern abrupt details. Under service loads use assembled elastic stiffness only if interaction is justified. The lecture’s L/250 example is a selected serviceability criterion, not a universal limit for all projects.

```text
δmax=5wL⁴/(384EI) for a simply supported full-span UDL
check δmax≤δlimit selected for the project
```

w N/mm,L mm,E N/mm²,I mm⁴ gives δ mm. Use service loads, not automatically factored ULS actions.

Linear elastic simply supported constant-EI member with a full-span UDL; partial-length plates need variable stiffness analysis.

**Authored full-length model: w=10 N/mm,L=6000,E=200000,I=400×10⁶.**

δ=5×10×6000⁴/(384×200000×400×10⁶)=2.109375 mm. If selected limitL/250=24 mm, this deflection check passes only under the stated model.

Strengthening must connect geometry, load transfer, stability and service response.

## Your independent route

Close this chapter. Sketch the system, label givens and unknowns, predict the direction of change, then solve the Practice challenges without a hint. Use the Story map only to repair the first step you cannot explain. Rating a flashcard schedules its next active recall; finishing a step enrolls its concepts.
