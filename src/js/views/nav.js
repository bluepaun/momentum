import anime from "animejs/lib/anime.es.js";

const nav = document.querySelector("nav");
const buttons = nav.querySelectorAll("button:not(.plus)");
const plusbtn = nav.querySelector(".plus");
const plusInputBox = nav.querySelector(".input-box");
const inputForm = plusInputBox.querySelector("form");
const inputText = inputForm.querySelector("input");

const callbacks = {
  selectMenu: function (menu) {},
  disableMenu: function () {},
  plusItem: function (item) {},
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

function showInputBox(on) {
  if (on) {
    inputText.disabled = false;
    anime({
      targets: "nav .input-box",
      top: "-170%",
      duration: 600,
    });
  } else {
    inputText.disabled = true;
    anime({
      targets: "nav .input-box",
      top: "100%",
      duration: 600,
    });
  }
}

function changePlusBtnState(on) {
  if (on) {
    anime({
      targets: "nav .plus i",
      rotate: 360 + 45,
      duration: 600,
    });
    plusbtn.dataset.menu = "cancel";
  } else {
    anime({
      targets: "nav .plus i",
      rotate: -360,
      duration: 600,
    });
    plusbtn.dataset.menu = "plus";
  }
}

plusbtn.addEventListener("click", (e) => {
  const state = e.target.dataset.menu;
  if (state === "plus") {
    changePlusBtnState(true);
    showInputBox(true);
    inputText.focus();
  } else {
    changePlusBtnState(false);
    showInputBox(false);
  }
});

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = inputText.value;
  callbacks.plusItem(text);
  inputText.value = "";
  changePlusBtnState(false);
  showInputBox(false);
});

export default {
  setCallback: function (name, func) {
    callbacks[name] = func;
  },
};
