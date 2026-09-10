import { useEffect, useRef } from "react";

const stages = [
  {
    label: "Source",
    title: "Start with the business question.",
    detail: "Transactions · events · operations",
    caption: "Find the question behind the data.",
  },
  {
    label: "Structure",
    title: "Make the definitions hold together.",
    detail: "Grain · quality · shared metrics",
    caption: "Give complexity a reliable structure.",
  },
  {
    label: "Signal",
    title: "Find what changes the decision.",
    detail: "Patterns · drivers · trade-offs",
    caption: "Separate useful insight from noise.",
  },
  {
    label: "Decision",
    title: "Make the next move clear.",
    detail: "Reporting · action · measurement",
    caption: "Put the evidence where it matters.",
  },
];

export default function SignalSculpture({ stage, running, reduced }) {
  const frame = useRef(null);
  const raf = useRef(0);
  const reset = () => {
    cancelAnimationFrame(raf.current);
    frame.current?.style.setProperty("--lean-x", "0deg");
    frame.current?.style.setProperty("--lean-y", "0deg");
  };
  useEffect(() => {
    if (!running || reduced) reset();
    return () => cancelAnimationFrame(raf.current);
  }, [running, reduced]);
  const follow = (event) => {
    if (
      !running ||
      reduced ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(
      -1,
      Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2),
    );
    const y = Math.max(
      -1,
      Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2),
    );
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      frame.current?.style.setProperty("--lean-y", `${x * 4}deg`);
      frame.current?.style.setProperty("--lean-x", `${-y * 3}deg`);
    });
  };
  return (
    <figure
      className="signal-system signal-composition"
      data-stage={stage}
      onPointerMove={follow}
      onPointerLeave={reset}
    >
      <div className="signal-index">
        <span>FIG. 01</span>
        <span>THE DECISION SYSTEM</span>
        <i aria-hidden="true" />
      </div>
      <div className="sculpture-viewport" ref={frame}>
        <svg
          className="sculpture-calibration"
          viewBox="0 0 600 600"
          aria-hidden="true"
        >
          <circle cx="300" cy="300" r="256" />
          <circle cx="300" cy="300" r="268" className="calibration-outer" />
          {Array.from({ length: 60 }, (_, i) => {
            const a = (i * Math.PI) / 30;
            const r = i % 5 === 0 ? 247 : 252;
            return (
              <line
                key={i}
                x1={300 + Math.sin(a) * r}
                y1={300 - Math.cos(a) * r}
                x2={300 + Math.sin(a) * 260}
                y2={300 - Math.cos(a) * 260}
              />
            );
          })}
          <circle
            className="signal-progress-arc"
            cx="300"
            cy="300"
            r="268"
            pathLength="100"
            strokeDasharray={`${(stage + 1) * 25} 100`}
            transform="rotate(-90 300 300)"
          />
        </svg>
        <div className="sculpture-light" aria-hidden="true" />
        <div className="signal-sculpture">
          <img
            src="./signal.webp"
            alt=""
            width="1536"
            height="1024"
            fetchpriority="high"
          />
        </div>
        <div className="sculpture-word" aria-hidden="true">
          {stages[stage].label}
        </div>
      </div>
      <figcaption>
        <div className="signal-chapters" aria-hidden="true">
          {stages.map((s, i) => (
            <span key={s.label} className={i === stage ? "current" : ""}>
              <small>0{i + 1}</small>
              {s.label}
            </span>
          ))}
        </div>
        <div className="signal-caption-stack" aria-live="off">
          {stages.map((s, i) => (
            <div
              key={s.label}
              aria-hidden={i !== stage}
              className={i === stage ? "current" : ""}
            >
              <p>{s.title}</p>
              <span>{s.detail}</span>
            </div>
          ))}
        </div>
        <span className="signal-art-note">
          A working philosophy, illustrated.
        </span>
      </figcaption>
    </figure>
  );
}
