import { makeAutoObservable } from "mobx";
import { enqueueSnackbar } from "notistack";
export default class NotificationStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    });
  }
  addNotification = (message, options) => {
    enqueueSnackbar(message, options);
  };
}
