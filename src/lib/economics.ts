/** Educational, deterministic cash-flow models. Rates are decimal per stated period. */
export function presentWorth(flows:{year:number;amount:number}[],rate:number,continuous=false){
 if(rate<=-1&&!continuous)throw new RangeError('Discrete rate must exceed -100%');
 return flows.reduce((sum,f)=>sum+f.amount*(continuous?Math.exp(-rate*f.year):Math.pow(1+rate,-f.year)),0);
}
export function uniformPresent(amount:number,rate:number,periods:number){return rate===0?amount*periods:amount*(-Math.expm1(-periods*Math.log1p(rate)))/rate}
export function capitalRecovery(principal:number,rate:number,periods:number){if(periods<=0)throw new RangeError('Positive periods required');return rate===0?principal/periods:principal*rate/(-Math.expm1(-periods*Math.log1p(rate)))}
export function effectiveRate(nominal:number,compounds:number,paymentPeriods=1){if(compounds<=0||paymentPeriods<=0)throw new RangeError('Positive frequencies required');return Math.expm1(compounds/paymentPeriods*Math.log1p(nominal/compounds))}
export function continuousPresent(flowRate:number,force:number,start:number,end:number){return force===0?flowRate*(end-start):flowRate*Math.exp(-force*start)*(-Math.expm1(-force*(end-start)))/force}
export function depreciationBook(cost:number,salvage:number,life:number,year:number,method:'sl'|'syd'|'db',rate=0.2){
 if(life<=0||year<0||year>life)throw new RangeError('Year must be within asset life');
 if(method==='sl')return cost-(cost-salvage)*year/life;
 if(method==='syd')return salvage+(cost-salvage)*(life-year)*(life-year+1)/(life*(life+1));
 return cost*Math.pow(1-rate,year);
}
export function bracketIrr(flows:{year:number;amount:number}[],low:number,high:number){
 let a=presentWorth(flows,low),b=presentWorth(flows,high);
 if(a*b>0)throw new RangeError('Opposite present-worth signs required');
 for(let k=0;k<90;k++){const middle=(low+high)/2,c=presentWorth(flows,middle);if(Math.abs(c)<1e-9)return middle;if(a*c<=0){high=middle;b=c}else{low=middle;a=c}}
 return (low+high)/2;
}
