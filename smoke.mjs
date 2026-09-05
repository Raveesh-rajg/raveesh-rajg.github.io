// Exercise the production bundle in both motion preferences. No messages are sent.
import { JSDOM } from "jsdom";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const html = fs.readFileSync("dist/index.html", "utf8");
const bundle = fs.readFileSync(
  path.join("dist", html.match(/src="\.\/([^\"]+\.js)"/)[1]),
  "utf8",
);
let checks = 0;
function check(name, condition) {
  assert.ok(condition, name);
  checks++;
  console.log(`PASS ${name}`);
}
for (const reduced of [false, true]) {
  const dom = new JSDOM(html.replace(/<script[^>]*><\/script>/g, ""), {
    url: "https://raveesh-rajg.github.io/",
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });
  const { window: w } = dom;
  w.matchMedia = (q) => ({
    matches: reduced && q.includes("reduced-motion"),
    media: q,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  });
  w.IntersectionObserver = class {
    constructor(cb) {
      this.cb = cb;
    }
    observe(target) {
      this.cb([{ isIntersecting: true, target }], this);
    }
    unobserve() {}
    disconnect() {}
  };
  w.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  w.scrollTo = () => {};
  const rotations = new Map();
  const nativeInterval = w.setInterval.bind(w);
  const nativeClear = w.clearInterval.bind(w);
  w.setInterval = (callback, delay, ...args) => {
    const id = nativeInterval(callback, delay, ...args);
    if (delay === 6000) rotations.set(id, callback);
    return id;
  };
  w.clearInterval = (id) => { rotations.delete(id); nativeClear(id); };
  const errors = [];
  w.addEventListener("error", (e) => errors.push(e.error || e.message));
  w.eval(bundle);
  const settle = () => new Promise((r) => setTimeout(r, 60));
  await settle();
  const d = w.document;
  const $ = (s) => d.querySelector(s);
  const all = (s) => [...d.querySelectorAll(s)];
  const click = async (s) => {
    $(s).click();
    await settle();
  };
  const text = (s) => $(s)?.textContent.replace(/\s+/g, " ").trim();
  check(
    `renders without errors (reduced motion ${reduced})`,
    $("#root").children.length > 0 && errors.length === 0,
  );
  check(
    "hero has correct narrative and word spacing",
    text("h1") === "I build data systems people can trust.",
  );
  check(
    "four professional metrics precede flagship",
    all(".impact-grid > div").length === 4 &&
      $("#impact").nextElementSibling.id === "exhibits",
  );
  check("opening positions BI and business analysis across industries", text('.hero-description').includes('Business intelligence. Business analysis.') && !text('.hero-description').includes('Healthcare') && text('.nav-caption').includes('BUSINESS INTELLIGENCE'));
  check("rotating statements reserve four accessible choices", all('.statement-lines p').length === 4 && all('.statement-dots button').length === 4 && all('.statement-lines p[aria-hidden=false]').length === 1);
  await click('.statement-dots button:nth-child(3)');
  check("readers can select a statement", text('.statement-lines .is-current') === 'Turn business problems into measurable progress.');
  if (reduced) {
    check("reduced motion disables automatic rotation and ambient motion", rotations.size === 0 && $('.refined-hero').dataset.motion === 'paused' && !$('.hero-motion-toggle'));
  } else {
    check("statement automatically advances", rotations.size === 1);
    [...rotations.values()][0](); await settle();
    check("rotation updates the selected statement", text('.statement-lines .is-current') === 'Build the insight. Make the next move clear.');
    await click('.hero-motion-toggle');
    check("pause stops the timer and background motion", rotations.size === 0 && $('.refined-hero').dataset.motion === 'paused');
    await click('.hero-motion-toggle');
    check("resume restarts motion", rotations.size === 1 && $('.refined-hero').dataset.motion === 'running');
    Object.defineProperty(d, 'hidden', {configurable:true, value:true});
    d.dispatchEvent(new w.Event('visibilitychange')); await settle();
    check("hidden tabs suspend motion", rotations.size === 0 && $('.refined-hero').dataset.motion === 'paused');
    Object.defineProperty(d, 'hidden', {configurable:true, value:false});
    d.dispatchEvent(new w.Event('visibilitychange')); await settle();
  }
  check(
    "Recruiter default is compact",
    all(".project-card").length === 2 &&
      !$(".flagship-story").open &&
      all(".depth-section details[open]").length === 0,
  );
  check("all twenty projects preserved", all(".archive-row").length === 20);
  check(
    "three capabilities and career stages",
    all(".capability-tabs button").length === 3 &&
      all(".career-thread li").length === 3,
  );
  check(
    "portrait preserved",
    $(".profile-portrait img").alt === "Raveesh Raj Grandhi",
  );
  check(
    "internal links resolve",
    all('a[href^="#"]').every((a) => d.getElementById(a.hash.slice(1))),
  );
  check(
    "IDs unique",
    new Set(all("[id]").map((e) => e.id)).size === all("[id]").length,
  );
  check(
    "resume, social preview, robots and local fonts present",
    [
      "resume.pdf",
      "og-card.png",
      "robots.txt",
      "fonts/dm-sans-normal-0.woff2",
    ].every((p) => fs.existsSync("dist/" + p)),
  );
  check(
    "Formspree endpoint preserved",
    $("form").action === "https://formspree.io/f/mlgqdlnd" &&
      $("form").method === "post",
  );
  check(
    "native contact validation preserved",
    all("form [required]").length === 4 &&
      $("input[name=email]").type === "email" &&
      $("textarea").minLength === 20,
  );
  await click(".menu-toggle");
  check(
    "mobile menu opens",
    $(".menu-toggle").getAttribute("aria-expanded") === "true",
  );
  w.dispatchEvent(new w.KeyboardEvent("keydown", { key: "Escape" }));
  await settle();
  check(
    "Escape closes and restores focus",
    $(".menu-toggle").getAttribute("aria-expanded") === "false" &&
      d.activeElement.className === "menu-toggle",
  );
  await click(".evidence-toggle");
  check(
    "Evidence exposes annotations",
    $(".evidence-toggle").getAttribute("aria-checked") === "true" &&
      all(".evidence-note:not([hidden])").length >= 7,
  );
  await click(".quarantine");
  check(
    "quarantine reasons reconcile to 98",
    !$("#claim-reasons").hidden &&
      all("#claim-reasons b").reduce((n, e) => n + Number(e.textContent), 0) ===
        98,
  );
  await click(".experiment-selector button:nth-child(2)");
  check(
    "always-valid shows 6 of 500",
    all(".false-positive").length === 6 &&
      text(".sampling-viz").includes("1.2%"),
  );
  await click(".experiment-selector button:first-child");
  check(
    "naive peeking shows 120 of 500",
    all(".false-positive").length === 120 &&
      all(".sampling-viz rect").length === 500,
  );
  await click(".more-systems");
  check(
    "Recruiter can expand supporting work",
    all(".project-card").length === 5,
  );
  await click(".question-choices button:nth-child(2)");
  check(
    "quantitative question selects guarded SQL",
    text(".route-active").includes("Guarded SQL"),
  );
  await click(".telemetry-line button:nth-of-type(2)");
  check(
    "retry evidence appears",
    text(".telemetry-readout").includes("195") &&
      text(".telemetry-readout").includes("5.3"),
  );
  check(
    "growth comparison has cohort caveat",
    text(".cohort-viz").includes("45.3%") &&
      text(".cohort-viz").includes("18.2%") &&
      text(".cohort-viz").includes("Recent signups are excluded"),
  );
  await click(".view-options button:nth-child(2)");
  check(
    "Deep Dive opens all stories",
    $(".flagship-story").open &&
      all(".depth-section details[open]").length === 2 &&
      all(".story-scene").length === 6,
  );
  await click(".scene-select");
  check(
    "flagship can be selected without scrolling",
    text(".story-stage-label").includes("01 / 06"),
  );
  await click(".method-choices button:nth-child(3)");
  check(
    "method shows a concrete quality gate",
    text(".method-state").includes("clean + quarantine"),
  );
  await click(".capability-tabs button:nth-child(3)");
  check(
    "capability keeps three relevant project links",
    all(".role-lens-projects a").length === 3,
  );
  all(".archive-filters button")
    .find((b) => b.textContent === "Healthcare")
    .click();
  await settle();
  check(
    "Healthcare filter returns two projects",
    all(".archive-row").length === 2,
  );
  all(".archive-filters button")
    .find((b) => b.textContent === "All")
    .click();
  await settle();
  const search = $("input[type=search]");
  const setValue = Object.getOwnPropertyDescriptor(
    w.HTMLInputElement.prototype,
    "value",
  ).set;
  setValue.call(search, "nonexistent-project-xyz");
  search.dispatchEvent(new w.Event("input", { bubbles: true }));
  await settle();
  check(
    "search has actionable empty state",
    all(".archive-row").length === 0 && Boolean($(".archive-empty button")),
  );
  await click(".archive-empty button");
  check("clear restores all projects", all(".archive-row").length === 20);
  setValue.call(search, "Hospital Rate");
  search.dispatchEvent(new w.Event("input", { bubbles: true }));
  await settle();
  check(
    "search finds matching project",
    all(".archive-row").length === 1 &&
      text(".archive-row").includes("Hospital Rate"),
  );
  await click(".view-options button:first-child");
  check(
    "Recruiter collapses long stories again",
    !$(".flagship-story").open &&
      all(".depth-section details[open]").length === 0,
  );
  const form = $("form");
  let sent;
  w.fetch = async (url, options) => {
    sent = { url, options };
    return {
      ok: false,
      json: async () => ({ errors: [{ message: "Please try again." }] }),
    };
  };
  form.dispatchEvent(
    new w.Event("submit", { bubbles: true, cancelable: true }),
  );
  await settle();
  check(
    "contact failure recoverable",
    Boolean($("[role=alert]")) && !$("button[type=submit]").disabled,
  );
  check(
    "contact subject preserved",
    sent.options.body.get("_subject") ===
      "Portfolio inquiry for Raveesh Raj Grandhi",
  );
  w.fetch = async () => {
    throw Error("offline");
  };
  form.dispatchEvent(
    new w.Event("submit", { bubbles: true, cancelable: true }),
  );
  await settle();
  check(
    "network failure explains recovery",
    text("[role=alert]").includes("network interrupted"),
  );
  w.fetch = async () => ({ ok: true });
  form.dispatchEvent(
    new w.Event("submit", { bubbles: true, cancelable: true }),
  );
  await settle();
  check(
    "successful contact displays confirmation",
    Boolean($(".contact-success[role=status]")),
  );
  await click(".contact-success button");
  check("contact can be reused", Boolean($("form")));
  check("no interaction errors", errors.length === 0);
  dom.window.close();
}
console.log(`${checks} checks passed. No external form submissions were made.`);
