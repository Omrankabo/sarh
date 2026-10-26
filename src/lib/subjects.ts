import type {T} from './types';

export type Subject={
 id:string;
 title:T;
 description:T;
 semester:number;
 topicIds:string[];
 studyPlan?:T;
};

// Add future courses here; existing topic IDs and notebook records stay stable.
export const subjects:Subject[]=[{
 id:'structures-ii',
 title:{ar:'نظرية الإنشاءات II',en:'Theory of Structures II'},
 description:{ar:'من حركة المنشأ إلى القوى داخله. ابنِ فهمك للكمرات والإطارات وخطوط التأثير، ثم اختبره بالحل والتفسير.',en:'From structural movement to internal forces. Build your understanding of beams, frames and influence lines, then test it through calculation and explanation.'},
 semester:7,
 topicIds:['slope-beams','slope-nonsway','slope-sway','slope-inclined','distribution-beams','distribution-nonsway','distribution-sway','influence-qualitative','influence-numerical','influence-moving','models-beams','models-frames'],
},{
 id:'engineering-economics',
 title:{ar:'الاقتصاد الهندسي',en:'Engineering Economics'},
 description:{ar:'حوّل قرارات التكلفة والزمن إلى قصة تفهمها: ارسم التدفقات، اختر المعادلة، ثم احسب وفسّر القرار. يشمل فصول المقرر الستة وتطبيقات تدريبية إضافية.',en:'Turn cost and timing decisions into a story: draw the cash flows, choose a model, then calculate and explain the decision. Covers the six lecture chapters with additional exam-transfer practice.'},
 semester:7,
 topicIds:['ee-foundations','ee-markets','ee-interest-context','ee-single-payments','ee-uniform-series','ee-gradients','ee-rates','ee-continuous-flows','ee-equivalence','ee-depreciation','ee-worth','ee-irr-payback','ee-capitalized-prospective','ee-fe-pe','ee-risk-inventory'],
 studyPlan:{en:'Week 1: decisions, markets and the interest-context chapter; then single payments. Week 2: equal payments, gradients, rate conversion and timing. Week 3: continuous flows, depreciation and worth comparisons. Week 4: IRR, payback, capitalized/prospective value, then mixed tutorial and exam practice. In each session: explain one idea from memory, draw its timeline, solve an unseen numerical variant, and repair one error. Start with the readiness checks; shorten a session only after you can explain both the formula and its limits.',ar:'الأسبوع ١: القرار والسوق وفصل سياق الفائدة، ثم الدفعات المفردة. الأسبوع ٢: الدفعات المنتظمة والتدرج وتحويل المعدلات والتوقيت. الأسبوع ٣: التدفقات المستمرة والإهلاك ومقارنة القيم. الأسبوع ٤: العائد والاسترداد والقيمة الرأسمالية والمستقبلية، ثم تدريب مختلط من التمارين والاختبارات. في كل جلسة: اشرح فكرة من الذاكرة، وارسم خطها الزمني، وحل مسألة متغيرة، وأصلح خطأ واحدًا. ابدأ بفحص المتطلبات؛ لا تختصر الجلسة قبل شرح المعادلة وحدودها.'},
}];

export const topicFamilies=[
 {id:'slope',en:'Slope-deflection',ar:'الانحدار والانحراف'},
 {id:'distribution',en:'Moment distribution',ar:'توزيع العزوم'},
 {id:'influence',en:'Influence lines',ar:'خطوط التأثير'},
 {id:'models',en:'Structural models',ar:'النماذج الإنشائية'},
 {id:'ee-foundations',en:'Decisions, markets & context',ar:'القرار والسوق والسياق'},
 {id:'ee-cashflows',en:'Cash-flow building blocks',ar:'لبنات التدفقات النقدية'},
 {id:'ee-timing',en:'Rates, timing & continuous flows',ar:'المعدلات والتوقيت والتدفقات المستمرة'},
 {id:'ee-assets',en:'Asset value & depreciation',ar:'قيمة الأصل والإهلاك'},
 {id:'ee-comparison',en:'Project comparison',ar:'مقارنة المشروعات'},
 {id:'ee-transfer',en:'FE/PE transfer practice',ar:'تطبيقات إضافية لـ FE وPE'},
];

export function subjectForTopic(topicId:string){return subjects.find(s=>s.topicIds.includes(topicId));}
