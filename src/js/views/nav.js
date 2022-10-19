import anime from "animejs/lib/anime.es.js";

const nav = document.querySelector("nav");
const buttons = nav.querySelectorAll("button:not(.plus)");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const x = e.target.offsetLeft;
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active");
      anime({
        targets: "nav .effect",
        opacity: "0",
        duration: 600,
      });
      return true;
    }

    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    console.log(anime);
    anime({
      targets: "nav .effect",
      left: `${x}px`,
      opacity: "1",
      duration: 600,
    });
  });
});
