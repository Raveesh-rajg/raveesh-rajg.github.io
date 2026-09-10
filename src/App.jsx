import { Navigation, Hero, Impact, Capabilities } from "./Foundation.jsx";
import HealthcareProjects from "./HealthcareProjects.jsx";
import Contact from "./Contact.jsx";
export default function App() {
  return (
    <>
      <a className="skip-link" href="#exhibits">
        Skip to projects
      </a>
      <Navigation />
      <main id="top">
        <Hero />
        <Impact />
        <HealthcareProjects />
        <Capabilities />
        <div id="contact-root">
          <Contact />
        </div>
      </main>
      <footer className="site-footer">
        <a className="brand" href="#top">
          rrg<span>↗</span>
        </a>
        <span>© {new Date().getFullYear()} Raveesh Raj Grandhi</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
