import { makeAutoObservable } from "mobx";
import axios from "axios";
export default class AuthStore {
  currentUser = {};
  users = [];
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  isSignedIn = () => {};

  setCurrentUser = (user) => {
    console.log("user", user);
    document.cookie = "";
    if (!document.cookie.length) {
      document.cookie = `id=${user.id};username=${user.username};firstName=${user.firstName};lastName=${user.lastName}`;
    }

    const decodedCookie = decodeURIComponent(document.cookie);
    console.log(document.cookie);
    this.currentUser = decodedCookie.split(";").reduce((acc, cookie) => {
      if (
        cookie.includes("id") ||
        cookie.includes("username") ||
        cookie.includes("firstName") ||
        cookie.includes("lastName")
      ) {
        const keyValPair = cookie.split("=");
        acc[`${keyValPair[0]}`] = keyValPair[1];
      }
    }, {});
    console.log("currentUser", this.currentUser);
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
        .then((res) => {
          this.rootStore.notificationStore.addNotification(
            "Success! Logging you in...",
            { variant: "success" }
          );
          this.setCurrentUser(res.data.user);
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
}
