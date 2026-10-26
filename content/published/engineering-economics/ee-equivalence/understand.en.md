## From the situation to a defensible decision

Two payment schedules become comparable only after agreeing on a rate and a common date. Learn how to move, interpolate and reconcile payment and compounding frequencies.

### 1. Equivalence depends on the agreed rate

100 today and 110 in one year are equivalent at 10%, but not at 5%. Equivalence is a relationship between schedules under an assumed rate, not equality of nominal totals. To replace a debt schedule, value the old and new streams at one date and equate them. Moving the focal date should not change the answer if every stream is moved consistently using the same rate model.

```text
Σold Ct v(t)=Σnew Dt v(t)
```

**What each symbol means** — v(t) is the discount factor to the chosen focal date, not necessarily t=0.

**Try this situation** — Replace 110 due in one year by money today at 10%.

**Follow the calculation** — P=110/1.1=100. At 5%, the equivalent becomes 104.761905.

**What the result changes** — A common basis is an invariant comparison, not a selective adjustment.

**When this model applies** — Same valuation assumptions for every compared stream; no unilateral changes in rate or focal date.

### 2. One-dimensional table interpolation

A printed table may omit the requested rate or period. Linear interpolation draws a straight chord between the two surrounding tabulated values. It is an approximation to the factor curve, not an exact financial identity. If an exam explicitly asks for interpolation, use its supplied table values rather than replacing them by calculator-exact factors. Keep the interpolation ratio and unrounded intermediate values visible.

```text
f(x)≈f(x1)+(x−x1)[f(x2)−f(x1)]/(x2−x1)
```

**What each symbol means** — x may be rate or periods; f is the tabulated factor. Use the same rate unit for all x values.

**Try this situation** — Given f(12)=4.8402 and f(13)=4.6573, find f(12.4).

**Follow the calculation** — f≈4.8402+0.4(4.6573−4.8402)=4.76704.

**What the result changes** — Bracketing the unknown is part of the interpolation assumption.

**When this model applies** — Bracketing values, local linear approximation and the exam’s stated table precision.

### 3. Two-dimensional interpolation: rate and time

When both a rate and a period count lie between table entries, interpolate along one axis at each surrounding value of the other, then interpolate the two results. A rectangular bilinear interpolation gives the same answer whichever axis is done first if the same four corner values are used. A fractional n in a factor table is a numerical interpolation request; it does not create a fractional count of physical annual payments without a stated cash model.

```text
f≈(1−u)(1−v)f00+u(1−v)f10+(1−u)v f01+uv f11
```

**What each symbol means** — u and v are fractional distances within the two bracketing intervals.

**Try this situation** — Corners 10,14 at lower time and 20,24 at upper time; u=0.25,v=0.5.

**Follow the calculation** — Lower interpolation=11; upper=21; midway gives 16. The four weights sum to 1.

**What the result changes** — Respect the requested numerical procedure while explaining that it is a table approximation.

**When this model applies** — A rectangular four-entry table; retain source-table values and do not round intermediate rows.

### 4. When compounding is more frequent than payment

Monthly compounding with quarterly payments fits the standard factor model after converting to an effective quarter. Draw three monthly growth steps between adjacent quarterly arrows. If a nominal rate changes partway through a series, construct a local quarterly rate for each regime. Accumulate to the boundary and carry that balance onward, keeping the cash-flow dates unchanged.

```text
iquarter=(1+r/12)^3−1; P=A(P/A,iquarter,nquarters)
```

**What each symbol means** — The exponent 3 counts monthly compounding intervals in a quarter.

**Try this situation** — 700 CU each quarter for 3 years; nominal 18% monthly compounding.

**Follow the calculation** — iq=1.015³−1=0.045678375; P=700(P/A,iq,12). A monthly factor would need zeros in months without payments.

**What the result changes** — A cash arrow cannot earn before it exists.

**When this model applies** — Payments at quarter ends, compounding monthly, constant r within each evaluated segment.

### 5. When payment is more frequent than compounding

Quarterly deposits with semiannual compounding require a within-half-year rule. If the problem says no interest is credited on intermediate deposits, collect the quarterly deposits at each half-year endpoint before applying the half-year factor. If it permits exponential fractional-period equivalence, use the effective quarter root instead. These are different contracts. A good solution names the rule rather than calling one answer universally correct.

```text
no-intermediate-credit rule: Ahalf=2Aquarter; ihalf=r/2
```

**What each symbol means** — The collected amount is assigned to the half-year end under the specified no-intermediate-credit rule.

**Try this situation** — Deposit 750 at each quarter-end; nominal 18% compounded semiannually; intermediate credit explicitly excluded.

**Follow the calculation** — Collect 1500 at each half-year end and use 9% per half-year. Over 3 years F=1500(F/A,9%,6).

**What the result changes** — Ambiguity belongs in the model notes, not hidden inside a factor.

**When this model applies** — Do not infer this rule merely from the frequency label. Read whether intermediate cash earns interest.

## Turn the idea into independent work

Explain the situation without looking, draw its dates, and predict the direction of change. Then use the Story Map to make a prediction before each reveal. In Practice, work conceptual, numerical and mixed variants; use a hint only after a real attempt. Review the cards by explaining why a formula or decision applies, not by reciting its shape.
