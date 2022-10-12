colors = [
  "#FFFFFF",
  "#ABDEE6",
  "#CBAACB",
  "#FFFFB5",
  "#FFCCB6",
  "#F3B0C3",
  "#C6DBDA",
  "#FEE1E8",
  "#FED7C3",
  "#F6EAC2",
  "#ECD5E3",
];
//0~12
const box = document.querySelector(".box");
const boxInBox = document.querySelector(".color");
const text = document.querySelector(".text > h1");
const move = document.querySelector(".location");
const size = document.querySelector(".size");
const circle1 = document.querySelector(".circle1");
const circle2 = document.querySelector(".circle2");

const SuperCool = {
  mouseMove: function (event) {
    let X = event.pageX;
    let Y = event.pageY;
    move.innerText = `width ${X}, height ${Y}`;
  },
  mouseEnter: function () {
    boxInBox.style.backgroundColor = colors[1];
    text.innerText = `Use 'mouseenter'`;
    boxInBox.innerText = `Mouse is Here!`;
    boxInBox.style.color = colors[0];
    box.style.borderColor = colors[10];
    box.style.borderStyle = "dotted";
    box.style.backgroundColor = colors[2];
    circle1.style.backgroundColor = colors[1];
    circle2.style.backgroundColor = colors[2];
  },
  resize: function () {
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    size.innerText = `width: ${newWidth} height: ${newHeight}`;
  },
  mouseLeave: function () {
    console.log("leave");
    boxInBox.style.backgroundColor = colors[2];
    text.innerText = `Use 'mouseleave'`;
    boxInBox.innerText = `Mouse is Gone!`;
    box.style.borderColor = colors[9];

    boxInBox.style.color = colors[0];

    box.style.borderStyle = "solid";
    box.style.backgroundColor = colors[5];
    circle1.style.backgroundColor = colors[2];
    circle2.style.backgroundColor = colors[5];
  },
  mouseClick: function () {
    console.log("click");
    boxInBox.style.backgroundColor = colors[3];
    text.innerText = `Use 'click'`;
    boxInBox.innerText = `You clicked it!`;
    boxInBox.style.color = colors[2];
    box.style.borderStyle = "dashed";
    box.style.backgroundColor = colors[6];
    circle1.style.backgroundColor = colors[3];
    circle2.style.backgroundColor = colors[6];
  },
};

boxInBox.addEventListener("mouseenter", SuperCool.mouseEnter);
window.addEventListener("mousemove", SuperCool.mouseMove);
window.addEventListener("resize", SuperCool.resize);
boxInBox.addEventListener("mouseleave", SuperCool.mouseLeave);
boxInBox.addEventListener("click", SuperCool.mouseClick);
