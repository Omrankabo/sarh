import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {memo} from 'react';

const StudyMarkdown=memo(function StudyMarkdown({children}:{children:string}){
 return <div className="study-prose"><Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={{
  pre:({children})=><pre dir="ltr" tabIndex={0}>{children}</pre>,
  a:({children,href})=><a href={href} target={href?.startsWith('https:')?'_blank':undefined} rel="noreferrer">{children}</a>,
 }}>{children}</Markdown></div>;
});
export default StudyMarkdown;
