class TimeSegment {
  currentNum = 0;
  _FLIP_TOP_MID_ANI = "flip-top-mid-ani";
  _FLIP_MID_BOT_ANI = "flip-mid-bot-ani";
  constructor(segment_display) {
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
    ds.forEach((e) => {
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
    this.botHalf.onanimationend = (event) => {
      this.updateSegNum(this.prev);
      this.topHalf.classList.remove(this._FLIP_TOP_MID_ANI);
      this.botHalf.classList.remove(this._FLIP_MID_BOT_ANI);
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
hourSegs.forEach((e) => {
  hourTimeSegs.push(new TimeSegment(e));
});
const minuteSegs = document.querySelectorAll(
  ".clock__minutes .segment-display"
);
const minuteTimeSegs = [];
minuteSegs.forEach((e) => {
  minuteTimeSegs.push(new TimeSegment(e));
});
const secondSegs = document.querySelectorAll(
  ".clock__seconds .segment-display"
);
const secondTimeSegs = [];
secondSegs.forEach((e) => {
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

export default {
  setHours: setHours,
  setMinutes: setMinutes,
  setSeconds: setSeconds,
};
