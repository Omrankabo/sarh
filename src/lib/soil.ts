export type SoilLayer={thickness:number;unitWeight:number};
/** One-dimensional overburden with a hydrostatic water table, no suction/seepage. */
export function verticalStress(layers:SoilLayer[],depth:number,waterDepth:number,surcharge=0,waterAbove=0){
 if(depth<0||waterDepth<0||waterAbove<0||layers.some(l=>l.thickness<=0||l.unitWeight<=0)||depth>layers.reduce((n,l)=>n+l.thickness,0)+1e-8)throw Error('Invalid soil profile');
 let remaining=depth,total=surcharge+waterAbove*9.81;
 for(const layer of layers){const h=Math.min(remaining,layer.thickness);total+=h*layer.unitWeight;remaining-=h;if(remaining<=0)break;}
 const pore=9.81*(waterAbove+Math.max(0,depth-waterDepth));
 return {total,pore,effective:total-pore};
}
export function saturatedUnitWeight(waterContent:number,specificGravity:number){const e=waterContent*specificGravity;return 9.81*(specificGravity+e)/(1+e);}
