export type Lang='ar'|'en';
export type T={ar:string;en:string};
export type Ref={doc:string;page:number;filename?:string;label?:T};
export type Video={id:string;title:string;author:string;language:string;purpose:T;kind:'concept'|'worked'|'foundation';topics:string[];reviewedAt:string;reference:string};
export type StructureSketch={description:T;nodes:{id:string;x:number;y:number;support?:'fixed'|'pin'|'roller';settlement?:string}[];members:{from:string;to:string;label?:string}[];loads:{node?:string;member?:number;at?:number;end?:number;kind:'point'|'udl'|'couple';label:string;direction?:'down'|'right'|'left'}[];dimensions:{from:string;to:string;label:string}[];note?:T};
export type CashFlow={unit:string;flows:{year:number;amount:number}[];note:T;timeUnit?:'month'|'year'};
export type WorkedProblem={id:string;topic:string;title:T;givens:T;solution:T;status:'verified';sources:Ref[];videoIds:string[];sketch?:StructureSketch;cashflow?:CashFlow;unit?:string};
export type Prerequisite={id:string;title:T;why:T;refresher:T;example:T;question:T;options:T[];correct:number;answer:T;videos:{title:string;author:string;id:string;language:string}[]};
export type Step={id:string;title:T;predict:T;options:T[];correct:number;observe:T;explain:T;formula:string;symbols:T;assumptions:T;example:T;calculation:T;interpret:T;check:{prompt:T;answer:T};diagram:string;experiment?:string;concepts:string[];sources:Ref[]};
export type Question={id:string;concept:string;type:'conceptual'|'numerical'|'mixed';prompt:T;options?:T[];correct?:number;expected?:number;tolerance?:number;unit?:string;hints:T[];solution:T;sources:Ref[]};
export type Card={id:string;concept:string;kind:string;q:T;a:T};
export type Topic={id:string;family:string;title:T;summary:T;chapter:T;videoIds:string[];outcomes:T[];prereqIds:string[];concepts:{id:string;title:T}[];steps:Step[];questions:Question[];cards:Card[];sources:Ref[]};
export type Attempt={id:string;at:number;topic:string;item:string;correct:boolean;assisted:boolean;kind:'question'|'review'|'prediction'|'readiness'|'step';selfAssessed?:boolean};
export type FocusSession={id:string;start:number;end:number;topic:string;milliseconds:number};
export type Timer={id:string;mode:'focus'|'stopwatch'|'break';status:'running'|'paused'|'finished';topic:string;duration:number;accumulated:number;startedAt:number;segments:{start:number;end:number}[]};
export type Progress={step:number;tab:string;completed:string[];answers:Record<string,{draft:string;choice:number|null;hints:number;revealed:boolean}>;cards:Record<string,{due:number;interval:number}>;prereqs:Record<string,boolean>;predictions:Record<string,number>;errors:{id:string;problem:string;wrong:string;rule:string;retest:string;at:number}[]};
export type Notebook={version:1;topics:Record<string,Progress>;attempts:Attempt[];sessions:FocusSession[];timer:Timer|null;settings:{language:Lang;focus:number;break:number;sound?:boolean;desktopAlerts?:boolean};imports:string[];updatedAt:number};
export function text(t:T|undefined,lang:Lang){return t?.[lang]||t?.en||'';}
