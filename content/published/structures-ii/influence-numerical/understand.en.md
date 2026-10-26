A sketch tells you where a wheel helps or hurts; an ordinate tells you by how much. Numerical influence lines turn the released shape into a calibrated instrument. If a trial force produces a displacement curve, divide by the matching released-support movement rather than treating the trial displacement itself as the final ordinate.

Curvature M/EI describes how the beam bends. A conjugate beam treats that curvature as a signed loading whose shear and moment represent real-beam slope and deflection. Its support conditions must therefore be chosen from the real beam's displacement and rotation conditions, including releases; copying the real supports is not a valid general rule.

An alternative is to solve a moving unit load through compatibility and take free-body cuts. For the supplied 12 m propped cantilever, the right roller is essential: treating it as a free tip changes the problem entirely. The examples below connect normalization, conjugate-beam integration, reaction ordinates and a section-moment equation. Always check ordinates at supports and discontinuities before integrating an influence line.

## Follow the whole solution

### 1. Measure a shape, then divide

The force creates the shape; its magnitude does not survive division by the support movement. Use signed numerator and denominator from the same displacement convention.

**The relationship**

```text
ηRA(x)=y(x)/y(A)
```

y(x) is the release displacement at the moving-load location; y(A) is displacement of released A. Their common F/EI factor cancels.

**When it applies.** Small-deflection linear elastic bending; stated supports and positive signs; constant EI only where explicitly stated. All source diagrams must be read before applying a beam formula.

**Put it to work.** Lecture 7, equal 6 m spans: at x=3 m from A, y=−58.5 and y(A)=−144 in consistent scaled units.

ηRA(3)=−58.5/(−144)=0.40625. A downward 80 kN load gives RA=32.5 kN.

**What the result means.** A ratio of two negative movements can be positive. Choose signs algebraically before interpreting a sketch.

### 2. Build the beam that integrates for you

Transform conditions, not icons from memory: fixed↔free; an end pin remains an end pin. A real interior simple support requires zero conjugate moment and becomes an internal hinge, while maintaining the needed continuity conditions.

**The relationship**

```text
w*=M/EI; V*=θ; M*=y
```

Starred quantities belong to the conjugate beam. The sign mapping depends on a consistent curvature/deflection convention; use one convention throughout.

**When it applies.** Small-deflection linear elastic bending; stated supports and positive signs; constant EI only where explicitly stated. All source diagrams must be read before applying a beam formula.

**Put it to work.** Authored mapping: a real cantilever fixed at A and free at B becomes free at A and fixed at B in the conjugate beam.

At real A: θA=yA=0, hence V*A=M*A=0. These are precisely free-end conjugate conditions.

**What the result means.** Do not turn the roller at B in the supplied test into a free end. Its yB=0 is a physical boundary condition.

### 3. Treat curvature as a signed load

This is not another bending-moment diagram of the original load. It is a statics tool that integrates curvature. Use distances and centroid positions carefully; a triangular load area acts at one third of its base from the larger end.

**The relationship**

```text
Δθ=∫(M/EI) dx; y=M*
```

M/EI has units 1/m; its area is a rotation in radians. The first moment of that area has length units.

**When it applies.** Small-deflection linear elastic bending; stated supports and positive signs; constant EI only where explicitly stated. All source diagrams must be read before applying a beam formula.

**Put it to work.** Lecture 7 right span, coordinate u measured from C toward B: y=6u−u³/6, with y(A)=−144. At global x=10 m, u=2 m.

y=12−8/6=10.666667; ηRA=10.666667/(−144)=−0.074074. The printed table’s −0.081 at this location is inconsistent with its own polynomial.

**What the result means.** Keep the coordinate origin beside every expression. A correct polynomial evaluated with the wrong origin gives a wrong influence line.

### 4. Know which EI cancels

Changing only one span’s EI changes the shape and can change reactions. The lecture’s convenient EI=1 is safe for a common constant EI, not permission to discard different member stiffnesses.

**The relationship**

```text
η=f(x,A)/f(A,A)
```

f is flexibility. A common multiplier 1/EI cancels; relative EI ratios remain inside the flexibility calculation.

**When it applies.** Small-deflection linear elastic bending; stated supports and positive signs; constant EI only where explicitly stated. All source diagrams must be read before applying a beam formula.

**Put it to work.** Authored comparison: y(A)=4 mm and y(x)=1 mm. After uniform EI doubling they become 2 mm and 0.5 mm.

Both ratios are 0.25. This says nothing about a beam with one span stiffened alone.

**What the result means.** Use absolute EI when actual movements are requested. Use normalized shape for influence ordinates, retaining relative stiffness.

### 5. Read the roller before solving the test

The source drawing is a propped cantilever, not a free-ended cantilever. Compatibility, not vertical equilibrium alone, determines how the two supports share the moving load.

**The relationship**

```text
RB=x²(3L−x)/(2L³); RA=1−RB; MA,CCW=x−L RB
```

L=12 m; x is measured from fixed A. RB is upward; MA,CCW is the external counterclockwise support couple. Assume constant EI.

**When it applies.** Small-deflection linear elastic bending; stated supports and positive signs; constant EI only where explicitly stated. All source diagrams must be read before applying a beam formula.

**Put it to work.** Recent cumulative test, Question 3: put the downward unit load at x=6 m.

RB=6²(36−6)/(2×12³)=0.3125; RA=0.6875; MA,CCW=6−12×0.3125=2.25 m. For P=20 kN these become 6.25 kN, 13.75 kN and 45 kN·m.

**What the result means.** At x=L the prop carries all the load, so RA and MA vanish. At x=0 the fixed support carries the vertical load directly. These endpoint checks catch an omitted prop.

### 6. Cut the beam after finding its reactions

Use internal sagging-positive moments, distinct from the external support couple. Combining the reactions and a section cut avoids memorizing a second unrelated formula.

**The relationship**

```text
ηM6(x)=6 RB(x)−max(x−6,0)
```

ηM6 is in metres; the max term includes the load only when it lies right of the section. For a unit load at x=3, the term is zero.

**When it applies.** Small-deflection linear elastic bending; stated supports and positive signs; constant EI only where explicitly stated. All source diagrams must be read before applying a beam formula.

**Put it to work.** Supplied test ordinates at x=0,3,6,9,12 m.

RA: 1, 0.9140625, 0.6875, 0.3671875, 0. External MA,CCW: 0,1.96875,2.25,1.40625,0 m. Internal ηM6: 0,0.515625,1.875,0.796875,0 m.

**What the result means.** The midpoint line is nonnegative over this beam. A full-span 10 kN/m UDL therefore maximizes its positive midpoint moment: +90 kN·m, while fixed-end internal moment is −180 kN·m. These are different sections.

## Before you solve independently

- Normalize the release
- Conjugate boundary conditions
- Integrate curvature by statics
- Absolute and relative stiffness
- Propped-cantilever compatibility
- Recover a section response

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.