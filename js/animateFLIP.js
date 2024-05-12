export function animateFlip(el, options, callBack) {
  let cur = el.getBoundingClientRect();
  el.style.transition = "";
  el.id = "full_screen";
  let after = el.getBoundingClientRect();
  el.id = "";

  let ht = after.height / cur.height;
  let wt = after.width / cur.width;
  let lt = after.left - cur.left;
  let tp = after.top - cur.top;
  if (typeof options.beforeAnimation === "function") {
    options.beforeAnimation();
  }
  el.style.background = "var(--clr-primary)";
  el.style.color = "var(--clr-primary)";
  el.style.border = "none";
  el.style.transition = options.duration || ".5s ease-out";
  el.style.transitionProperty = options.property || "transform, opacity";
  el.style.transformOrigin = options.origin || "top left";
  el.style.zIndex = 300;

  requestAnimationFrame(() => {
    el.style.transform =
      "translate(" + lt + "px, " + tp + "px) scale(" + wt + ", " + ht + ")";
  });

  el.addEventListener("transitionend", function afterTransition(e) {
    if (typeof callBack === "function") {
      callBack();
    }
    el.removeEventListener("transitionend", afterTransition);
  });
}
