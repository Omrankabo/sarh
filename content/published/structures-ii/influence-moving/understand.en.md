A bridge rarely carries a wheel wherever we independently wish. The wheels of a vehicle keep their spacing, and a distributed load may have a limited loaded length. Critical placement is the practical decision of finding which admissible load position produces the response we care about.

For point loads, multiply each load by the signed ordinate under its actual position and add. Slide the vehicle as a group; do not put all axles on one peak. For a distributed load, integrate intensity times ordinate over the loaded part. When the load can be placed independently, positive and negative regions guide maximum and minimum loading patterns.

For a fixed-length load patch, compare admissible positions, boundaries, slope changes and stationary candidates. A shear jump requires checking the appropriate one-sided limits. “Largest positive”, “most negative” and “largest absolute magnitude” are different goals. State which one is being optimized and check the positions that can actually occur.

## Follow the whole solution

### 1. Place one wheel before the whole truck

A unit load just locates the response sensitivity. Restore the real wheel force by multiplication. For this beam, ηM5=x/2 for x≤5, and (10−x)/2 for x≥5.

**The relationship**

```text
M5=P ηM5(x)
```

P is in kN; ηM5 is in m; their product is kN·m. The section stays at s=5 m while x moves.

**When it applies.** Linear superposition and a defined downward moving load; preserve axle spacing, allowable travel and load-length limits. Authored simple-beam examples below use pin/roller ends and L=10 m.

**Put it to work.** Authored example: P=20 kN at x=3 m.

η=3/2=1.5 m, so M5=20×1.5=30 kN·m. At x=5 it rises to 50 kN·m.

**What the result means.** Predict where the wheel should move before looking at the response. On this line, moving toward the peak raises the positive moment.

### 2. Keep the wheels connected

An axle outside the loaded structure contributes zero, but may still matter while entering or leaving. State whether reverse travel orientation is allowed.

**The relationship**

```text
E(a)=ΣPi η(a+di)
```

a is the train reference position; di are fixed axle offsets. Define η=0 outside the permitted beam length.

**When it applies.** Linear superposition and a defined downward moving load; preserve axle spacing, allowable travel and load-length limits. Authored simple-beam examples below use pin/roller ends and L=10 m.

**Put it to work.** Authored train: 30 kN at x=4 m and 20 kN at x=8 m on the 10 m beam, maintaining 4 m spacing.

η(4)=2 m and η(8)=1 m. M5=30×2+20×1=80 kN·m.

**What the result means.** Do not add the independent maximum of each axle; that would represent a different vehicle.

### 3. Spread the wheels into a carpet of load

Intensity is force per length. For a moment influence line, area has length squared, so kN/m×m² gives kN·m. Negative lobes subtract from positive response.

**The relationship**

```text
E=w∫loaded η(x) dx
```

w is UDL intensity; the integration bounds are the loaded region, not automatically the whole bridge.

**When it applies.** Linear superposition and a defined downward moving load; preserve axle spacing, allowable travel and load-length limits. Authored simple-beam examples below use pin/roller ends and L=10 m.

**Put it to work.** Authored simple 10 m beam: full-span w=10 kN/m and midspan moment line height 2.5 m.

Area=½×10×2.5=12.5 m². M5=10×12.5=125 kN·m, matching wL²/8.

**What the result means.** Do not confuse an influence area in m² with physical beam area. It is an integration aid whose dimensions depend on the chosen response.

### 4. Check the places where the rule changes

Evaluate positions when an axle reaches the studied section, a line breakpoint, or a permitted travel boundary. Curved influence lines can also have interior stationary points; then solve dE/da=0 and compare all candidates.

**The relationship**

```text
dE/da=ΣPi η′(a+di)
```

The derivative measures whether moving the entire train right increases the selected effect. At kinks use one-sided derivatives.

**When it applies.** Linear superposition and a defined downward moving load; preserve axle spacing, allowable travel and load-length limits. Authored simple-beam examples below use pin/roller ends and L=10 m.

**Put it to work.** Authored 30/20 kN train, 4 m spacing, fixed midspan section of L=10 m. Compare heavy axle at 5 and light axle at 5.

Heavy at5/light at9: 30×2.5+20×0.5=85. Heavy at1/light at5: 30×0.5+20×2.5=65 kN·m. Entry/exit candidates are lower; maximum=85 kN·m.

**What the result means.** This is the maximum at a specified section, not the absolute maximum bending moment anywhere in the beam. Those are different optimization questions.

### 5. Slide a load patch, not an unlimited flood

For an interior optimum of a constant-intensity patch, equal endpoint ordinates make the first derivative zero. Also test load boundaries, kinks and allowed patch positions.

**The relationship**

```text
E(a)=w∫a^(a+ℓ)η(x)dx; E′(a)=w[η(a+ℓ)−η(a)]
```

ℓ is fixed patch length; a is the left edge. The formula assumes the whole specified patch is within the evaluated integration domain.

**When it applies.** Linear superposition and a defined downward moving load; preserve axle spacing, allowable travel and load-length limits. Authored simple-beam examples below use pin/roller ends and L=10 m.

**Put it to work.** Authored simple beam: w=10 kN/m over exactly 4 m; maximize midspan moment. Symmetry puts edges at x=3 and 7 m.

Endpoint ordinates are both1.5 m; peak2.5 m. Loaded area=2×[2×(1.5+2.5)/2]=8 m². M5=80 kN·m.

**What the result means.** Loading the entire positive lobe would violate the 4 m limit. Optimization must honor the actual vehicle or loading specification.

### 6. Say which maximum you mean

The supplied propped beam has a positive midpoint moment line. Its fixed-end internal moment line is negative. The same UDL can therefore create positive midpoint moment and negative support moment.

**The relationship**

```text
Emax+=w∫η>0η dx; Emin−=w∫η<0η dx
```

These lobe rules assume independently selectable loading regions of unchanged intensity. They do not override fixed patch lengths, mandatory dead load or train spacing.

**When it applies.** Linear superposition and a defined downward moving load; preserve axle spacing, allowable travel and load-length limits. Authored simple-beam examples below use pin/roller ends and L=10 m.

**Put it to work.** Supplied test, L=12 m propped cantilever, w=10 kN/m over the favorable full span.

Midpoint η-area=9 m² gives +90 kN·m. External support-couple area=18 m² gives +180 kN·m CCW; internal fixed moment is −180 kN·m.

**What the result means.** Never reuse the free-cantilever result −180 at midpoint for this propped source diagram. A missing support changes both the influence shape and the critical load effect.

## Before you solve independently

- Point load × ordinate
- Rigid train and superposition
- UDL × signed area
- Critical axle placement
- Finite-length UDL placement
- Signed extremes and physical limits

Explain the physical response in your own words, sketch the restraints, and say what you expect before starting the guided story. You can revisit the foundations at any time.