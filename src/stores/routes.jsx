import React from "react";

const routes = [
  {
    name: "notFound",
    pattern: "/not-found",
  },
  {
    name: "LoginPage",
    pattern: "/login",
    beforeEnter: async (fromState, toState, routerStore) => {
      const {
        rootStore: {
          authStore: { isSignedIn },
        },
      } = routerStore.options;
      console.log(await isSignedIn());
      if (await isSignedIn()) {
        return await routerStore.goTo("MTGCards");
      }
    },
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
          authStore: { isSignedIn },
          cardStore: { refresh },
        },
      } = routerStore.options;

      if (!(await isSignedIn())) {
        return await routerStore.goTo("LoginPage");
      }
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
