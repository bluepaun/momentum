import StorageClass from "./storageClass";

export default class ListStorage {
  constructor(name, title) {
    this._storage = new StorageClass(name);
    this._list = [];
    this.title = title;
  }

  typeCheck(data) {
    return (
      data.id !== undefined &&
      data.text !== undefined &&
      data.checked !== undefined
    );
  }

  saveItem(data) {
    if (!this.typeCheck(data)) {
      return;
    }
    this._list.push(data);
    this._storage.saveData(this._list);
  }
  loadItems() {
    if (this._list.length === 0) {
      this._list = this._storage.loadData();
      if (this._list === null) {
        this._list = [];
      }
    }
    return this._list;
  }
  updateItem(id, data) {
    const index = this._list.findIndex((e) => e.id === id);
    if (index < 0) {
      return;
    }
    for (const [k, v] of Object.entries(data)) {
      this._list[index][k] = v;
    }
    this._storage.saveData(this._list);
  }
  deleteItem(id) {
    const index = this._list.findIndex((e) => e.id === id);
    if (index < 0) {
      return;
    }
    this._list.splice(index, 1);
    this._storage.saveData(this._list);
  }
}
