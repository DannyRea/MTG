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
          authStore: { isSignedIn, setCurrentUser },
          cardStore: { refresh, getUserDbDecks },
        },
      } = routerStore.options;

      if (!(await isSignedIn())) {
        return await routerStore.goTo("LoginPage");
      }
      await setCurrentUser();
      await getUserDbDecks();
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
    name: "CreateUser",
    pattern: "/create-user",
  },
];

export default routes;
