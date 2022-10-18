const clockTitle = document.querySelector(".js-clock");

const timeConst = {
  DAY: 24 * 60 * 60 * 1000,
  HOUR: 60 * 60 * 1000,
  MINUTE: 60 * 1000,
  SEC: 1000,
};

function numPadStart(num, size) {
  return String(num).padStart(size, "0");
}

function millisecondsToString(ms) {
  const days = Math.floor(ms / timeConst.DAY);
  let left = ms % timeConst.DAY;
  const hours = Math.floor(left / timeConst.HOUR);
  left = left % timeConst.HOUR;
  const minutes = Math.floor(left / timeConst.MINUTE);
  left = left % timeConst.MINUTE;
  const secs = Math.floor(left / timeConst.SEC);
  return `${days}d ${numPadStart(hours, 2)}h ${numPadStart(
    minutes,
    2
  )}m ${numPadStart(secs, 2)}s`;
}

function showDays() {
  const currentDate = new Date();
  let christmas = new Date(currentDate.getFullYear(), 11, 25);
  if (christmas.getTime() <= currentDate.getTime()) {
    christmas = new Date(currentDate.getFullYear() + 1, 11, 25);
  }
  const leftTime = christmas.getTime() - currentDate.getTime();
  clockTitle.innerText = millisecondsToString(leftTime);
}

setInterval(showDays, 1000);
showDays();
