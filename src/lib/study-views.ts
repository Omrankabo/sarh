import type {Notebook,Progress,TopicIndex,Card} from './types';

/** Unseen cards are learning opportunities, never overdue obligations. */
export function cardQueues(cards:Card[],progress:Progress|undefined,now:number){
 const due=cards.filter(c=>progress?.cards[c.id]!==undefined&&progress.cards[c.id].due<=now);
 const unseen=cards.filter(c=>progress?.cards[c.id]===undefined);
 return {due,unseen};
}
export function reviewSummary(topics:TopicIndex[],book:Notebook,now:number){
 return topics.reduce((sum,t)=>{const q=cardQueues(t.cards,book.topics[t.id],now);return {due:sum.due+q.due.length,unseen:sum.unseen+q.unseen.length};},{due:0,unseen:0});
}
export function nextStudy(topics:TopicIndex[],book:Notebook){
 const recent=[...book.attempts].reverse().find(a=>topics.some(t=>t.id===a.topic));
 const started=topics.find(t=>{const p=book.topics[t.id];return p&&(p.step>0||p.completed.length>0||p.tab!=='start')&&p.completed.length<t.steps.length;});
 const topic=topics.find(t=>t.id===recent?.topic)||started||topics[0];
 const p=book.topics[topic.id],step=Math.min(p?.step||0,topic.steps.length-1);
 const active=!!recent||!!p&&(p.step>0||p.completed.length>0||p.tab!=='start');
 return {topic,step,completed:p?.completed.length||0,active,tab:active?(p?.tab||'story'):'start'};
}
