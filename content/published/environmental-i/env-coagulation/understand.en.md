# Coagulation and flocculation: build a settleable floc

Tiny particles can stay suspended because gravity cannot quickly overcome their small size and stabilising surface effects. Coagulation changes those interactions; rapid mixing spreads the chemical before the important reactions have passed. Flocculation then creates collisions gently enough that aggregates grow rather than shatter. Neither step alone is the final removal process: settling and filtration follow. The jar test links this story to a particular raw water and chemical dose. The supplied design example then turns a selected Gt into time, volume, dimensions and water power. We will explicitly repair its width denominator and distinguish total water power from motor input.

## What you must be able to do

- Change the interaction before forcing collisions
- A concentration becomes a daily mass
- Use mixing that grows rather than breaks
- Time becomes a tank you can draw
- Check power and return to the jar test

### Change the interaction before forcing collisions

A stable colloidal suspension resists aggregation through surface interactions. Coagulants can destabilise it through charge effects, adsorption, bridging and precipitate sweep. Which mechanism dominates depends on chemical, dose, pH and water composition. More chemical is not automatically better; a dose must be tested against the treatment goal.

```text
t=V/Q; treatment sequence: destabilise → flocculate → separate
```

t nominal residence time s, V reactor volume m³, Q m³/s. The sequence is a mechanism map, not a chemical reaction balance.

Treatment selection follows raw-water characterisation and tests; no universal dose or pH is assumed.

**Q=0.5 m³/s through a10 m³ rapid-mix tank. Find nominal time.**

t=10/0.5=20 s. This does not prove ideal contact or choose the chemical dose.

A volume calculation is only one part of a treatment mechanism.

### A concentration becomes a daily mass

A dose in mg/L is mass per water volume. Multiply by daily volume and convert units once. State whether the dose refers to active chemical or commercial product; dividing by purity is needed only for the latter conversion. The source’s40 mg/L and50000 m³/day give a large monthly mass, so an order-of-magnitude check matters.

```text
m_active=Qd C/1000 kg/day; m_product=m_active/f_active
```

Qd m³/day; C mg/L; f_active mass fraction of active material.

Consistent chemical basis and constant stated flow/dose over the counted days; actual operation may vary.

**Source flow50000 m³/day,dose40 mg/L,30-day month.**

Daily mass=50000×40/1000=2000 kg/day; monthly=60000 kg. No purity correction is introduced because the source dose basis is retained.

Keep concentration, flow and counted duration visible in chemical procurement calculations.

### Use mixing that grows rather than breaks

Rapid mixing and flocculation have different jobs. Flocculation enhances collisions, but excessive shear can break large flocs; tapered G reduces intensity toward the outlet. The velocity-gradient measure G relates power dissipated in water to viscosity and volume. Gt is a useful design exposure, not proof that any G and t with the same product produce identical flocs.

```text
G=√[Pwater/(μV)]; Gt=G×t; t=(Gt)/G
```

G s⁻¹,t s,μ dynamic viscosity Pa·s,V m³,Pwater W; Gt dimensionless.

G is an average dissipation metric; actual mixing distribution, short-circuiting and floc strength need assessment.

**Source Gt=40000,G=30 s⁻¹. Find time.**

t=40000/30=1333.333 s=22.222 min. Keep seconds when finding volume from m³/s.

A time-unit error changes tank size by60 or86400.

### Time becomes a tank you can draw

Multiply design flow by selected residence time to obtain nominal tank volume, then choose dimensions that multiply back to that volume. The lecture example assumes depth5 m and length15 m. Their plan factor is75 m², so width is771.6/75≈10.29 m. The slide prints a denominator225 beside10.3; that denominator is inconsistent and is corrected explicitly here.

```text
V=Qt; V=L B H; B=V/(LH)
```

V m³; Q m³/s;t s; tank length L,width B,depth H in m.

Nominal hydraulic volume; account separately for freeboard, baffles, unavailable volume and short-circuiting in a detailed design.

**Source Q=50000 m³/day and t=1333.333 s.**

Q=0.5787037 m³/s; V=771.60494 m³. B=771.60494/(15×5)=10.28807 m≤12 m. Check15×5×10.28807=771.60494.

Multiplying dimensions back is a quick independent check on a printed design.

### Check power and return to the jar test

For each compartment calculate water power μViGi²; equal volumes with different G need different powers. Doubling G at fixed volume quadruples power. Motor input is larger if drive efficiency is below1. The jar test chooses a chemical operating condition for representative raw water; changing dose or pH means retesting, not merely buying a stronger motor.

```text
Pi=μViGi²; Pmotor=Pwater/η; equal-volume train Gt_total=ΣGi ti
```

μ=1.139×10⁻³ Pa·s at15°C in the source; η drive efficiency fraction; P in W.

Water power only; motor sizing and paddle loading require actual efficiency and geometry. Jar-test optimum applies to tested water and objective.

**Source V=771.60494 m³,3 equal compartments,G=40,30,20 s⁻¹.**

Vi=257.20165. Powers468.724,263.657,117.181 W; total849.563 W. Equal compartment times444.444 s giveΣGi ti=40000. A source typo in width does not change this checked hydraulic volume.

Check power, residence time and chemical response separately, then join them into one operating design.

## Your independent route

Close this chapter. Sketch the system, label givens and unknowns, predict the direction of change, then solve the Practice challenges without a hint. Use the Story map only to repair the first step you cannot explain. Rating a flashcard schedules its next active recall; finishing a step enrolls its concepts.
