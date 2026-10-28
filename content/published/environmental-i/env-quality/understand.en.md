# Water quality: turn a sample into evidence

Two clear glasses can contain very different dissolved salts and microorganisms. Appearance is one measurement, not a complete verdict. A useful analysis asks which fraction is being measured, how it was separated, and which units describe the result. We begin with a mass in a known volume, then distinguish suspended from dissolved solids and optical turbidity from mass. Chemistry adds charge and hydrogen-ion activity. Finally the cation–anion balance catches an analysis that does not close electrically. This journey teaches classroom calculations and data quality; no old slide limit is presented as a current drinking-water regulation.

## What you must be able to do

- Concentration needs a denominator
- Filter first, then name the fraction
- Turbidity is an optical signal
- Convert mass into electrical equivalents
- A pH step is a tenfold change

### Concentration needs a denominator

Mass concentration tells you how much material is in a known sample volume. A milligram in100 mL is not1 mg/L: the sample contains one tenth of a litre. For dilute water, mg/L is approximately ppm by mass only when density is near1 kg/L; the meanings are not universally identical.

```text
C=m/V; C(mg/L)=m(mg)×1000/V(mL)
```

m mass above tare/blank in mg; V sample volume; C mg/L.

Representative sample and consistent analytical preparation; density assumption must be stated when converting ppm by mass.

**A dried dish gains12 mg from200 mL.**

C=12×1000/200=60 mg/L. Subtract the empty-dish mass first.

An unrecorded sample volume makes the reported mass unusable as concentration.

### Filter first, then name the fraction

Total solids come from the whole sample’s dried residue. Suspended solids are retained on the specified filter, while dissolved solids are measured in its filtrate. Their separation is operational: filter and drying method define the result. For consistent tests on the same sample, TS is approximated by TSS+TDS. Different drying temperatures and volatile material can prevent perfect closure.

```text
TS ≈ TSS + TDS; TDS ≈ TS − TSS
```

All concentrations in mg/L for the same sample; “dissolved” is defined by the selected filtration protocol.

Compatible methods and sample bases; this is not a claim that an arbitrary household filter removes all dissolved material.

**TS=450,TSS=80 mg/L. Estimate TDS.**

TDS≈450−80=370 mg/L. Check370+80=450.

Knowing the solids fraction points to an appropriate separation mechanism.

### Turbidity is an optical signal

Turbidity measures how particles scatter light in a specified instrument; it is not a direct mass concentration. Two waters with the same suspended mass can scatter differently because particle size, shape and optical properties differ. Conductivity responds to dissolved ions and can estimate TDS only with an appropriate empirical conversion for that water. Neither clear appearance nor one TDS reading proves microbial safety.

```text
TDS_est (mg/L) = k × EC (µS/cm)
```

EC electrical conductivity at stated temperature; k a water-specific empirical factor, not a universal constant.

Use measured calibration if available. The lecture’s0.55–0.7 range is an estimate, not a regulatory limit or direct NTU conversion.

**EC=500 µS/cm and calibrated k=0.6.**

TDS_est=0.6×500=300 mg/L. Retain the temperature and calibration information.

Do not turn an empirical proxy into a direct measurement or a safety verdict.

### Convert mass into electrical equivalents

A calcium ion carries twice the charge of a sodium ion, so equal mg/L values are not equal charge contributions. Divide ionic mass concentration by equivalent weight to obtain meq/L. Sum positive and negative charge separately. Electroneutrality provides an analytical audit but cannot prove that every unmeasured contaminant is absent.

```text
EW=MW/|z|; meq/L=(mg/L)/(mg/meq); charge error=100(C−A)/(C+A)
```

MW molar mass, |z| ionic charge magnitude; C and A sums in meq/L; error here is signed percent.

Use concentrations of individual ionic species and the stated atomic weights. An acceptance tolerance belongs to a selected analytical protocol.

**Calcium93.8 mg/L; use MW40 and charge2.**

EW=40/2=20 mg/meq; calcium=93.8/20=4.69 meq/L.

The lecture example’s mass-to-charge conversion can be checked without guessing a health limit.

### A pH step is a tenfold change

pH is minus the base10 logarithm of hydrogen-ion activity. A drop from7 to6 means ten times the hydrogen-ion activity, not one more unit of acid mass. In dilute ideal calculations concentration approximates activity. Buffering and alkalinity control how much chemical is needed to change pH; pH alone cannot determine an acid or coagulant dose.

```text
pH=−log10(aH+); ideal dilute [H+]≈10^(−pH) mol/L
at25°C: [H+][OH−]≈10^(−14)
```

aH+ is dimensionless activity; concentrations mol/L in the dilute ideal relation. Temperature affects Kw.

State the ideal-dilute and25°C assumptions; do not treat a pH change as a direct chemical-dose prescription.

**Find the hydrogen concentration ratio frompH8 topH6.**

10^(−6)/10^(−8)=100. The water’s buffering still determines the dose needed to achieve this change.

Separate the state variable pH from the chemical capacity alkalinity.

## Your independent route

Close this chapter. Sketch the system, label givens and unknowns, predict the direction of change, then solve the Practice challenges without a hint. Use the Story map only to repair the first step you cannot explain. Rating a flashcard schedules its next active recall; finishing a step enrolls its concepts.
