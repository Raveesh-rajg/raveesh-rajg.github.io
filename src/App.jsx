import { motion, useScroll, useSpring } from "framer-motion";
import { ViewProvider } from "./ViewContext.jsx";
import {
  Navigation,
  Hero,
  Impact,
  Capabilities,
  Disclosure,
  Practice,
  Profile,
} from "./Foundation.jsx";
import Flagship from "./Flagship.jsx";
import SelectedWork from "./SelectedWork.jsx";
import Archive from "./Archive.jsx";
import Contact from "./Contact.jsx";
function Portfolio() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <a className="skip-link" href="#exhibits">
        Skip to selected work
      </a>
      <Navigation />
      <main id="top">
        <Hero />
        <Impact />
        <Flagship />
        <SelectedWork />
        <Capabilities />
        <Disclosure
          id="practice"
          title="How I work"
          description="Four principles. One question: how do you know?"
        >
          <Practice />
        </Disclosure>
        <Profile />
        <Disclosure
          id="archive"
          title="The complete project archive"
          description="20 public projects · Search, filter, and inspect the evidence"
        >
          <Archive />
        </Disclosure>
        <Contact />
      </main>
      <footer className="site-footer">
        <a className="brand" href="#top">
          rrg<span>↗</span>
        </a>
        <span>© {new Date().getFullYear()} Raveesh Raj Grandhi</span>
        <span>Thoughtful systems. Meaningful decisions.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
export default function App() {
  return (
    <ViewProvider>
      <Portfolio />
    </ViewProvider>
  );
}
