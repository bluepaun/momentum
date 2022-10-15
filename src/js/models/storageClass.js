//@ts-ignore @ts-nocheck

export default class {
  constructor(keyname) {
    this.keyname = keyname;
  }

  saveData(data) {
    localStorage.setItem(this.keyname, JSON.stringify(data));
  }

  loadData() {
    const jsonData = localStorage.getItem(this._keyname);
    return JSON.parse(jsonData);
  }
}
