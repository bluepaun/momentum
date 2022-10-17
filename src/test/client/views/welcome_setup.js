import jsdom from "jsdom";
import fs from "fs";

const { JSDOM } = jsdom;
const htmlData = fs.readFileSync(
  "/users/bluepaun/coding/momentum/build/index.html",
  "utf8"
);

const dom = new JSDOM(htmlData);

/* const testsubmit = new dom.SubmitEvent("submit"); */

global.window = dom.window;
global.document = dom.window.document;
