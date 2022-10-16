import StorageClass from "./storageClass";

const storage = new StorageClass("username");

const saveName = (name) => {
  storage.saveData(name);
};

const loadName = () => {
  return storage.loadData();
};

export default {
  saveName: saveName,
  loadName: loadName,
};
