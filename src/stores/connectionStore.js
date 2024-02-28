import { makeAutoObservable } from "mobx";
import { io } from "socket.io-client";

export default class ConnectionStore {
  socket = null;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.initializeClient();
  }

  initializeClient = () => {
    this.socket = io("http://localhost:3030", {
      closeOnBeforeunload: true,
      transports: ["websocket"],
    });
    this.socket.on("connect", (socket) => {
      this.rootStore.notificationStore.addNotification("Server connected!", {
        variant: "success",
      });
    });
    this.socket.on("disconnect", (socket) => {
      this.rootStore.notificationStore.addNotification("Server disconnected!", {
        variant: "error",
      });

      this.socket.on("deckCreate", (deck) => {
        console.log("deck", deck);
      });
    });
  };
}
