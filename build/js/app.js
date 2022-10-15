(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _welcome = _interopRequireDefault(require("./views/welcome"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//views
//models
console.dir(_welcome.default);

_welcome.default.showAssign(true);

},{"./views/welcome":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const callbacks = {};
const HIDDEN_CLASSNAME = "hidden";
const welcomeSection = document.querySelector(".welcome");
const welcomeTitle = welcomeSection.querySelector("h1");

const showWelcome = (on, name) => {
  if (on) {
    welcomeSection.classList.remove(HIDDEN_CLASSNAME);
    welcomeTitle.innerText = `Welcome ${name}`;
  } else {
    welcomeSection.classList.add(HIDDEN_CLASSNAME);
  }
};

const assignSection = document.querySelector(".assign");
const assignForm = assignSection.querySelector("form");
const assignInput = assignForm.querySelector("input");

assignForm.mycallback = name => {
  callbacks.assigncallback(name);
};

const showAssign = on => {
  if (on) {
    assignSection.classList.remove(HIDDEN_CLASSNAME);
  } else {
    assignSection.classList.add(HIDDEN_CLASSNAME);
  }
};

assignForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = assignInput.value;
  console.log(name);
  assignInput.value = "";
});

const setcallback = (callbackName, func) => {
  callbacks[callbackName] = func;
};

var _default = {
  showAssign: showAssign,
  showWelcome: showWelcome,
  setcallback: setcallback
};
exports.default = _default;

},{}]},{},[1]);
