# Triaxial tests: choose the drainage story

Put the soil in a flexible jacket inside a water-filled cell. The cell squeezes it from all sides, then a ram adds an axial load. Two decisions control the story: may water leave during confinement, and may it leave during shear? These valve choices decide whether the skeleton or pore water first carries an added load. The measured ram force is only the extra axial force; the major principal stress also includes cell pressure. We will construct the stress circle, shift it using measured pore pressure, and connect the laboratory path to a rapid foundation load or a long-term drained condition.

## What you must be able to do

- Cell pressure plus ram increment
- The circle records all plane stresses
- Pore pressure shifts; it does not resize
- Two stages, three drainage paths
- Fit failure, then test the field choice

### Cell pressure plus ram increment

In conventional compression, the cell supplies σ3 laterally and also acts axially. The ram supplies the additional axial stress q=N/A. Therefore σ1=σ3+q. Using N/A as σ1 omits the initial axial confinement. As the specimen shortens, its cross-sectional area changes; use the test’s stated corrected area.

```text
q = N/A; σ1 = σ3 + q; A = (V0 − ΔV)/(L0 − ΔL)
```

N ram force in kN; A m²; stresses kPa. ΔV and ΔL are positive reductions.

Axisymmetric compression; σ2=σ3; no unaccounted piston friction or membrane correction.

**N=0.6 kN, corrected A=0.003 m², σ3=100 kPa.**

q=0.6/0.003=200; σ1=300 kPa. σ1−σ3=200 verifies the increment.

Keep confinement and deviator stress separate in the data table.

### The circle records all plane stresses

Place σ3 and σ1 on the horizontal normal-stress axis. Their midpoint is the circle center; half their separation is its radius. Every point on the circle represents a plane orientation. The radius is the maximum shear stress on any plane, but the Mohr–Coulomb failure plane does not generally have maximum shear stress when φ is nonzero.

```text
C = (σ1+σ3)/2; r = (σ1−σ3)/2; τmax = r
```

C circle center, r radius in kPa; C is not cohesion c.

Compression-positive convention and a consistent Mohr-axis convention. Plane rotation appears doubled on the circle.

**σ1=300 and σ3=100 kPa: construct the circle.**

C=200, r=100 kPa; intersections 100 and 300. Maximum shear acts at normal stress 200 kPa.

Check both axis intersections before using the circle to infer a failure envelope.

### Pore pressure shifts; it does not resize

For a saturated specimen with uniform measured u, subtract u from both principal stresses. The effective circle moves left by u while the radius stays unchanged, because u cancels from the stress difference. A total-stress envelope and an effective-stress envelope can therefore be different even though they describe the same failure tests. The prime on c′ and φ′ identifies the stress basis.

```text
σ′1=σ1−u; σ′3=σ3−u; q′=q; C′=C−u
```

u, C, σ in kPa; uniform positive pore pressure shifts the circle left.

Saturated Terzaghi effective stresses, measured u applying to the specimen; not an unsaturated-soil model.

**σ1=300, σ3=100 and u=40 kPa.**

σ′1=260; σ′3=60; C′=160; r′=(260−60)/2=100 kPa.

Identical radius does not mean identical strength parameters; the normal-stress location has changed.

### Two stages, three drainage paths

UU closes drainage during confinement and shear. CU allows consolidation first, then closes drainage for shear; measuring u permits an effective-stress analysis too. CD drains during both stages and shears slowly enough to avoid excess pressure. Drained does not mean absolutely zero pore pressure: back pressure may remain. Match the test to permeability, loading time and field stress history rather than using “clay” as an automatic UU label.

```text
UU: closed → closed; CU: open → closed; CD: open → open
Δσ′ = Δσ − Δu
```

Arrows separate consolidation and shearing stages; Δu is excess pore pressure.

Ideal saturated conventional tests. Drainage requires sufficient time as well as an open valve.

**At fixed σ1=300 and σ3=100, measured u rises from 20 to 50 kPa.**

Effective center falls from 180 to150 kPa. Radius remains100. This stress-state comparison does not claim strength increases merely because water is added.

Read drainage and pore-pressure records before choosing c,φ or c′,φ′.

### Fit failure, then test the field choice

At tangency to a straight envelope, the principal-stress relation combines c, φ and confinement. For φ=0 it reduces to σ1−σ3=2cu. An unconfined compression test has σ3=0 and therefore qu=2cu under that saturated undrained idealization. Real clays can have effective friction even when their short-term total-stress envelope is horizontal. The lecture’s blanket phrase “clay has φ=0” is only valid for this selected total-stress idealization.

```text
σ1 = σ3 tan²(45°+φ/2) + 2c tan(45°+φ/2)
φu=0: cu=(σ1−σ3)/2; qu=2cu
```

Use either all total stresses with c,φ or all effective stresses with c′,φ′. qu and cu are kPa.

Mohr–Coulomb compression tangency; qu=2cu needs saturated cohesive soil, no confinement and φu=0.

**An unconfined saturated sample fails at qu=120 kPa; assume φu=0.**

cu=qu/2=60 kPa. A total-stress short-term analysis uses this cu without subtracting u again.

Avoid combining undrained cu with an effective normal stress friction calculation.

## Your independent route

Close this chapter. Sketch the system, label givens and unknowns, predict the direction of change, then solve the Practice challenges without a hint. Use the Story map only to repair the first step you cannot explain. Rating a flashcard schedules its next active recall; finishing a step enrolls its concepts.
