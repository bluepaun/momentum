//animation
/* import anime from "animejs/lib/anime.es.js"; */

//views
import welcomeSection from './views/welcome';
import clockDisplay from './views/clock';
import navi from './views/nav';
import panel from './views/panel';

//models
import nameStorage from './models/nameStorage';
import quote from './models/quote';
import './models/background';
import ListStorageClass from './models/listStorage';
import weatherModel from './models/weather';

const toDoStorage = new ListStorageClass('todos', 'Today To Do List');
const weekStorage = new ListStorageClass('weeks', 'This Week List');

if (nameStorage.loadName()) {
  welcomeSection.showWelcome(true, nameStorage.loadName());
} else {
  welcomeSection.showAssign(true);
}

welcomeSection.setcallback('assigned', (name) => {
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

let currentMenu = '';

navi.setCallback('selectMenu', (menu) => {
  if (!nameStorage.loadName()) {
    return;
  }
  currentMenu = menu;
  if (menu === 'home') {
    const toDos = toDoStorage.loadItems();
    panel.setPanelTitle(toDoStorage.title);
    panel.updatePanelData(toDos);
  } else if (menu === 'week') {
    const weeks = weekStorage.loadItems();
    panel.setPanelTitle(weekStorage.title);
    panel.updatePanelData(weeks);
  } else if (menu === 'weather') {
    panel.setPanelTitle(weatherModel.title);
    const { city, text, icon, temp } = weatherModel.getWeather();
    panel.updateWeather(city, text, icon, temp);
  } else if (menu === 'quote') {
    panel.setPanelTitle(quote.title);
    const q = quote.getQuote();
    panel.updateQuote(q.text, q.author);
  }
  panel.showPanel(true);
});

navi.setCallback('disableMenu', () => {
  panel.showPanel(false);
});

navi.setCallback('plusItem', (text) => {
  if (!panel.isShow()) {
    return;
  }

  if (currentMenu === 'home') {
    toDoStorage.saveItem({
      id: Date.now(),
      text: text,
      checked: false,
    });
    panel.updatePanelData(toDoStorage.loadItems());
  } else if (currentMenu === 'week') {
    weekStorage.saveItem({
      id: Date.now(),
      text: text,
      checked: false,
    });
    panel.updatePanelData(weekStorage.loadItems());
  }
});

panel.setCallback('deleteItem', (id) => {
  if (currentMenu === 'home') {
    toDoStorage.deleteItem(id);
  } else if (currentMenu === 'week') {
    weekStorage.deleteItem(id);
  }
});

panel.setCallback('checkItem', (id, checked) => {
  if (currentMenu === 'home') {
    toDoStorage.updateItem(id, { checked: checked });
  } else if (currentMenu === 'week') {
    weekStorage.updateItem(id, { checked: checked });
  }
});

weatherModel.setCallback('onUpdateWeather', (weather) => {
  if (currentMenu !== 'weather') {
    return;
  }
  const { city, text, icon, temp } = weather;
  panel.updateWeather(city, text, icon, temp);
});
