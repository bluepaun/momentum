const callbacks = {};
const HIDDEN_CLASSNAME = "hidden";

const welcomeSection = document.querySelector(".welcome");
const welcomeTitle = welcomeSection.querySelector("h1");

const showWelcome = (on, name) => {
  if (on) {
    welcomeSection.classList.remove(HIDDEN_CLASSNAME);
    welcomeTitle.innerText = `Welcome ${name}`;
  } else {
    welcomeSection.classList.add(HIDDEN_CLASSNAME);
  }
};

const assignSection = document.querySelector(".assign");
const assignForm = assignSection.querySelector("form");
const assignInput = assignForm.querySelector("input");

assignForm.mycallback = (name) => {
  callbacks.assigncallback(name);
};

const showAssign = (on) => {
  if (on) {
    assignSection.classList.remove(HIDDEN_CLASSNAME);
  } else {
    assignSection.classList.add(HIDDEN_CLASSNAME);
  }
};

assignForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = assignInput.value;
  console.log(name);
  assignInput.value = "";
});

const setcallback = (callbackName, func) => {
  callbacks[callbackName] = func;
};

export default {
  showAssign: showAssign,
  showWelcome: showWelcome,
  setcallback: setcallback,
};
