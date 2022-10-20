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

function updateWeather(city, text, icon, temp) {
  ul.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("weather");
  const h3 = document.createElement("h3");
  h3.innerText = city;
  const iconImg = document.createElement("img");
  if (icon !== undefined) {
    iconImg.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  }
  const describtion = document.createElement("span");
  describtion.innerText = `${text}, ${temp}℃`;

  div.appendChild(h3);
  div.appendChild(iconImg);
  div.appendChild(describtion);
  ul.appendChild(div);
}

function updateQuote(text, auth) {
  ul.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("quote");
  const h3 = document.createElement("h3");
  const span = document.createElement("span");
  h3.innerText = text;
  span.innerText = auth;

  div.appendChild(h3);
  div.appendChild(span);
  ul.appendChild(div);
}

export default {
  showPanel: showPanel,
  updatePanelData: updatePanelData,
  setPanelTitle: setPanelTitle,
  isShow: isShow,
  updateWeather: updateWeather,
  updateQuote: updateQuote,
  setCallback: (name, func) => {
    callbacks[name] = func;
  },
};
