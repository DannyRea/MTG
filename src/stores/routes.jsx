import React from "react";

const routes = [
  {
    name: "notFound",
    pattern: "/not-found",
  },
  {
    name: "LoginPage",
    pattern: "/login",
  },

  {
    name: "MTGCards",
    pattern: "/mtg",
    beforeEnter: async (fromState, toState, routerStore) => {
      const {
        rootStore: {
          routerStore: {
            routerState: { queryParams },
          },
          cardStore: { refresh },
        },
      } = routerStore.options;
    },
    onEnter: async (fromState, toState, routerStore) => {
      const {
        rootStore: {
          cardStore: { refresh },
        },
      } = routerStore.options;
      await refresh();
    },
  },
  {
    name: "Card",
    pattern: "/mtg/card/:id",
    beforeEnter: (fromState, toState, routerStore) => {
      const {
        rootStore: {
          cardStore: { setRouteCard },
          routerStore: {},
        },
      } = routerStore.options;
      const { params } = toState;
      console.log(params.id);
      setRouteCard(params.id);
    },
  },
  {
    name: "CreateUser",
    pattern: "/create-user",
  },
];

export default routes;
