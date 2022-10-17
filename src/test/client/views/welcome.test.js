import "./welcome_setup";
import welcome from "views/welcome";

test("welcome show on ", () => {
  welcome.showWelcome(true, "testname");
  const welcomeSection = document.querySelector(".welcome");
  expect(welcomeSection.classList.contains("hidden")).toBe(false);
  expect(welcomeSection.querySelector("h1").innerText).toBe(`Welcome testname`);
});

test("welcome show on with null", () => {
  welcome.showWelcome(true, null);
  const welcomeSection = document.querySelector(".welcome");
  expect(welcomeSection.classList.contains("hidden")).toBe(true);
});

test("welcome show off ", () => {
  welcome.showWelcome(false);
  const welcomeSection = document.querySelector(".welcome");
  expect(welcomeSection.classList.contains("hidden")).toBe(true);
});

test("assign show on ", () => {
  welcome.showAssign(true);
  const assignSection = document.querySelector(".assign");
  expect(assignSection.classList.contains("hidden")).toBe(false);
});

test("assign show off ", () => {
  welcome.showAssign(false);
  const assignSection = document.querySelector(".assign");
  expect(assignSection.classList.contains("hidden")).toBe(true);
});

test("assign callback", () => {
  const mockCallback = jest.fn((name) => name);
  welcome.setcallback("assigned", mockCallback);
  const input = document.querySelector(".assign form input");
  input.value = "testname";
  document
    .querySelector(".assign form")
    .dispatchEvent(new window.CustomEvent("submit", { cancelable: true }));
  expect(input.value).toBe("");
  expect(mockCallback.mock.calls.length).toBe(1);
  expect(mockCallback.mock.calls[0][0]).toBe("testname");
  expect(mockCallback.mock.results[0].value).toBe("testname");
});
