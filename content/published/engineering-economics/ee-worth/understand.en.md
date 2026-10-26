## From the situation to a defensible decision

Two machines can look different in price, upkeep and salvage. Give them the same time basis and service requirement, then explain the economic consequence instead of merely choosing the largest number.

### 1. Present worth condenses the whole timeline

A project’s present worth is the signed sum of every receipt and disbursement moved to the chosen zero. Initial cost is already at zero and is not discounted one extra year. Positive PW for a conventional independent project means the forecast clears the chosen hurdle rate under the model. It is not a guarantee that uncertain forecasts will happen. For mutually exclusive alternatives, compare feasible same-service options on a common horizon.

```text
PW(i)=Σt=0…n Ct(1+i)^−t
```

**What each symbol means** — Ct is signed money at t; i is the effective discount rate matching t; MARR is a decision assumption.

**Try this situation** — Cost 10000 now, receipts 4000 in years 1…3, i=10%.

**Follow the calculation** — PW=−10000+4000(P/A,10%,3)=−52.592036 CU. A near-positive nominal total 12000 is not enough.

**What the result changes** — Keep signed worth and positive cost magnitudes distinct.

**When this model applies** — All relevant incremental cash effects included once, same basis, no hidden financing double count.

### 2. Future worth changes the reference date

Once every cash arrow has been included in PW, moving that combined amount to year n gives FW. It must agree with growing each original arrow individually to n. For the same horizon and positive growth factor, PW and FW have the same sign and give the same ranking. That equivalence fails if one alternative is grown to a different endpoint without a meaningful service comparison.

```text
FW(i,n)=PW(i)(1+i)^n=Σ Ct(1+i)^(n−t)
```

**What each symbol means** — n is the shared future comparison date; future cash at t=n has exponent 0.

**Try this situation** — Use cost 1000 at 0 and 600 at 1 and 2, i=10%.

**Follow the calculation** — FW 2=−1000(1.1)²+600(1.1)+600=50; PW=50/1.21=41.322314.

**What the result changes** — A comparison metric has a time coordinate as well as an amount.

**When this model applies** — Same rate, cash flows and horizon for both methods.

### 3. Annual worth and capital recovery

An annual equivalent replaces the project by equal year-end amounts over its stated life. For a cost-only machine, recover its purchase cost, credit its eventual salvage and add annual operating cost. The salvage reduces annual cost but does not cancel the entire purchase. The identity CR=(P−S)(A/P)+iS is useful for checking the more familiar P(A/P)−S(A/F).

```text
AW=PW(A/P,i,n); EUAC=P(A/P)−S(A/F)+O&M
```

**What each symbol means** — EUAC is positive equivalent annual cost; AW is signed annual worth. O&M is an equal annual expense.

**Try this situation** — P=10000,S=2000,n=5,i=10%,annual O&M=500.

**Follow the calculation** — EUAC=10000(A/P,10%,5)−2000(A/F,10%,5)+500≈2810.379846 CU/year.

**What the result changes** — Factor identities can expose a missing salvage-return term.

**When this model applies** — Same life and rate within each machine calculation; unequal-life ranking additionally needs a service/repeatability assumption.

### 4. Different lives need a service horizon

A four-year machine and a six-year machine cannot be compared by their first-cycle PW alone if both are supposed to provide 12 years of service. Repeat each cycle to the 12-year common multiple only if repeatability is credible. Alternatively, use the actual common study period with replacement and terminal values. Annual worth gives a convenient comparison under repeatable identical cycles; it does not make all future replacements free.

```text
common-horizon PW=Σcycle PW/(1+i)^(cycle start)
```

**What each symbol means** — Cycle starts and replacement cash must be dated; salvage and repurchase at one boundary may be netted once.

**Try this situation** — Machine lives 4 and 6 years; repeatability assumed; choose 12 year horizon.

**Follow the calculation** — 4-year option repeats 3 cycles;6-year option repeats 2. A replacement at year 12 is outside the service horizon, but the final salvage at 12 is included.

**What the result changes** — Asset life and the owner’s required service horizon are separate inputs.

**When this model applies** — Equivalent service and explicitly repeatable cycles, or a stated finite study period with terminal values.

### 5. Incremental choice: is the extra investment justified?

For mutually exclusive alternatives, the question is whether paying extra for the larger option creates enough extra benefit. Subtract lower-investment cash flows from higher-investment flows at every date. A positive incremental PW at the common hurdle rate supports the extra investment, provided the base alternative itself is feasible. A high standalone percentage return is not enough to rank projects of different scale.

```text
ΔPW=PWlarge−PWsmall; choose extra investment if ΔPW>0
```

**What each symbol means** — Differences are between matching dates, service and horizon.

**Try this situation** — Extra initial cost 2000 CU buys extra annual savings 600 for 5 years at 10%.

**Follow the calculation** — ΔPW=−2000+600(P/A,10%,5)≈274.472062 CU, so the increment clears this hurdle.

**What the result changes** — Incremental analysis refines a feasible decision; it does not remove its constraints.

**When this model applies** — Mutually exclusive feasible alternatives, common MARR and consistent service assumptions.

## Turn the idea into independent work

Explain the situation without looking, draw its dates, and predict the direction of change. Then use the Story Map to make a prediction before each reveal. In Practice, work conceptual, numerical and mixed variants; use a hint only after a real attempt. Review the cards by explaining why a formula or decision applies, not by reciting its shape.
