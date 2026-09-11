import React from "react";
import { hydrateRoot } from "react-dom/client";
import Contact from "./Contact.jsx";
import "./fonts.css";
import "./performance.css";
import "./future.css";
import "./contact-preserved.css";
// All page content and charts are HTML. Only the unchanged form is hydrated.
hydrateRoot(document.getElementById("contact-root"), <Contact />);
const menu = document.querySelector(".menu-toggle");
const nav = document.getElementById("navigation");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  menu.textContent = "Menu +";
  nav.classList.remove("is-open");
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "Close −" : "Menu +";
  nav.classList.toggle("is-open", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) closeMenu();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});
// One observer; no layout reads or scroll listeners.
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));
}
