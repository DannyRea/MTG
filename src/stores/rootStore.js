import { RouterStore, createRouterState } from "mobx-state-router";
import { makeAutoObservable } from "mobx";
import CardStore from "./cardStore";
import AuthStore from "./authStore";
import NotificationStore from "./notificationStore";
import ConnectionStore from "./connectionStore";

import routes from "./routes";
export class RootStore {
  constructor() {
    const notFound = createRouterState("notFound");
    this.connectionStore = new ConnectionStore(this);
    this.routerStore = new RouterStore(routes, notFound, { rootStore: this });
    this.authStore = new AuthStore(this);
    this.cardStore = new CardStore(this);
    this.notificationStore = new NotificationStore(this);
  }
}
