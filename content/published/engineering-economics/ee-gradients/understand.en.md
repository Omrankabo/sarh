## From the situation to a defensible decision

Maintenance grows as equipment ages; savings deposits may rise by a fixed amount or percentage. Draw the first actual payments before deciding whether a gradient factor applies.

### 1. An arithmetic gradient starts with zero change

Write 1000,1500,2000,2500 as a base 1000 in every year plus 0,500,1000,1500. The gradient G is the increase between adjacent payments, not the first payment. The standard A/G factor assumes zero gradient at year 1 and the first G at year 2. This offset is why blindly treating the first receipt as G shifts the whole result. A decreasing gradient uses the same dates with a negative G.

```text
Ct=A1+(t−1)G, t=1…n
```

**What each symbol means** — A1 is first payment; G is CU added per successive payment; t is a payment index.

**Try this situation** — A1=1000 and G=500 for 4 years.

**Follow the calculation** — Payments=1000,1500,2000,2500; total at i=0 is 7000.

**What the result changes** — Write the actual sequence before selecting a factor family.

**When this model applies** — Equally spaced payments with a constant arithmetic increment. Do not use for percentage escalation.

### 2. Convert a staircase into a level annual amount

A/G finds the equal annual addition equivalent to the gradient. It is not itself the full payment when a base A1 is present. Add A1 first, then use P/A or F/A if a present or future result is required. An independent check discounts the original staircase directly. At zero rate the equivalent annual gradient is the average of 0 through(n−1)G.

```text
Aeq=A1+G[1/i−n/((1+i)^n−1)]
```

**What each symbol means** — A/G is dimensionless. The bracket multiplies G; all rates and payment spacings must match.

**Try this situation** — A1=2000, G=400, n=8, i=8%.

**Follow the calculation** — Aeq=2000+400[1/0.08−8/(1.08^8−1)]≈3239.41 CU/year. Verify by direct PW divided by(P/A,8%,8).

**What the result changes** — Count the base year as well as the subsequent increases.

**When this model applies** — Arithmetic gradient with first increase at year 2. At i=0 use(A/G)=(n−1)/2.

### 3. A percentage creates a geometric sequence

For percentage growth every payment is multiplied by 1+g. The first A1 is at year 1; the second is A1(1+g). Discounting introduces a second geometric ratio(1+g)/(1+i). If g equals i, the familiar closed form seems to divide by zero, but the original sum is perfectly finite: every discounted term equals A1/(1+i). This limit is a meaning check, not an exceptional financial mystery.

```text
P=A1[1−((1+g)/(1+i))^n]/(i−g); if i=g: P=nA1/(1+i)
```

**What each symbol means** — g is payment growth per period, i is discount per same period; A1 is the first year-end cash flow.

**Try this situation** — A1=100, g=10%, i=10%, n=3.

**Follow the calculation** — P=3×100/1.1=272.727273. Direct terms 100/1.1,110/1.1²,121/1.1³are equal.

**What the result changes** — A decrease by 20% retains 80%; distinguish the change from the new amount.

**When this model applies** — Constant percentage escalation; the formula applies only to the specified finite series.

### 4. Choose deposits to hit a target

A saver may know the target F and initial payment A1 but not the constant increment G. Split the future amount into the level base component and the gradient component. The equation is linear in G even though compounding is exponential in time. Check the last deposit and whether G is positive. If the given base alone exceeds the target, a negative G may be mathematically required and may violate the intended “increasing” schedule.

```text
F=Σ[A1+(t−1)G](1+i)^(n−t)
```

**What each symbol means** — n is payment count; solve G=(F−A1Σgrowth)/Σ[(t−1)growth].

**Try this situation** — Target 15000 after 24 months; A1=250, i=1.5% monthly.

**Follow the calculation** — ComputeS 0=Σ1.015^(24−t), S1=Σ(t−1)1.015^(24−t); G=(15000−250S0)/S1≈25.385512. Deposit 10=250+9G; deposit 24=250+23G.

**What the result changes** — A feasible payment schedule is a model requirement, not something guaranteed by solving an equation.

**When this model applies** — End-period monthly payments with a monthly effective rate; “increase continuously every month” in this statement means discrete monthly increments.

### 5. Piecewise projects are several short stories

A project may spend in years 0–2, grow receipts in 3–7, stay level in 8–11 and decline later. Do not force all 15 years into one gradient. Build a dated table, identify each segment’s first payment and prevent double counting at boundaries. Direct discounted summation is often the clearest audit. A compact factor solution is useful only after the full arrows are unambiguous.

```text
PW=Σsegment PW; Ct is assigned once at every boundary
```

**What each symbol means** — Use positive receipts and negative investments; continuous discount uses e^(−rt), discrete discount uses(1+i)^−t.

**Try this situation** — For Questions.pdf Q1: costs 60000 at 0,40000 at 1,20000 at 2; receipts 20000 at 3 then+10000 annually to 60000 at 7, level to 11, then×0.8 through 15.

**Follow the calculation** — Write every year before factorization. The printed solution contains 1000 where the statement’s increment is 10000; reconstruct from the statement and check by summation.

**What the result changes** — Source answers are evidence to inspect, not immunity from arithmetic or timing errors.

**When this model applies** — Choose compounding from the problem, not from the appearance of a gradient. Segment end dates must be stated.

## Turn the idea into independent work

Explain the situation without looking, draw its dates, and predict the direction of change. Then use the Story Map to make a prediction before each reveal. In Practice, work conceptual, numerical and mixed variants; use a hint only after a real attempt. Review the cards by explaining why a formula or decision applies, not by reciting its shape.
