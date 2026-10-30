/** Both shapes stay mounted so rapid play/pause changes can retarget cleanly. */
export default function TimerControlIcon({running}:{running:boolean}){
 return <svg className="play-pause-icon" data-running={running} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path className="play-shape" d="M6 3.5 16 10 6 16.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><g className="pause-shape" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 4v12M13 4v12"/></g></svg>;
}
