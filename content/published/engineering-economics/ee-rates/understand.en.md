## From the situation to a defensible decision

An annual label, a compounding period and a payment period are three different clocks. Convert them deliberately before using any interest factor.

### 1. A nominal annual quote is a label

A nominal 12% compounded monthly means 1% per month, not an effective 12% earned over a whole year. Nominal r is divided by the stated compounding frequency m to obtain the period rate. The resulting monthly balance then compounds. First write a small rate card: quoted nominal annual rate, compounds per year, and the rate actually used in each recurrence. This prevents attaching the right number to the wrong time unit.

```text
iperiod=rnominal/m
```

**What each symbol means** — r is nominal annual decimal; m is compounds/year; iperiod is per compounding period.

**Try this situation** — Nominal 12% compounded monthly for 2 years.

**Follow the calculation** — iperiod=0.12/12=0.01; n=24; F/P=1.01^24.

**What the result changes** — Nominal and effective rates encode different information.

**When this model applies** — The quote explicitly states nominal annual rate and frequency. Never divide an effective annual rate this way.

### 2. Effective rate means actual growth over the interval

Take one currency unit through every compounding interval in a year. Subtract the original unit to obtain the effective annual rate. This definition gives a fair common basis for comparing differently compounded quotes. Increasing compounding frequency at a fixed positive nominal rate raises effective annual growth; it does not raise the nominal label. A rate comparison must also keep the other contractual assumptions equal.

```text
ieff,year=(1+r/m)^m−1
```

**What each symbol means** — The result is annual effective growth; multiply by 100 only for a percent display.

**Try this situation** — Nominal 12%, monthly compounding.

**Follow the calculation** — ieff=1.01^12−1=0.12682503, or 12.682503%.

**What the result changes** — Compare growth over a shared interval, not percentages with different clocks.

**When this model applies** — Constant nominal rate and periodic compounding with no intervening flows or fees.

### 3. Convert directly to the payment interval

Suppose payments are quarterly but interest compounds monthly. One quarter contains three compound periods, so its effective rate is(1+monthly rate)^3−1. More generally, if there are p payments/year, each payment interval spans m/p compound periods. This is the rate needed by an ordinary payment factor. Do not compound for the whole year and then divide that effective result by four.

```text
ipayment=(1+r/m)^(m/p)−1
```

**What each symbol means** — p is payment intervals/year; m is compounding intervals/year. The exponent is dimensionless.

**Try this situation** — Nominal 12% monthly, quarterly payments.

**Follow the calculation** — iquarter=1.01^3−1=0.030301=3.0301%. For 3 years use n=12 quarterly payments.

**What the result changes** — The factor clock follows the payment spacing after rate conversion.

**When this model applies** — Fractional-period equivalence is allowed by this mathematical model. If a bank specifies a different within-period credit rule, follow it explicitly.

### 4. Continuous compounding is a limit, not continuous payment

Let the number of compounding intervals grow without bound while holding the nominal annual force r fixed. The growth factor approaches e^(rt). Payments can still occur once a year or on any isolated dates. The effective one-year rate is e^r−1, while the continuous force equivalent to an effective i is ln(1+i). Keep a lump-sum cash arrow distinct from a flow spread continuously over time.

```text
F=P e^(rt); ieff=e^r−1; r=ln(1+ieff)
```

**What each symbol means** — r is a continuous force per year and t is years; r×t must be dimensionless.

**Try this situation** — 1000 CU, r=12% continuously for 2 years.

**Follow the calculation** — F=1000e^0.24≈1271.24915; annual effective=e^0.12−1≈12.749685%.

**What the result changes** — The factor needs effective growth over the gap between cash arrows.

**When this model applies** — Constant continuous force. This does not imply money is deposited continuously.

### 5. Rates that change create a chain of growth factors

If the rate changes, a payment crossing both regimes experiences both growth factors in sequence. A payment after the change experiences only the later regime. Break the timeline at the rate-change date, accumulate the earlier payments to that boundary, then combine them with later payments. A single arithmetic average rate generally does not preserve the project’s equivalence.

```text
F=P Πk(1+ik)^nk; discount with reciprocal products
```

**What each symbol means** — Each ik applies only over nk periods of its own regime.

**Try this situation** — 1000 earns 5% in year 1 then 10% in year 2.

**Follow the calculation** — F=1000×1.05×1.10=1155; using 7.5% twice gives 1155.625 and is not exactly equivalent.

**What the result changes** — Money accrues only across intervals during which it exists in the model.

**When this model applies** — Known rates and boundaries; payments at a boundary are assigned once.

## Turn the idea into independent work

Explain the situation without looking, draw its dates, and predict the direction of change. Then use the Story Map to make a prediction before each reveal. In Practice, work conceptual, numerical and mixed variants; use a hint only after a real attempt. Review the cards by explaining why a formula or decision applies, not by reciting its shape.
