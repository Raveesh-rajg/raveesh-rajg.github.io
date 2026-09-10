import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import App from './App.jsx';
import { archive } from './content.js';
import { currentTitle } from './identity.js';
export { currentTitle };
export const renderHome=()=>renderToString(<App/>);
export const renderProjects=()=>renderToStaticMarkup(<main className="archive-page"><a className="text-link" href="./">← Back to portfolio</a><h1>All 20 projects</h1><p>Public code, methods, and reproducible results.</p><div className="archive-list">{archive.map(([n,title,field,result,repo])=><a key={repo} href={'https://github.com/Raveesh-rajg/'+repo} target="_blank" rel="noreferrer"><span>{n}</span><strong>{title}</strong><span>{field}</span><span>{result}</span></a>)}</div></main>);