import "./welcome_setup";
import welcomeSection from "views/welcome";

test("welcome show on ", () => {
  welcomeSection.showAssign(true);
  const assignSection = document.querySelector(".assign");
  expect(assignSection.classList.contains("hidden")).toBe(false);
});

test("welcome show off ", () => {
  welcomeSection.showAssign(false);
  const assignSection = document.querySelector(".assign");
  expect(assignSection.classList.contains("hidden")).toBe(true);
});
