import fs from 'node:fs';
import { renderHome, renderProjects, currentTitle } from './.prerender/prerender.js';
const template=fs.readFileSync('dist/index.html','utf8');
if(!template.includes('<div id="root"></div>')) throw Error('Missing prerender mount');
const home=template.replace('<div id="root"></div>',`<div id="root">${renderHome()}</div>`).replace(/"jobTitle":\s*"[^"]+"/,`"jobTitle": "${currentTitle}"`);
fs.writeFileSync('dist/index.html',home);
const archive=template.replace('<div id="root"></div>',`<div id="root">${renderProjects()}</div>`).replace(/<script type="module"[^>]*><\/script>/g,'').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'').replace(/<title>.*?<\/title>/,'<title>All 20 Projects | Raveesh Raj Grandhi</title>').replace('href="https://raveesh-rajg.github.io/"','href="https://raveesh-rajg.github.io/projects.html"');
fs.writeFileSync('dist/projects.html',archive);
console.log('Prerendered home, four static charts, and 20-project directory.');
