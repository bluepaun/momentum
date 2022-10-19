const colors = [
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34",
];

const body = document.querySelector("body");
const btn = document.querySelector("button");

function getTwoColor() {
  const re = [];
  re.push(colors[Math.floor(Math.random() * colors.length)]);
  re.push(colors[Math.floor(Math.random() * colors.length)]);
  return re;
}

function setBackground() {
  const twoColors = getTwoColor();
  const angle = Math.floor(Math.random() * 360);
  const weight = Math.floor(Math.random() * 60) + 20;
  body.style.background = `linear-gradient(${angle}deg, ${twoColors[0]} ${weight}%, ${twoColors[1]})`;
}

btn.addEventListener("click", setBackground);

setBackground();
