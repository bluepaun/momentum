//animation
/* import anime from "animejs/lib/anime.es.js"; */

//views
import welcomeSection from "./views/welcome";
import clockDisplay from "./views/clock";
import navi from "./views/nav";
import panel from "./views/panel";

//models
import nameStorage from "./models/nameStorage";
import getQuote from "./models/quote";
import "./models/background";
import ListStorageClass from "./models/listStorage";

const toDoStorage = new ListStorageClass("todos", "Today To Do List");
const weekStorage = new ListStorageClass("weeks", "This Week List");

if (nameStorage.loadName()) {
  welcomeSection.showWelcome(true, nameStorage.loadName());
} else {
  welcomeSection.showAssign(true);
}

welcomeSection.setcallback("assigned", (name) => {
  nameStorage.saveName(name);
  welcomeSection.showAssign(false);
  welcomeSection.showWelcome(true, nameStorage.loadName());
});

function showClock() {
  const date = new Date();
  clockDisplay.setHours(date.getHours());
  clockDisplay.setMinutes(date.getMinutes());
  clockDisplay.setSeconds(date.getSeconds());
}
setInterval(showClock, 1000);
showClock();

let currentMenu = "";

navi.setCallback("selectMenu", (menu) => {
  currentMenu = menu;
  if (menu === "home") {
    const toDos = toDoStorage.loadItems();
    panel.setPanelTitle(toDoStorage.title);
    panel.updatePanelData(toDos);
  } else if (menu === "week") {
    const weeks = weekStorage.loadItems();
    panel.setPanelTitle(weekStorage.title);
    panel.updatePanelData(weeks);
  } else if (menu === "voca") {
  } else if (menu === "quotes") {
  }
  panel.showPanel(true);
});

navi.setCallback("disableMenu", () => {
  panel.showPanel(false);
});

navi.setCallback("plusItem", (text) => {
  if (!panel.isShow()) {
    return;
  }

  if (currentMenu === "home") {
    toDoStorage.saveItem({
      id: Date.now(),
      text: text,
      checked: false,
    });
    panel.updatePanelData(toDoStorage.loadItems());
  } else if (currentMenu === "week") {
    weekStorage.saveItem({
      id: Date.now(),
      text: text,
      checked: false,
    });
    panel.updatePanelData(weekStorage.loadItems());
  }
});

panel.setCallback("deleteItem", (id) => {
  if (currentMenu === "home") {
    toDoStorage.deleteItem(id);
  } else if (currentMenu === "week") {
    weekStorage.deleteItem(id);
  }
});

panel.setCallback("checkItem", (id, checked) => {
  if (currentMenu === "home") {
    toDoStorage.updateItem(id, { checked: checked });
  } else if (currentMenu === "week") {
    weekStorage.updateItem(id, { checked: checked });
  }
});
