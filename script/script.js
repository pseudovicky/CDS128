const lenis = new Lenis({
  lerp: 0.04,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//GSAP For NavReveal
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

// Code for Image Reveal
const link = document.querySelectorAll(".link");
const linkHoverReveal = document.querySelectorAll(".hover-reveal");
const linkImages = document.querySelectorAll(".hidden-img");

for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("mousemove", (e) => {
    linkHoverReveal[i].style.opacity = 1;
    linkHoverReveal[i].style.transform = `translate(-100%, -50% ) rotate(5deg)`;
    linkImages[i].style.transform = "scale(1, 1)";
    linkHoverReveal[i].style.left = e.clientX + "px";
  });

  link[i].addEventListener("mouseleave", (e) => {
    linkHoverReveal[i].style.opacity = 0;
    linkHoverReveal[i].style.transform = `translate(-50%, -50%) rotate(-5deg)`;
    linkImages[i].style.transform = "scale(0.8, 0.8)";
  });
}