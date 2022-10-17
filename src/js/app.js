//views
import welcomeSection from "./views/welcome";
import clockDisplay from "./views/clock";

//models
import nameStorage from "./models/nameStorage";

if (nameStorage.loadName()) {
  welcomeSection.showWelcome(true, nameStorage.loadName());
} else {
  welcomeSection.showAssign(true);
}

function showClock() {
  const date = new Date();
  clockDisplay.setHours(date.getHours());
  clockDisplay.setMinutes(date.getMinutes());
  clockDisplay.setSeconds(date.getSeconds());
}

setInterval(() => {
  showClock();
}, 1000);

showClock();
