const body = document.querySelector("body");

//initial color
handleResize();

function handleResize() {
  const viewport_width = window.innerWidth;
  console.log(viewport_width);
  body.classList.remove("small");
  body.classList.remove("big");
  if (viewport_width < 600) {
    body.classList.add("small");
  } else if (viewport_width > 900) {
    body.classList.add("big");
  }
}

window.addEventListener("resize", handleResize);
