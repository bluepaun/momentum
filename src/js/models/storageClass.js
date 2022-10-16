//@ts-ignore @ts-nocheck

export default class {
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
