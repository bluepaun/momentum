import "./localStorage_setup";
import nameStorage from "models/nameStorage";

test("nameStorage save test", () => {
  nameStorage.saveName("testname");
  expect(localStorage.getItem("username")).toBe(JSON.stringify("testname"));
});

test("nameStorage load test", () => {
  localStorage.setItem("username", JSON.stringify("test_name"));
  expect(nameStorage.loadName()).toBe("test_name");
});
