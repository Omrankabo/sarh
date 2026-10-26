## From the situation to a defensible decision

You buy a small machine today and receive money later. Follow one amount along a timeline, then learn to reverse the journey without confusing principal, interest and final balance.

### 1. Choose whose pocket and which date

A loan receipt is positive for the borrower and negative for the lender. Neither sign is wrong: they describe different viewpoints. Choose one perspective, set t=0, mark the period length and place each receipt upward and each payment downward. You may net two amounts at the same instant. You may not simply add amounts from different dates when time value matters. The timeline is the model; the formula only moves its arrows.

```text
Ct=receipts at t − payments at t
```

**What each symbol means** — Ct is currency at date t; t counts the stated periods.

**Try this situation** — At year 2, receive 700 and pay maintenance 200 CU.

**Follow the calculation** — C2=700−200=+500 CU at year 2, not at today.

**What the result changes** — Sign is a viewpoint convention; it is not a change to the physical timing of payment.

**When this model applies** — One consistent viewpoint; same-date netting only. Year-end is assumed only when stated.

### 2. Simple interest uses the original principal

Under simple interest the charge for every period is based on the original principal, not the growing balance. Imagine placing the same small block next to your initial money every year. The final balance grows linearly with time. Separate the accumulated interest I from the final amount F=P+I. This distinction is often hidden by everyday language saying “interest amount” when the question wants the total due.

```text
I=P i n; F=P(1+i n)
```

**What each symbol means** — P,F,I are currency; i is simple rate per period as a decimal; n is matching periods.

**Try this situation** — P=1000 CU, i=10%/year, n=3 years.

**Follow the calculation** — I=1000×0.10×3=300; F=1300 CU.

**What the result changes** — A charge and a closing balance are different requested quantities.

**When this model applies** — Simple-interest contract, constant rate and explicitly stated period treatment.

### 3. Compound growth remembers previous growth

Now each new period begins with the previous closing balance. At 10%, 1000 becomes 1100, then 1210, then 1331. The second increment is larger because the base is larger. The single-payment compound-amount factor F/P is just this repeated multiplication written compactly. Before calculating, predict F>P for positive rates and positive time. The exponent counts periods, not automatically years.

```text
F=P(F/P,i,n)=P(1+i)^n
```

**What each symbol means** — F/P means find F given P; i is the effective rate of one modeled period.

**Try this situation** — P=1000, i=10% effective annually, n=3.

**Follow the calculation** — F=1000(1.1)^3=1331 CU. Compound interest=331 versus simple interest=300.

**What the result changes** — The rate and period counter must use the same clock.

**When this model applies** — Constant effective rate, no intervening cash flows, consistent compounding periods.

### 4. Discounting walks the same path backward

Ask how much is needed today to grow into a known future receipt. Reverse the multiplication, so the P/F factor is the reciprocal of F/P. This is not removing a fraction of the future amount by subtracting i×n. With a positive rate, a future receipt is worth less at the earlier date; with zero rate the amount is unchanged. Re-expand the answer to its original date as a direct check.

```text
P=F(P/F,i,n)=F/(1+i)^n
```

**What each symbol means** — P is the value n matching periods before F, not necessarily calendar “today” unless that date is defined as zero.

**Try this situation** — A receipt of 1331 CU is due in 3 years at 10% effective annually.

**Follow the calculation** — P=1331/1.1^3=1000. Check 1000×1.1^3=1331.

**What the result changes** — Inverse multiplication requires division by the growth factor, not subtraction of percentages.

**When this model applies** — Same constant effective rate and no additional cash flows during the move.

### 5. Unknown time and irregular payments

A single-payment equation can solve for time or rate, not only money. Logarithms answer how many repeated multiplications are needed. For several irregular payments, move each separately to the common date and add their signed equivalents. A factor is a shortcut for a pattern; it cannot create a regular series where none exists. Keep enough precision until the last result.

```text
n=ln(F/P)/ln(1+i); PW=Σ Ct/(1+i)^t
```

**What each symbol means** — Logarithm arguments are dimensionless positive ratios; Ct is signed cash at t.

**Try this situation** — 1000 doubles at 10% annually. Separately, receive 110 at year 1 and 121 at year 2.

**Follow the calculation** — Doubling time=ln 2/ln 1.1≈7.27254 years. The two receipts have PW=110/1.1+121/1.1²=200 CU.

**What the result changes** — Equivalence is linear in amounts at a fixed rate; the dates determine the factors.

**When this model applies** — Constant positive effective rate for the time formula; a real-world payment may require rounding time up to a permitted date.

## Turn the idea into independent work

Explain the situation without looking, draw its dates, and predict the direction of change. Then use the Story Map to make a prediction before each reveal. In Practice, work conceptual, numerical and mixed variants; use a hint only after a real attempt. Review the cards by explaining why a formula or decision applies, not by reciting its shape.
