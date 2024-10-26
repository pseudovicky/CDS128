const lenis = new Lenis({
    lerp:.04,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.to("#nav", {
  backgroundColor: "rgba(0, 0, 0, 0.532)",
  duration: 0.5,
  height: "4.25rem",
  scrollTrigger: {
    trigger: "#nav",
    scroller: "body",
    // markers:true,
    start: "top -80",
    end: "top -70",
    scrub: 3,
  },
});