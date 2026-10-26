## From the situation to a defensible decision

Fuel purchases happen throughout a year, while rent may be paid at year-end. Distinguish the flow rate from a lump sum and build the correct present or future equivalent.

### 1. A flow rate becomes money after multiplying by time

A constant 1000 CU/year is a rate, not a payment arrow of 1000 CU at every mathematical instant. In a short time dt, the amount is a(t)dt. Discount that small amount from its own date and add all such pieces with an integral. This gives a reason for integration that you can picture: cash reaches the account at many times and each small piece has a different remaining growth time.

```text
dC=a(t)dt; P=∫ a(t)e^(−rt)dt
```

**What each symbol means** — a(t) is CU/year; dt is years; P is CU; r is continuous force/year.

**Try this situation** — Uniform 1000 CU/year flows for 3 years with no time value.

**Follow the calculation** — At r=0, P=∫0³1000 dt=3000 CU; units(CU/year)×years=CU.

**What the result changes** — Cash timing, not the presence of repetition, determines whether a sum or integral is needed.

**When this model applies** — Truly continuous flow and continuous compounding as stated. A monthly deposit series is not this model.

### 2. A uniform continuous flow at a continuous force

Move each small incoming amount to a common date. Integrating the exponential produces a denominator r, whereas annual discrete payments under the same force use e^r−1. That difference is the payment model, not a contradiction. For the same total yearly amount and positive rate, spreading receipts through the year gives them earlier arrival than a single year-end receipt, so present worth is larger.

```text
P=a(1−e^(−rn))/r; F=a(e^(rn)−1)/r
```

**What each symbol means** — a is constant CU/year, n years, r force/year; at r=0 both equivalents equal a n.

**Try this situation** — a=1000 CU/year, r=10%, n=3.

**Follow the calculation** — P=1000(1−e^−0.3)/0.1≈2591.817793; F=1000(e^0.3−1)/0.1≈3498.588076.

**What the result changes** — Equal nominal totals are not necessarily equivalent when their timing differs.

**When this model applies** — Uniform continuous flow, continuous compounding, no additional jumps.

### 3. Discrete payments can coexist with continuous compounding

Imagine an account accruing continuously, but your employer deposits once each year. The cash remains a list of dated arrows. Convert the force to the effective gap rate i=e^r−1, then use ordinary series factors. For monthly deposits use e^(r/12)−1. Keeping the denominator connected to the payment spacing prevents confusing the two columns of the lecture’s summary table.

```text
F=A[e^(rn)−1]/[e^r−1] for annual end-year payments
```

**What each symbol means** — A is an amount per annual payment, unlike a continuous rate a.

**Try this situation** — Deposit 1000 at each year-end for 3 years with r=10%.

**Follow the calculation** — F=1000(e^0.3−1)/(e^0.1−1)=1000(e^0.2+e^0.1+1). It is smaller than the continuous-flow future worth for the same 1000/year total.

**What the result changes** — Compounding and payment are independent modeling axes.

**When this model applies** — n annual end-year cash arrows and constant continuous annual force.

### 4. An effective discrete rate can discount a continuous flow

The lecture also allows a continuous payment stream with discrete annual compounding. A within-year convention is needed. Under exponential interpolation the growth from 0 to t is(1+i)^t=e^[ln(1+i)t]. Its equivalent force is ln(1+i), so the integral denominator becomes ln(1+i). This is not the same as a rule that credits interest only at annual boundaries. State the convention rather than hiding it in the formula.

```text
P=a[1−(1+i)^−n]/ln(1+i)
```

**What each symbol means** — i is annual effective; ln(1+i) is the equivalent continuous annual force.

**Try this situation** — 1000 CU/year continuously for 2 years with annual effective 10%.

**Follow the calculation** — P=1000[1−1.1^−2]/ln 1.1; compare with the direct integral using force ln 1.1.

**What the result changes** — A convenient formula does not override a stated timing assumption.

**When this model applies** — Continuous flow with exponential fractional-year valuation. A different credit convention needs a different model.

### 5. Defer, escalate and combine flow segments

Rent may be a dated annual payment while wages and materials flow continuously. Value each component with its own payment model and combine them at a common date. For a uniform flow that starts at year d, find its value at d then discount d years. If the flow rate itself grows exponentially at force g, discounting turns its exponent into g−r. At g=r the integral is simply the constant initial flow rate times duration.

```text
P=a(1−e^(−rL))e^(−rd)/r; growing flow: P=∫a0 e^((g−r)t)dt
```

**What each symbol means** — d is delay, L flow duration, a0 initial flow rate; both r and g are continuous forces/year.

**Try this situation** — A1000/year flow runs only from t=2 to 5 at r=10%.

**Follow the calculation** — P=1000(e^−0.2−e^−0.5)/0.1≈2122.000934 CU. This is a3-year stream discounted 2 years.

**What the result changes** — Combine cash models only after converting them to the same date.

**When this model applies** — Identify whether the quoted growth is a continuous force or a discrete percentage before using g.

## Turn the idea into independent work

Explain the situation without looking, draw its dates, and predict the direction of change. Then use the Story Map to make a prediction before each reveal. In Practice, work conceptual, numerical and mixed variants; use a hint only after a real attempt. Review the cards by explaining why a formula or decision applies, not by reciting its shape.
