import { motion, useReducedMotion } from "framer-motion";
export const ease = [0.22, 1, 0.36, 1];
export function Arrow({ diagonal = false }) {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function Reveal({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : 0.4, ease }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({ number, label, title, italic, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number} /</span> {label}
        </p>
        <h2>
          {title} <em>{italic}</em>
        </h2>
      </div>
      {children && <div className="section-aside">{children}</div>}
    </div>
  );
}
