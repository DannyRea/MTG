import { makeAutoObservable } from "mobx";
import axios from "axios";
import localforage from "localforage";
export default class AuthStore {
  currentUser = {};
  users = [];
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  setCurrentUser = async (data) => {
    try {
      await localforage.setItem("id", data.user.id);
      await localforage.setItem("username", data.user.username);
      await localforage.setItem("jwt", data.accessToken);
      await localforage.setItem(
        "tokenCreatedAt",
        data.authentication.payload.iat
      );
      await localforage.setItem(
        "tokenCreatedAt",
        data.authentication.payload.exp
      );
      this.currentUser = data.user;
    } catch (e) {
      console.log("Error with setting user");
      this.currentUser = {};
    }
  };
  //   {
  //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MDc1MjQ4MzEsImV4cCI6MTcwNzYxMTIzMSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjE4IiwianRpIjoiZTRjOGExNmUtNDEzMS00ZGYxLWIzYzYtNzllNWRkNmJkOWNiIn0.axoj40kYvHtcJCgskGk0QSz7JD2ROJRSFZ9Jb4P0YLs",
  //     "authentication": {
  //         "strategy": "local",
  //         "payload": {
  //             "iat": 1707524831,
  //             "exp": 1707611231,
  //             "aud": "https://yourdomain.com",
  //             "sub": "18",
  //             "jti": "e4c8a16e-4131-4df1-b3c6-79e5dd6bd9cb"
  //         }
  //     },
  //     "user": {
  //         "id": 18,
  //         "username": "danielrea1993",
  //         "firstName": "Daniel",
  //         "lastName": "Rea"
  //     }
  // }
  loginUser = async (username, password) => {
    try {
      await axios
        .post("http://localhost:3030/authentication", {
          strategy: "local",
          username: username,
          password: password,
        })
        .then(async (res) => {
          this.rootStore.notificationStore.addNotification(
            "Success! Logging you in...",
            { variant: "success" }
          );
          await this.setCurrentUser(res.data);
          setTimeout(
            async () => await this.rootStore.routerStore.goTo("MTGCards"),
            3000
          );
        });
    } catch (e) {
      if (e.response.status === 401) {
        this.rootStore.notificationStore.addNotification(
          "The username or password is incorrect",
          { variant: "error" }
        );
      } else if (e.respnse.status > 299) {
        this.rootStore.notificationStore.addNotification(
          "Something went wrong. Can't login",
          { variant: "error" }
        );
      }
    }
  };
  createUser = async (user) => {
    try {
      await axios.post("http://localhost:3030/users", user).then((res) => {
        this.rootStore.notificationStore.addNotification(
          "User created! Redirecting back to login page...",
          { variant: "success" }
        );
        setTimeout(
          async () => await this.rootStore.routerStore.goTo("LoginPage"),
          3000
        );
      });
    } catch (e) {
      console.log(e);
      if (
        e.response.data.message.includes(
          `duplicate key value violates unique constraint "users_email_key"`
        )
      ) {
        this.rootStore.notificationStore.addNotification(
          "Username already exists",
          { variant: "error" }
        );
      } else if (e.response.status > 299) {
        this.rootStore.notificationStore.addNotification(
          "Failed to create user. Try again later.",
          { variant: "error" }
        );
      }
    }
  };

  isSignedIn = async () => {
    console.log("here");
    return (
      (await localforage.keys()) &&
      (await localforage.getItem("id")) &&
      (await localforage.getItem("username")) &&
      (await localforage.getItem("jwt")) &&
      (await localforage.getItem("tokenCreatedAt")) &&
      (await localforage.getItem("tokenExpireAt")) &&
      (await localforage.getItem("tokenExpireAt")) < new Date().getTime()
    );
  };
}
