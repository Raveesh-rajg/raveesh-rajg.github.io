import { createContext, useContext, useState } from "react";
const ViewContext = createContext(null);
export const useView = () => useContext(ViewContext);
export function ViewProvider({ children }) {
  const [mode, setMode] = useState("recruiter");
  const [evidence, setEvidence] = useState(false);
  return (
    <ViewContext.Provider value={{ mode, setMode, evidence, setEvidence }}>
      {children}
    </ViewContext.Provider>
  );
}
export function Evidence({ children, href, label = "Source & method" }) {
  const { evidence } = useView();
  return (
    <aside className="evidence-note" hidden={!evidence}>
      <span className="evidence-note-label">PROVENANCE</span>
      <p>{children}</p>
      <a href={href} target="_blank" rel="noreferrer">
        {label} ↗
      </a>
    </aside>
  );
}
export function ViewControls() {
  const { mode, setMode, evidence, setEvidence } = useView();
  return (
    <div className="view-controls">
      <div className="view-options" role="group" aria-label="Reading depth">
        <button
          aria-pressed={mode === "recruiter"}
          onClick={() => setMode("recruiter")}
        >
          Recruiter <span>Overview</span>
        </button>
        <button aria-pressed={mode === "deep"} onClick={() => setMode("deep")}>
          Deep Dive <span>Methods & code</span>
        </button>
      </div>
      <button
        className="evidence-toggle"
        role="switch"
        aria-checked={evidence}
        onClick={() => setEvidence(!evidence)}
      >
        <span className="toggle-track" aria-hidden="true">
          <i />
        </span>
        Evidence <b>{evidence ? "On" : "Off"}</b>
      </button>
    </div>
  );
}
