const header = document.getElementById("site-header"),
menuButton = document.getElementById("menu-button"),
mobileMenu = document.getElementById("mobile-menu");

window.addEventListener(
"scroll",
() => {
// Efeito da navbar ao rolar
header.classList.toggle("nav-scrolled", scrollY > 20);

// Fecha o menu mobile ao rolar
if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
  mobileMenu.classList.add("hidden");
  menuButton?.setAttribute("aria-expanded", "false");
}

},
{ passive: true }
);

// ===============================
// MENU MOBILE
// ===============================

menuButton?.addEventListener("click", () => {
const open = menuButton.getAttribute("aria-expanded") === "true";

menuButton.setAttribute("aria-expanded", String(!open));
mobileMenu.classList.toggle("hidden", open);
});

// Fecha o menu ao clicar em qualquer lugar fora dele
document.addEventListener("click", (event) => {
if (!mobileMenu || !menuButton) return;

const clicouNoMenu = mobileMenu.contains(event.target);
const clicouNoBotao = menuButton.contains(event.target);

if (!clicouNoMenu && !clicouNoBotao) {
mobileMenu.classList.add("hidden");
menuButton.setAttribute("aria-expanded", "false");
}
});

// Fecha o menu ao clicar em algum link
document.querySelectorAll("#mobile-menu a").forEach((a) =>
a.addEventListener("click", () => {
mobileMenu.classList.add("hidden");
menuButton.setAttribute("aria-expanded", "false");
})
);

// ===============================
// ANIMAÇÕES DE ENTRADA
// ===============================

const observer = new IntersectionObserver(
(es) =>
es.forEach((e) => {
if (e.isIntersecting) {
e.target.classList.add("is-visible");
observer.unobserve(e.target);
}
}),
{ threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((e, i) => {
e.style.transitionDelay = `${Math.min(i % 5, 4) * 70}ms`;
observer.observe(e);
});

// ===============================
// ACCORDION / SERVIÇOS
// ===============================

document.querySelectorAll("[data-service]").forEach((s) => {
const b = s.querySelector("button");

b.addEventListener("click", () => {
const open = s.classList.contains("is-open");

document.querySelectorAll("[data-service]").forEach((x) => {
  x.classList.remove("is-open");
  x.querySelector("button")?.setAttribute("aria-expanded", "false");
});

if (!open) {
  s.classList.add("is-open");
  b.setAttribute("aria-expanded", "true");
}

});
});

// ===============================
// TIMELINE
// ===============================

const timeline = document.getElementById("progress-timeline");

if (timeline) {
const io = new IntersectionObserver(
(es) =>
es.forEach((e) => {
if (e.isIntersecting) {
timeline.classList.add("is-animated");
io.unobserve(timeline);
}
}),
{ threshold: 0.35 }
);

io.observe(timeline);
}
