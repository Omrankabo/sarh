## From the situation to a defensible decision

A monthly deposit or annual maintenance bill repeats. Build its equivalent by counting and moving every payment, then recognize the shortcut and exactly where it lands.

### 1. Count the first and last arrows

An ordinary equal-payment series has n payments at t=1 through n. Its present equivalent sits one period before the first payment, at t=0. The series from t=0 through 7 contains eight payments, not seven. The two details to mark before choosing P/A are the payment count and the location of the resulting P. An annuity due begins one period earlier than the corresponding ordinary annuity.

```text
count = last index − first index + 1
```

**What each symbol means** — Indices are payment dates in the chosen period clock.

**Try this situation** — 500 CU is paid at t=0,1,…,7.

**Follow the calculation** — There are 8 payments. PW=500+500(P/A,15%,7), or 500(P/A,15%,8)×1.15.

**What the result changes** — P/A lands one period before the first arrow, not at an arbitrary present date.

**When this model applies** — Count actual arrows; a duration alone does not say whether both endpoints contain a payment.

### 2. Build savings toward a future target

Each deposit has a different growth time. The first ordinary payment grows for n−1 periods; the last grows for zero periods because F is measured immediately after it. Adding that geometric sequence produces F/A. Its reciprocal A/F answers the sinking-fund question: what equal deposit will achieve a specified target? At zero rate the balance is simply nA, which is an essential check on the formula.

```text
F=A[(1+i)^n−1]/i; A=F i/[(1+i)^n−1]
```

**What each symbol means** — A is currency each payment; F is currency at the last payment date; i matches the payment spacing.

**Try this situation** — Deposit 1000 annually at 10% for 3 payments.

**Follow the calculation** — F=1000(1.1²+1.1+1)=3310 CU. To reach 3310, the required deposit is 1000.

**What the result changes** — A factor’s removable zero-rate singularity has a simple cash-counting meaning.

**When this model applies** — Equal end-period payments, no missed dates and a constant effective payment-period rate.

### 3. What repeated receipts are worth today

Take every future payment backward to the same starting date. The first travels one period and the last travels n periods. Summing gives P/A. This is useful for valuing maintenance costs as well as receipts; the factor does not decide the cash-flow sign. A larger positive discount rate reduces the present value of the same positive future series, because each arrow is pulled back more strongly.

```text
P=A[1−(1+i)^−n]/i
```

**What each symbol means** — P is one period before the first equal payment; A may be treated as a positive magnitude with an explicitly assigned cost/receipt sign.

**Try this situation** — Receive 1000 at years 1,2,3, at 10%.

**Follow the calculation** — P=1000(1/1.1+1/1.1²+1/1.1³)=2486.85199 CU.

**What the result changes** — The intermediate equivalent is at 3, exactly one period before the first receipt at 4.

**When this model applies** — Ordinary equal series with matching effective rate; at zero, P=nA.

### 4. Recover capital through equal payments

A machine purchase or loan can be replaced by an equivalent equal-payment series. A/P is the reciprocal of P/A. Each loan payment normally contains a return on the outstanding balance plus a principal reduction; it is not all interest. A balance recurrence checks the factor result and reveals what is actually happening between payments. With positive rates, nA exceeds the amount originally financed.

```text
A=P i/[1−(1+i)^−n]; Bt=Bt−1(1+i)−A
```

**What each symbol means** — Bt is debt balance immediately after payment t; B0=P.

**Try this situation** — Borrow 1000 and repay in 3 annual payments at 10%.

**Follow the calculation** — A=1000/2.486851991=402.114804 CU. B1=1000×1.1−402.114804=697.885196.

**What the result changes** — The recurrence separates growth from repayment and catches negative amortization.

**When this model applies** — Level end-period repayments, constant effective period rate and no fees or extra payments.

### 5. Shift the series without losing a payment

If every payment moves one period earlier, every one receives an extra period of growth to any common future date. Multiply the ordinary-series equivalent by 1+i. For a deferred series, first find the local P one period before its first payment, then move that P to the required date. Draw the local zero above the time axis; a large share of exam errors are correct factors attached to the wrong date.

```text
Pdue=A(P/A,i,n)(1+i); P0=A(P/A,i,n)(P/F,i,k−1)
```

**What each symbol means** — k is the first payment date of a deferred ordinary series, measured from the required zero.

**Try this situation** — 500 CU at t=0 through 7, i=15%.

**Follow the calculation** — P=500+500(P/A,15%,7)≈2580.21 CU. F at 7=P(1.15)^7; the t=0 arrow earns 7 periods.

**What the result changes** — A/P assumes the first payment follows its P by one full payment period.

**When this model applies** — Annuity due has exactly n payments at 0…n−1; distinguish it from a series running 0…n.

## Turn the idea into independent work

Explain the situation without looking, draw its dates, and predict the direction of change. Then use the Story Map to make a prediction before each reveal. In Practice, work conceptual, numerical and mixed variants; use a hint only after a real attempt. Review the cards by explaining why a formula or decision applies, not by reciting its shape.
