(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _welcome = _interopRequireDefault(require("./views/welcome"));

var _clock = _interopRequireDefault(require("./views/clock"));

var _nameStorage = _interopRequireDefault(require("./models/nameStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//views
//models
if (_nameStorage.default.loadName()) {
  _welcome.default.showWelcome(true, _nameStorage.default.loadName());
} else {
  _welcome.default.showAssign(true);
}

function showClock() {
  const date = new Date();

  _clock.default.setHours(date.getHours());

  _clock.default.setMinutes(date.getMinutes());

  _clock.default.setSeconds(date.getSeconds());
}

setInterval(() => {
  showClock();
}, 1000);
showClock();

},{"./models/nameStorage":2,"./views/clock":4,"./views/welcome":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _storageClass = _interopRequireDefault(require("./storageClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = new _storageClass.default("username");

const saveName = name => {
  storage.saveData(name);
};

const loadName = () => {
  return storage.loadData();
};

var _default = {
  saveName: saveName,
  loadName: loadName
};
exports.default = _default;

},{"./storageClass":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//@ts-ignore @ts-nocheck
class _default {
  constructor(keyname) {
    this._keyname = keyname;
  }

  saveData(data) {
    localStorage.setItem(this._keyname, JSON.stringify(data));
  }

  loadData() {
    const jsonData = localStorage.getItem(this._keyname);
    return JSON.parse(jsonData);
  }

}

exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TimeSegment {
  constructor(segment_display) {
    _defineProperty(this, "currentNum", 0);

    _defineProperty(this, "_FLIP_TOP_MID_ANI", "flip-top-mid-ani");

    _defineProperty(this, "_FLIP_MID_BOT_ANI", "flip-mid-bot-ani");

    this.seg = segment_display;
    const fronts = this.seg.querySelectorAll(".segment-front");
    const backs = this.seg.querySelectorAll(".segment-back");
    this.prev = [fronts[0], backs[1]];
    this.cur = [fronts[1], backs[0]];
    this.updateSegNum(this.prev);
    this.updateSegNum(this.cur);
    this.topHalf = this.prev[0];
    this.botHalf = this.cur[0];
  }

  updateSegNum(ds) {
    ds.forEach(e => {
      const span = e.querySelector("span");
      span.innerText = this.currentNum;
    });
  }

  displayNum(num) {
    if (this.currentNum === num) {
      return;
    }

    this.currentNum = num;
    this.updateSegNum(this.cur);
    this.startFlipAni();
  }

  startFlipAni() {
    this.topHalf.classList.add(this._FLIP_TOP_MID_ANI);
    this.botHalf.classList.add(this._FLIP_MID_BOT_ANI);

    this.botHalf.onanimationend = event => {
      this.topHalf.classList.remove(this._FLIP_TOP_MID_ANI);
      this.botHalf.classList.remove(this._FLIP_MID_BOT_ANI);
      this.updateSegNum(this.prev);
    };
  }

}

function setTime(segs, time) {
  let t = time;

  for (let i = segs.length - 1; i >= 0; i -= 1) {
    const num = t % 10;
    segs[i].displayNum(num);
    t = Math.floor(t / 10);
  }
}

const hourSegs = document.querySelectorAll(".clock__hours .segment-display");
const hourTimeSegs = [];
hourSegs.forEach(e => {
  hourTimeSegs.push(new TimeSegment(e));
});
const minuteSegs = document.querySelectorAll(".clock__minutes .segment-display");
const minuteTimeSegs = [];
minuteSegs.forEach(e => {
  minuteTimeSegs.push(new TimeSegment(e));
});
const secondSegs = document.querySelectorAll(".clock__seconds .segment-display");
const secondTimeSegs = [];
secondSegs.forEach(e => {
  secondTimeSegs.push(new TimeSegment(e));
});

function setHours(hours) {
  setTime(hourTimeSegs, hours);
}

function setMinutes(minutes) {
  setTime(minuteTimeSegs, minutes);
}

function setSeconds(seconds) {
  setTime(secondTimeSegs, seconds);
}

var _default = {
  setHours: setHours,
  setMinutes: setMinutes,
  setSeconds: setSeconds
};
exports.default = _default;

},{}],5:[function(require,module,exports){
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
  if (on && name) {
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
  callbacks.assigned(name);
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
  const target = event.target;
  const name = assignInput.value;
  assignInput.value = "";
  target.mycallback(name);
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
