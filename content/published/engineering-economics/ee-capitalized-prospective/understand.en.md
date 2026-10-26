## From the situation to a defensible decision

A maintained road may require service indefinitely. A project can also be compared with an alternative reinvestment strategy using two rates. Understand the assumption behind each index before calculating it.

### 1. Perpetuity: leave the capital, use its annual return

If a fund must supply A at every year-end forever, a present fund A/i earns exactly A each year at effective rate i. The principal is preserved in this idealized model. It is a limiting present worth, not the undiscounted sum of infinite payments. At zero rate a positive endless payment has no finite capitalized value. A perpetual service assumption should be justified, not automatically attached to every asset.

```text
CE=A/i for i>0
```

**What each symbol means** — CE is currency at 0; A is currency each year-end; i is effective annual decimal.

**Try this situation** — Provide 1000 CU/year forever at 10%.

**Follow the calculation** — CE=1000/0.10=10000 CU; annual return 10000×0.10=1000.

**What the result changes** — Without return, finite capital cannot sustain an endless positive withdrawal.

**When this model applies** — Infinite uniform year-end series, constant positive rate and maintained principal.

### 2. A repeated cycle is not a level annual payment

Suppose major maintenance recurs every k years. Its first payment is at k, not at year 1. The discounted sequence is A/(1+i)^k+A/(1+i)^(2k)+… and sums to A/[(1+i)^k−1]. Alternatively, value a complete recurring cycle at its start and repeat that cycle with the k-year discount ratio. Keep any one-time initial construction outlay outside the recurring cycle unless it really repeats.

```text
CEperiodic=A/[(1+i)^k−1]
```

**What each symbol means** — A is a payment every k years; the first is at year k.

**Try this situation** — 10000 CU overhaul every 5 years, first at 5, i=10%.

**Follow the calculation** — CE=10000/(1.1^5−1). Do not use 10000/0.10; that would mean annual 10000 payments.

**What the result changes** — The recurring cycle must describe actual repeated events, not copied bookkeeping.

**When this model applies** — Identical endless cycles with fixed dates and constant effective rate.

### 3. Combine early construction and later perpetual upkeep

A structure may cost money now, need additional construction over several years and then settle into a perpetual maintenance pattern. Value each early cost at 0. If uniform upkeep starts at year d, its perpetual value A/i lies at d−1. Shift that fund back to 0 and add it to construction. A common off-by-one mistake places the fund at the date of the first maintenance payment.

```text
CC=P0+Σearly Ct/(1+i)^t+(A/i)/(1+i)^(d−1)
```

**What each symbol means** — CC is positive capitalized cost magnitude; d is the first perpetual maintenance year.

**Try this situation** — Construction 100000 now; upkeep 2000/year beginning at year 4, i=5%.

**Follow the calculation** — Maintenance fund at 3=2000/0.05=40000; CC=100000+40000/1.05³.

**What the result changes** — Factors must partition the real cash flows without overlaps.

**When this model applies** — The perpetual part is annual, begins at a specified endpoint and does not overlap the early-cost list.

### 4. Prospective value uses a different alternative strategy

The lecture’s prospective value is not ordinary present value despite the letters PV. It compares project receipts accumulated at m, normally the stated MARR, with an initial opportunity grown for one period at prevailing i and the remaining periods at m. For the lecture’s simplified initial-outlay/positive-receipts case, keep the two rates and their roles distinct. If later negative flows occur, their financing treatment must be stated rather than silently interpreted as positive reinvestment.

```text
PV(m,i)=C0(1+i)(1+m)^(n−1)+Σt=1…n Ct(1+m)^(n−t)
```

**What each symbol means** — C0 is negative initial outlay; i is first-period liquid alternative rate; m is receipt reinvestment rate.

**Try this situation** — C0=−1000, receipts 600 at 1 and 2; i=10%,m=20%,n=2.

**Follow the calculation** — Foregone term=−1000×1.1×1.2=−1320; receipt term=600×1.2+600=1320; prospective value=0.

**What the result changes** — Always interpret an index under the strategy used to define it.

**When this model applies** — This is the supplied course’s defined strategy, not standard notation for present value. All rates must use the same period.

### 5. Check indices by making their assumptions coincide

When m=i, the prospective formula collapses to ordinary future worth at that common rate. Dividing by(1+i)^n then recovers PW. This gives a strong internal consistency check without claiming different indices always agree under different strategies. A mixed exam decision should name the chosen rate, the flow model and any ambiguous source data, then justify a recommendation by the complete cash-flow result rather than three unrelated slogans.

```text
if m=i: PV(m,i)=FW(i)=PW(i)(1+i)^n
```

**What each symbol means** — The identity assumes every future flow is accumulated consistently at the common rate.

**Try this situation** — Cost 1000 at 0,600 at 1 and 2; seti=m=10%.

**Follow the calculation** — Prospective=−1210+660+600=50=FW 2. Divideby 1.21 to getPW=41.322314.

**What the result changes** — Use consistent indices to answer the question each was designed to address.

**When this model applies** — Same dates, same compounding model and same complete cash-flow stream.

## Turn the idea into independent work

Explain the situation without looking, draw its dates, and predict the direction of change. Then use the Story Map to make a prediction before each reveal. In Practice, work conceptual, numerical and mixed variants; use a hint only after a real attempt. Review the cards by explaining why a formula or decision applies, not by reciting its shape.
