import "./localStorage_setup";
import storageClass from "models/storageClass";

test("storageClass save test string", () => {
  const sCimpl = new storageClass("test");
  sCimpl.saveData("testString");
  expect(localStorage.getItem("test")).toBe(JSON.stringify("testString"));
});

test("storageClass load test string", () => {
  localStorage.setItem("test", JSON.stringify("testString"));
  const sCimpl = new storageClass("test");
  expect(sCimpl.loadData()).toBe("testString");
});
