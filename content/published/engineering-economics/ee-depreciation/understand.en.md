## From the situation to a defensible decision

A machine ages, becomes obsolete and acquires a book value. Trace how each model allocates its depreciable amount, including the lecturer’s special rate convention and fractional switch example.

### 1. A depreciation charge is an allocation

You pay for a machine when you buy it, but an accounting model allocates its depreciable amount across service years. The annual depreciation charge D is therefore not another purchase payment. Physical deterioration concerns wear and damage; functional depreciation includes obsolescence or inadequate capacity. Book value, estimated resale value and market price need not be equal. Taxes, if modeled, connect an accounting charge to cash indirectly through the tax calculation.

```text
Bt=P−Σj=1…t Dj; depreciable base=P−S
```

**What each symbol means** — P is acquisition basis, S estimated terminal salvage, D charge during a year, B book value after that year.

**Try this situation** — P=8000, S=2000, accumulated depreciation=3000.

**Follow the calculation** — Depreciable base=6000; current book value=8000−3000=5000 CU.

**What the result changes** — Loss of service suitability need not require physical failure.

**When this model applies** — Accounting model and salvage assumptions must be identified; no tax rule is implied by the formula alone.

### 2. Straight-line: equal slices of the depreciable base

The straight-line model spreads P−S uniformly over n years. Its book-value line connects P at zero to S at the end of life. D is the yearly drop, not the remaining value. Check both endpoints and check that n charges sum to P−S. A fractional year can be evaluated along this line when the problem explicitly treats depreciation continuously within the year.

```text
D=(P−S)/n; Bt=P−t(P−S)/n
```

**What each symbol means** — D is CU/year; B,P,S are CU; t and n use years.

**Try this situation** — P=8000, S=2000, n=4 years. Find D and B2.

**Follow the calculation** — D=1500/year; B2=8000−2×1500=5000; B4=2000.

**What the result changes** — The salvage assumption defines the amount being allocated.

**When this model applies** — Straight-line allocation over stated life, with the same terminal salvage and any fractional-year convention declared.

### 3. Sum-of-years digits: heavier early slices

SYD gives the remaining-life number to each year: for five years the weights are 5,4,3,2,1. The denominator is their sum 15. These weights accelerate allocation without changing the total P−S. The book value after t years equals salvage plus the still-unallocated triangular share. Be careful with the year index: the first charge uses n, while the final charge uses 1.

```text
Dt=(n−t+1)(P−S)/[n(n+1)/2]; Bt=S+(P−S)(n−t)(n−t+1)/[n(n+1)]
```

**What each symbol means** — t=1 is the first charge; B0=P and Bn=S.

**Try this situation** — P=5000,S=1000,n=5.

**Follow the calculation** — D1=5/15×4000=1333.333333; D5=1/15×4000=266.666667. B2=5000−1333.333333−1066.666667=2600.

**What the result changes** — Rounding should not create or destroy the depreciable amount.

**When this model applies** — Integer year-end SYD schedule; use a separately stated rule for partial-year charges.

### 4. Declining balance: a constant rate on a shrinking base

DB multiplies the opening book value by R each year. The percentage can stay fixed while charges decrease because the base shrinks. To pass through a specified terminal S, solve R=1−(S/P)^(1/n). The lecture additionally introduces n*=nP/(P−S) and a course rate range based on n*. Standard textbook DDB often uses 2/n instead. These conventions are not identical when S>0. State the convention; the source table itself mixes 0.36 and 0.40 for one example.

```text
Bt=P(1−R)^t; Dt=R Bt−1; Rfit=1−(S/P)^(1/n)
```

**What each symbol means** — R is annual DB fraction; n* is the source’s extended straight-line life to zero, not the actual service life n.

**Try this situation** — P=10000,S=1000,n=5.

**Follow the calculation** — n*=5×10000/9000=5.555556; course 2/n*=0.36; conventional 2/n=0.40. Rfit=1−0.1^(1/5)≈0.369043. Flag the convention conflict.

**What the result changes** — A mathematical decay curve and an accounting schedule with a terminal constraint are different models.

**When this model applies** — Unclipped DB equation unless a salvage floor or switch is imposed. Course-specific rate limits are not presented as current tax law.

### 5. Switch models at a shared book value

A hybrid schedule uses DB first and straight-line later. The switch point must have one book value shared by both pieces. Reset the local time to zero there and distribute only the remaining difference to salvage over the remaining life. A year can straddle the switch: its annual charge is still opening B minus closing B, even if two models operated during it. The lecture’s4.5-year switch is an excellent test of local time.

```text
Bs=P(1−R)^s; Bt=Bs−(t−s)(Bs−S)/(n−s), t≥s
```

**What each symbol means** — s is the switch date; t−s is time since switch; Dt=Bt−1−Bt.

**Try this situation** — P=5000,R=25%,s=4.5,n=8,S=500.

**Follow the calculation** — B4=1582.03125; B4.5≈1370.079252; remaining annual slope≈248.594072. B5≈1245.782216; D5≈336.249034.

**What the result changes** — Book-value continuity and the annual difference give two independent checks.

**When this model applies** — The switch is prescribed, with linear fractional-year allocation after s. This is not an automatic optimal-switch algorithm.

## Turn the idea into independent work

Explain the situation without looking, draw its dates, and predict the direction of change. Then use the Story Map to make a prediction before each reveal. In Practice, work conceptual, numerical and mixed variants; use a hint only after a real attempt. Review the cards by explaining why a formula or decision applies, not by reciting its shape.
