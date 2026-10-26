## From the situation to a defensible decision

A project’s response to the discount rate is a curve, not one magic percentage. Find roots, check their meaning, and separate return from recovery speed.

### 1. Sketch PW against the rate before solving

For an initial cost followed only by positive future receipts, increasing the discount rate reduces PW. At zero, PW is the undiscounted signed sum; at very high positive rates, future flows vanish and PW tends to C0. These endpoints reveal whether a positive-rate crossing is possible. Mixed-sign future cash can create a nonmonotonic curve; do not extend the conventional shape to every project.

```text
PW(0)=ΣCt; lim i→∞ PW(i)=C0 for future t>0
```

**What each symbol means** — The high-rate limit assumes finite cash amounts at strictly positive future dates.

**Try this situation** — Cost 1000 then receipts 600,600.

**Follow the calculation** — PW(0)=200; high-rate limit=−1000; there is one positive crossing for this conventional stream.

**What the result changes** — Inspect all signs before predicting the rate response.

**When this model applies** — Monotonic decrease applies to a negative C0 with nonnegative future receipts, not all cash-flow patterns.

### 2. IRR is a zero of the project’s worth

The internal rate solves PW(i*)=0. A conventional project with one positive IRR clears a lower MARR and fails a higher one. IRR describes a break-even discount rate for the forecast cash flows; it is not a promised cash yield. For a one-period project it can be found directly. For a longer series, bracket a sign change and solve numerically, then substitute the rate back into the original dated cash flows.

```text
PW(i*)=0; for one period i*=F/P−1
```

**What each symbol means** — i* is effective per modeled cash-flow period; compare with MARR on the same basis.

**Try this situation** — Pay 1000 now and receive 1200 at year 1.

**Follow the calculation** — −1000+1200/(1+i*)=0 → i*=20%. At MARR 15%, PW>0.

**What the result changes** — A return index is defined by the complete signed investment stream.

**When this model applies** — Simple accept/reject comparison assumes an independent conventional project with a unique relevant IRR.

### 3. Bracket and interpolate, then verify

If PW is positive at a lower rate and negative at a higher rate, a continuous conventional PW curve crosses zero in between. Linear interpolation estimates that crossing using a chord. It is generally not exact because PW is curved in the rate. Narrow the bracket or use bisection for a checked root. Substituting the final rate into the original PW is the decisive residual check.

```text
i*≈iL+PWL(iH−iL)/(PWL−PWH)
```

**What each symbol means** — PWL>0 and PWH<0 in the chosen conventional bracket. Keep rate units consistent.

**Try this situation** — PWL=100 at 10%; PWH=−50 at 15%.

**Follow the calculation** — Estimate i*=10+100/(100+50)×5=13.333333%. Then evaluate actual PW at that rate.

**What the result changes** — An interpolation formula cannot supply missing sign evidence.

**When this model applies** — Approximate interpolation; the bracket must contain the intended root. Multiple-root streams need additional care.

### 4. Multiple IRRs are real, not calculator failure

The lecture’s nonconventional stream−1000,+4700,−7200,+3600 has three sign changes and three positive IRRs. Multiplying PW by(1+i)^3 produces a cubic in x=1+i, factoring at x=1.2,1.5,2.0. Thus 20%,50%,100% all zero the same stream. A sign-change rule gives a bound on roots, not permission to pick a favorite. Use PW at the stated MARR and explain why a single IRR rule is ambiguous.

```text
−1000x³+4700x²−7200x+3600=0; x=1+i
```

**What each symbol means** — A positive polynomial root x need not imply positive i unless x>1; verify the actual economic rate.

**Try this situation** — Use the lecture’s four cash flows at years 0,1,2,3.

**Follow the calculation** — At i=20%,50%,100%, substitute and get PW=0 each time; never average these roots as a decision index.

**What the result changes** — A numerical root finder finds a root; it does not certify uniqueness.

**When this model applies** — Nonconventional signed stream; exclude undefined rate−100% in the original discrete model.

### 5. Payback measures recovery speed, not full worth

Ordinary payback cumulates undiscounted net cash flows until the initial outlay is recovered. A later negative operating cash flow must also be included; do not count only receipts. Discounted payback is a separate variant. Fractional recovery inside a year requires an assumption about within-year receipts; if all flows are end-year arrows, recovery is first achieved at an actual payment date. Neither rule values cash beyond the recovery point fully.

```text
ordinary cumulative balance at k=Σt=0…k Ct
```

**What each symbol means** — Payback is the earliest allowed date with recovered cumulative outlay. Units are time, not percent.

**Try this situation** — Pay 1000 now, then receive 300,400,500 at year-ends.

**Follow the calculation** — Balances−1000,−700,−300,+200. Discrete payback=3 years. With uniform receipts through year 3, interpolated payback=2+300/500=2.6 years.

**What the result changes** — Recovery speed is one partial measure, not a substitute for full-project equivalence.

**When this model applies** — State ordinary or discounted and discrete-year or within-year interpolation convention.

## Turn the idea into independent work

Explain the situation without looking, draw its dates, and predict the direction of change. Then use the Story Map to make a prediction before each reveal. In Practice, work conceptual, numerical and mixed variants; use a hint only after a real attempt. Review the cards by explaining why a formula or decision applies, not by reciting its shape.
