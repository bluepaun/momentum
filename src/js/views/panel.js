import anime from "animejs/lib/anime.es.js";
const panel = document.querySelector(".panel");
const titleHeader = panel.querySelector("header");
const ul = panel.querySelector("ul");

let currentShowing = false;
const callbacks = {
  deleteItem: (id) => {},
  checkItem: (id, checked) => {},
};

function setPanelTitle(title) {
  titleHeader.innerText = title;
}

function createListItem(data) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const checkIcon = document.createElement("i");
  const span = document.createElement("span");
  const button = document.createElement("button");
  const trashIcon = document.createElement("i");
  span.innerText = data.text;
  checkIcon.classList.add("bx");
  checkIcon.classList.add("bx-check");
  label.setAttribute("for", data.id);
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", data.id);
  input.checked = data.checked;
  input.addEventListener("click", (e) => {
    const id = e.target.id;
    const checked = e.target.checked;
    callbacks.checkItem(parseInt(id), checked);
  });
  trashIcon.classList.add("bx");
  trashIcon.classList.add("bx-trash");
  button.appendChild(trashIcon);
  button.addEventListener("click", (e) => {
    const label = e.target.parentElement;
    const li = label.parentElement;
    const id = label.attributes.for.value;
    callbacks.deleteItem(parseInt(id));
    anime({
      targets: li,
      translateX: 100000,
      duration: 600,
      complete: function (anim) {
        li.remove();
      },
    });
  });
  li.appendChild(input);
  label.appendChild(checkIcon);
  label.appendChild(span);
  label.appendChild(button);
  li.appendChild(label);
  return li;
}

function updatePanelData(datas) {
  ul.innerHTML = "";
  datas.forEach((data) => {
    const li = createListItem(data);
    ul.appendChild(li);
  });
}

function isShow() {
  return currentShowing;
}

function showPanel(on) {
  currentShowing = on;
  if (on) {
    anime({
      targets: ".panel",
      bottom: "4rem",
    });
  } else {
    anime({
      targets: ".panel",
      bottom: "-100%",
    });
  }
}

const testdatas = [
  {
    id: 123,
    text: "hello test 1",
    checked: false,
  },
  {
    id: 220,
    text: "hello test 2",
    checked: true,
  },
];

updatePanelData(testdatas);

export default {
  showPanel: showPanel,
  updatePanelData: updatePanelData,
  setPanelTitle: setPanelTitle,
  isShow: isShow,
  setCallback: (name, func) => {
    callbacks[name] = func;
  },
};
