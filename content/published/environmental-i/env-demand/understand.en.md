# Water demand: design for people and peaks

A town does not drink at a constant rate. Homes, businesses, public services and system losses make an average demand, while morning peaks and emergencies make larger short-term rates. A treatment unit, a pump and a service reservoir need not all use the same rate. Begin by asking who will be served at the end of the design period and what the per-person allowance includes. Only then multiply. The lecture’s large-city example is a useful complete chain, but its printed intermediate contains a missing zero and a daily/hourly label that must be interpreted as an equivalent rate.

## What you must be able to do

- Count demand once
- Design for the population at the horizon
- Turn people into a flow rate
- Peak hour is a rate, not a day volume
- Storage covers a cumulative deficit

### Count demand once

Write a ledger of domestic, commercial/industrial, public and unaccounted demand. A per-capita total may already include several of these. Adding the same losses again would double count. Source choice must consider dependable quantity and raw-water quality together; groundwater is not automatically untreated drinking water merely because it looks clear.

```text
Qavg=P qpc; Qproduction=Qdelivered/(1−f_loss)
```

P persons; qpc m³/person/day; Q m³/day; f_loss fraction of produced water lost.

Define loss fraction’s denominator. A percentage of production differs from an additive allowance on delivered demand.

**Delivered demand=8000 m³/day and loss fraction of production=0.20.**

Qproduction=8000/0.8=10000. Loss=2000 and delivery=8000, so the ledger closes.

A percentage without its denominator is an incomplete engineering input.

### Design for the population at the horizon

Choose a design period and a population forecast consistent with the town’s evidence and system expandability. Arithmetic growth adds a fixed number each year; geometric growth adds a fixed fraction and compounds. The supplied ElObied problem already gives the future population, so inventing an extra growth rate would replace its data.

```text
arithmetic Pn=P0+n a; geometric Pn=P0(1+r)^n
```

n years; a persons/year; r annual fractional growth, not a percentage number such as2.

These are forecasting models, not guarantees. Document the chosen method and evidence; use supplied future population if stated.

**P0=10000,r=2%/year,n=2.**

Pn=10000(1.02)²=10404, not10400. The difference is compounding.

Forecast uncertainty belongs in the design reasoning; false precision in a calculator does not remove it.

### Turn people into a flow rate

Multiply the design population by the complete stated per-capita allowance. Convert litres before moving to cubic metres and seconds. In the lecture example,0.6 m³/person/day is a classroom design allowance, not a universal current requirement. Average daily demand is a volume per day; dividing by86400 gives the average continuous flow rate.

```text
Qavg,d=P qpc; Qavg,s=Qavg,d/86400
```

Qavg,d m³/day; Qavg,s m³/s; qpc must be consistent with population and demand scope.

Use the lecture allowance only for the stated exercise; actual projects require locally justified demand data.

**Rebuild the source average before applying peaks.**

400000×0.6=240000 m³/day=2.77778 m³/s. The source’s following lines print24000 but use results consistent with240000.

Carry units and an order-of-magnitude check through each line.

### Peak hour is a rate, not a day volume

Use explicitly defined peak factors. Here the lecture takes maximum-day rate as1.8 times average and peak-hour rate as2.7 times the average rate. The peak-hour line is written in m³/day equivalent; divide by24 to get its one-hour volume. Do not multiply1.8 and2.7 together when2.7 is already relative to the average.

```text
Qmaxday=1.8Qavg; Qpeakhour,rate=2.7Qavg; Vpeakhour=2.7Qavg,d/24
```

Factors1.8,2.7 are the supplied exercise assumptions. Vpeakhour m³ over one hour.

Specify factor bases. Peaks are planning assumptions, not simultaneous universal multipliers.

**Apply the source peak factors to240000 m³/day.**

Maximum day432000 m³/day=5 m³/s. Peak-hour rate648000 m³/day equivalent=7.5 m³/s; hourly volume27000 m³.

Use the rate and duration relevant to each component rather than one largest number everywhere.

### Storage covers a cumulative deficit

A pump can deliver a steadier flow than a town withdraws because a reservoir stores the difference. Add supply minus demand over each time block; the working equalisation storage is the range between maximum and minimum cumulative net volume. Emergency and fire reserves are separate design allowances. An old empirical fire formula is not a current adopted fire standard without a jurisdiction and edition.

```text
ΔV=(Qs−Qd)Δt; Vequalisation=max(ΣΔV)−min(ΣΔV)
```

Q m³/hour with Δt in hours gives volume m³; keep one sign convention.

A complete repeating demand/supply cycle for equalisation; add operational, dead and emergency volumes separately.

**Two one-hour blocks: supply100 m³/h throughout; demand150 then50 m³/h.**

Net volumes−50,+50; cumulative0,−50,0. Storage range50 m³. A usable initial50 supplies the first block and is restored in the second.

A balance over the whole day can be zero while significant hourly storage is still needed.

## Your independent route

Close this chapter. Sketch the system, label givens and unknowns, predict the direction of change, then solve the Practice challenges without a hint. Use the Story map only to repair the first step you cannot explain. Rating a flashcard schedules its next active recall; finishing a step enrolls its concepts.
