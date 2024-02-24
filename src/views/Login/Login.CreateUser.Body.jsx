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
import { action, computed, makeObservable, observable } from "mobx";
import { observer, inject } from "mobx-react";
import LoginBodyContainer from "../../components/LoginBody.Container";
class LoginCreateUserBody extends PureComponent {
  user = { firstName: "", lastName: "", username: "", password: "" };
  passwordAgain = "";
  constructor(props) {
    super(props);
    makeObservable(this, {
      user: observable,
      passwordAgain: observable,
      handleUser: action,
      handlePasswordAgain: action,
      validatePassword: computed,
      validateSubmit: computed,
    });
  }

  handleUser = (event) => {
    this.user[`${event.target.name}`] = event.target.value;
  };
  handlePasswordAgain = (event) => {
    this.passwordAgain = event.target.value;
  };
  get validatePassword() {
    return this.user.password === this.passwordAgain;
  }
  get validateSubmit() {
    return (
      !!this.user.firstName &&
      !!this.user.lastName &&
      !!this.user.username &&
      !!this.user.password &&
      !!this.passwordAgain &&
      this.validatePassword
    );
  }

  render() {
    const {
      authStore: { createUser },
    } = this.props;
    return (
      <>
        <LoginBodyContainer>
          <div>
            <TextField
              label="First Name"
              name="firstName"
              variant="standard"
              onChange={this.handleUser}
            />
          </div>
          <div>
            <TextField
              label="Last Name"
              name="lastName"
              variant="standard"
              onChange={this.handleUser}
            />
          </div>
          <div>
            <TextField
              label="Username"
              name="username"
              variant="standard"
              onChange={this.handleUser}
            />
          </div>
          <div>
            <TextField
              type="password"
              label="Password"
              name="password"
              variant="standard"
              onChange={this.handleUser}
            />
          </div>
          <div>
            <TextField
              type="password"
              label="Re-enter password"
              variant="standard"
              onChange={this.handlePasswordAgain}
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            {this.validateSubmit && (
              <Button
                variant="contained"
                onClick={async () => await createUser(this.user)}
                color="info"
              >
                Create User
              </Button>
            )}
          </div>
        </LoginBodyContainer>
      </>
    );
  }
}
export default inject("authStore")(observer(LoginCreateUserBody));
