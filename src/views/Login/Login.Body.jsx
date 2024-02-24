import { PureComponent } from "react";
import {
  Card,
  Box,
  Grid,
  CardContent,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import { makeObservable, observable, action } from "mobx";
import LoginBodyContainer from "../../components/LoginBody.Container";
import "../../App.css";
//TODO: finish up handleUsername and handlePassword
class LoginBody extends PureComponent {
  username = "";
  password = "";
  constructor(props) {
    super(props);
    makeObservable(this, {
      username: observable,
      password: observable,
      handleUsername: action,

      handlePassword: action,
    });
  }

  handleUsername = (event) => {
    this.username = event.target.value;
    console.log("user", this.username);
  };
  handlePassword = (event) => {
    this.password = event.target.value;
    console.log("pass", this.password);
  };
  render() {
    const {
      authStore: { loginUser },
    } = this.props;
    return (
      <>
        <LoginBodyContainer>
          <h1>Login</h1>
          <TextField
            label="Username"
            variant="standard"
            onChange={this.handleUsername}
            sx={{ padding: "5px" }}
          />

          <TextField
            type="password"
            label="Password"
            variant="standard"
            onChange={this.handlePassword}
            sx={{ padding: "5px" }}
          />
          <Button
            className="login-button"
            variant="contained"
            onClick={async () => await loginUser(this.username, this.password)}
            sx={{ borderRadius: 5 }}
          >
            Log In
          </Button>
          <Link
            component={"button"}
            onClick={async () =>
              await this.props.routerStore.goTo("CreateUser")
            }
          >
            Create user
          </Link>
        </LoginBodyContainer>
      </>
    );
  }
}
export default inject("routerStore", "authStore")(observer(LoginBody));
