/** SI teaching models. Each caller must show its assumptions and input basis. */
const positive=(...xs:number[])=>{if(xs.some(x=>!Number.isFinite(x)||x<=0))throw Error('Positive finite input required');};
export function channelSection(b:number,y:number,m=0){
 positive(y);if(!Number.isFinite(b)||!Number.isFinite(m)||b<0||m<0||b+m<=0)throw Error('Invalid channel section');
 const area=y*(b+m*y),perimeter=b+2*y*Math.hypot(1,m),top=b+2*m*y;
 return {area,perimeter,top,radius:area/perimeter,depth:area/top};
}
export function manning(b:number,y:number,m:number,n:number,slope:number){positive(n,slope);const section=channelSection(b,y,m),velocity=section.radius**(2/3)*Math.sqrt(slope)/n;return {...section,velocity,discharge:section.area*velocity};}
export function rectangularEnergy(q:number,y:number){positive(q,y);const critical=(q*q/9.81)**(1/3),velocity=q/y;return {velocity,energy:y+velocity*velocity/(2*9.81),critical,minimum:1.5*critical,froude:velocity/Math.sqrt(9.81*y)};}
export function shearStrength(total:number,pore:number,c:number,phi:number){if(![total,pore,c,phi].every(Number.isFinite)||c<0||phi<0||phi>=90||total<pore)throw Error('Invalid compression envelope');return c+(total-pore)*Math.tan(phi*Math.PI/180);}
export function mohrCircle(major:number,minor:number,pore=0){if(![major,minor,pore].every(Number.isFinite)||major<minor)throw Error('Invalid principal stresses');return {center:(major+minor)/2-pore,radius:(major-minor)/2,left:minor-pore,right:major-pore};}
export function fitLine(xs:number[],ys:number[]){if(xs.length<2||xs.length!==ys.length||[...xs,...ys].some(x=>!Number.isFinite(x)))throw Error('Invalid observations');const meanX=xs.reduce((s,x)=>s+x,0)/xs.length,meanY=ys.reduce((s,y)=>s+y,0)/ys.length,den=xs.reduce((s,x)=>s+(x-meanX)**2,0);positive(den);const slope=xs.reduce((s,x,i)=>s+(x-meanX)*(ys[i]-meanY),0)/den;return {slope,intercept:meanY-slope*meanX};}
export function waterDemand(population:number,litresPerPersonDay:number){positive(population,litresPerPersonDay);const average=population*litresPerPersonDay/1000;return {average,maximumDay:1.8*average,peakHourRate:2.7*average,peakHourVolume:2.7*average/24,peakCubicMetresSecond:2.7*average/86400};}
export function flocculator(flowDay:number,dose:number,gt:number,g:number,viscosity=.001139){positive(flowDay,dose,gt,g,viscosity);const seconds=gt/g,volume=flowDay/86400*seconds;return {seconds,volume,dailyChemical:flowDay*dose/1000,waterPower:viscosity*volume*g*g};}
export function ltbReduction(slenderness:number,alpha:number){if(!Number.isFinite(slenderness)||slenderness<0||!Number.isFinite(alpha)||alpha<0)throw Error('Invalid buckling inputs');const phi=.5*(1+alpha*(slenderness-.2)+slenderness**2),radicand=phi*phi-slenderness*slenderness;if(radicand<0)throw Error('Inapplicable buckling curve');return Math.min(1,1/(phi+Math.sqrt(radicand)));}
export function platedSection(baseI:number,depth:number,width:number,thickness:number){positive(baseI,depth,width,thickness);const plateArea=width*thickness,distance=(depth+thickness)/2,inertia=baseI+2*(width*thickness**3/12+plateArea*distance**2);return {plateArea,distance,inertia,elasticModulus:inertia/(depth/2+thickness),addedPlasticModulus:2*plateArea*distance,firstMoment:plateArea*distance};}

export type CourseScene='soil-shear'|'soil-triaxial'|'hydro-section'|'hydro-uniform'|'hydro-energy'|'env-demand'|'env-quality'|'env-mixing'|'steel-ltb'|'steel-compound';
export const courseScenes:CourseScene[]=['soil-shear','soil-triaxial','hydro-section','hydro-uniform','hydro-energy','env-demand','env-quality','env-mixing','steel-ltb','steel-compound'];
export function courseScene(diagram:string):CourseScene|undefined{const id=diagram.replace(/^course-/,'') as CourseScene;return courseScenes.includes(id)?id:undefined;}
