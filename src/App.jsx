import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppLayout from "./views/layout";
import { PureComponent } from "react";
class App extends PureComponent {
  render() {
    return <AppLayout />;
  }
}

export default App;
