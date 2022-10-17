import "./localStorage_setup";
import nameStorage from "models/nameStorage";

beforeEach(() => {
  localStorage.clear();
});

test("nameStorage save test", () => {
  nameStorage.saveName("testname");
  expect(localStorage.getItem("username")).toBe(JSON.stringify("testname"));
});

test("nameStorage load test", () => {
  localStorage.setItem("username", JSON.stringify("test_name"));
  expect(nameStorage.loadName()).toBe("test_name");
});

test("nameStorage empty test", () => {
  expect(nameStorage.loadName()).toBe(null);
});

test("nameStorage save and load test", () => {
  nameStorage.saveName("testname2");
  expect(nameStorage.loadName()).toBe("testname2");
});
