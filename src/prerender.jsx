import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import App from './App.jsx';
import { archive } from './content.js';
import { projectStatus } from './project-status.js';
import { currentTitle } from './identity.js';
export { currentTitle };
export const renderHome=()=>renderToString(<App/>);
export const renderProjects=()=>renderToStaticMarkup(
  <main className="archive-page">
    <a className="text-link" href="./">← Back to portfolio</a>
    <h1>All 20 projects</h1>
    <p>Inspect the implementation, download the artifacts, and see what has actually been tested.</p>
    <div className="artifact-shelf" aria-label="Downloadable project artifacts">
      <a href="https://github.com/Raveesh-rajg/excel-powerquery-casestudy/blob/main/Finance-Automation.xlsx"><span>EXCEL / FINANCE</span><strong>Open the working workbook ↗</strong><small>Formula totals and region filters verified. Synthetic data.</small></a>
      <a href="https://github.com/Raveesh-rajg/powerbi-dax-showcase/tree/main/ExecutiveRevenue"><span>POWER BI / REVENUE</span><strong>Inspect the Power BI project ↗</strong><small>Four pages authored. Desktop validation pending.</small></a>
      <a href="https://github.com/Raveesh-rajg/tableau-storytelling/blob/main/GlobalHealth.twbx"><span>TABLEAU / PUBLIC DATA</span><strong>Download the Tableau workbook ↗</strong><small>Four worksheets packaged. Native rendering pending.</small></a>
    </div>
    <figure className="workbook-proof"><img src="./finance-workbook.png" width="1502" height="515" loading="lazy" alt="Actual generated Excel workbook: monthly revenue versus budget, a region selector and a source-reconciled total"/><figcaption>Finance workbook preview · $857,565.60 synthetic revenue reconciled to 1,412 source orders.</figcaption></figure>
    <p className="archive-guide">Local checks verify the supplied code and test data. Cloud deployment and native BI validation are listed separately for each project.</p>
    <div className="archive-list">{archive.map(([n,title,field,result,repo])=>{
      const status=projectStatus[repo];
      return <a key={repo} href={'https://github.com/Raveesh-rajg/'+repo} target="_blank" rel="noreferrer"><span>{n}</span><strong>{title}<small>{field}</small></strong><span>{status.evidence}</span><span className="project-validation"><b>{status.status}</b><small>{status.boundary}</small></span></a>
    })}</div>
    <p className="archive-guide"><a className="text-link" href="https://github.com/Raveesh-rajg/Data-portfolio-projects">Full completion audit and CI links ↗</a></p>
  </main>
);
