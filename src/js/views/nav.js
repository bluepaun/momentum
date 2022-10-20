import anime from "animejs/lib/anime.es.js";

const nav = document.querySelector("nav");
const buttons = nav.querySelectorAll("button:not(.plus)");

const callbacks = {
  selectMenu: function (menu) {
    console.log(menu);
  },
  disableMenu: function () {
    console.log("disable");
  },
};

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
      callbacks.disableMenu();
      return true;
    }

    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    callbacks.selectMenu(e.target.dataset.menu);
    anime({
      targets: "nav .effect",
      left: `${x}px`,
      opacity: "1",
      duration: 600,
    });
  });
});

export default {
  setCallback: function (name, func) {
    callbacks[name] = func;
  },
};
