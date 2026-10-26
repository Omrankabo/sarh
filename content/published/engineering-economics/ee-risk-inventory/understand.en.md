## From the situation to a defensible decision

Supplementary FE/PE practice: describe uncertain outcomes, compare expected cash values, test assumptions and balance ordering against holding cost.

### 1. A probability describes possibilities, not a promised average

A contractor may face a dry season or a rainy season with different costs. List mutually exclusive outcomes, their probabilities and the cash dates. Probabilities for an exhaustive scenario set sum to one. Expected cost is a weighted average for comparison; a single project may realize a costly outcome rather than that average. Dependence matters when combining multiple risks, so multiplying probabilities requires an independence assumption or conditional information.

```text
E[C]=Σ ps Cs; Σ ps=1
```

**What each symbol means** — ps is a probability between 0 and 1; Cs is scenario cost at a common date.

**Try this situation** — Cost 10000 with probability 0.7 and 20000 with probability 0.3.

**Follow the calculation** — Expectedcost=0.7×10000+0.3×20000=13000, but neither scenario costs 13000.

**What the result changes** — Probability arithmetic needs a model of how the events relate.

**When this model applies** — Exhaustive mutually exclusive scenarios with defensible probabilities.

### 2. Discount inside each scenario before comparing

A good outcome may arrive at a different time from a bad outcome. Compute each scenario’s PW at the chosen rate, then weight those present values. At a fixed deterministic discount rate, expectation and discounting commute because both are linear in cash amounts. That fact does not eliminate risk preference, financing limits or uncertainty in the discount rate itself. State what the expected-worth rule leaves out.

```text
E[PW]=Σ ps PWscenario,s
```

**What each symbol means** — Every scenario’s cash flows must be dated and valued with the same specified discount model.

**Try this situation** — Cost 1000 now. Year 1 receipt is 1500 with 0.6 probability or 500 with 0.4. Discount 10%.

**Follow the calculation** — Expected receipt=1100; expected PW=−1000+1100/1.1=0. Individual scenario PW differs.

**What the result changes** — Averaging uncertain outcomes does not remove resource constraints.

**When this model applies** — Risk-neutral expected-worth comparison at a fixed rate; not a guarantee or full risk assessment.

### 3. Sensitivity asks how much error the decision can tolerate

A forecast’s annual savings may be uncertain. Solve the same PW equation for the break-even savings instead of assuming the estimate is true. Compare the threshold with the forecast and identify which inputs are influential. One-at-a-time sensitivity is transparent but does not measure joint probability when multiple inputs move together. In a mixed exam answer, separate the algebraic threshold from the chance of achieving it.

```text
A*=P/(P/A,i,n) when PW=−P+A(P/A)=0
```

**What each symbol means** — A* is required annual saving in the same currency/year basis as A.

**Try this situation** — P=1000,n=3,i=10%.

**Follow the calculation** — A*=1000/(P/A,10%,3)=402.114804/year. Forecast 400 does not quite clear this threshold.

**What the result changes** — Sensitivity and probability answer related but different questions.

**When this model applies** — Simple initial-cost and level-saving model; include salvage or later costs if present.

### 4. EOQ balances ordering and holding

Large orders reduce the number of orders each year but leave more inventory on average. In the basic economic-order-quantity model, annual ordering cost is(D/Q)K and annual holding cost is(Q/2)h. Their sum is minimized at the square-root balance. Constant purchase cost independent of Q does not affect the optimum; quantity discounts would change the model. Think of two competing slopes, not a formula detached from inventory behavior.

```text
Q*=sqrt(2DK/h)
```

**What each symbol means** — D is units/year; K CU/order; h CU/(unit·year); Q is units/order.

**Try this situation** — D=10000/year,K=50/order,h=2/unit/year.

**Follow the calculation** — Q*=sqrt(500000)≈707.106781 units. At optimum,ordering and holding costs are equal.

**What the result changes** — Know which cost was omitted because it was constant, and when that assumption stops holding.

**When this model applies** — Constant demand, instantaneous replenishment, no shortages, constant costs, no quantity discounts.

### 5. Finish with a decision audit, not a memorized answer

Before accepting a final result, trace one unit of money through the model. Check the cash date, viewpoint, rate clock, quantity units, boundary values and decision question. Then alter an input and predict the effect. A sensible answer should survive that small change or explain why a threshold is crossed. Record the first wrong step in the repair notebook and retry a changed version later; repeating the same already-seen answer is not the same as transfer.

```text
model → dated calculation → units → boundary check → decision
```

**What each symbol means** — A defensible solution gives an amount, its date, its units and the assumptions used.

**Try this situation** — A reported present cost is 1500 CU,but all future costs total 1200 CU with a positive rate and no initial outlay.

**Follow the calculation** — For only positive future cost magnitudes,discounting must give present cost below 1200;1500 fails a boundary check.

**What the result changes** — Keep learning progress, effort and independently demonstrated performance distinct.

**When this model applies** — Check the question asked:worth,rate,time,charge or quantity are not interchangeable outputs.

## Turn the idea into independent work

Explain the situation without looking, draw its dates, and predict the direction of change. Then use the Story Map to make a prediction before each reveal. In Practice, work conceptual, numerical and mixed variants; use a hint only after a real attempt. Review the cards by explaining why a formula or decision applies, not by reciting its shape.
