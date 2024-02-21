import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RootStore } from "./stores/rootStore.js";
import { Provider } from "mobx-react";
import {
  browserHistory,
  RouterContext,
  HistoryAdapter,
} from "mobx-state-router";
import { SnackbarProvider } from "notistack";

const rootStore = new RootStore();

const routerStore = rootStore.routerStore;
const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
historyAdapter.observeRouterStateChanges();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={1}>
      <Provider
        rootStore={rootStore}
        routerStore={routerStore}
        authStore={rootStore.authStore}
        cardStore={rootStore.cardStore}
        notificationStore={rootStore.notificationStore}
      >
        <RouterContext.Provider value={routerStore}>
          <App />
        </RouterContext.Provider>
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);
