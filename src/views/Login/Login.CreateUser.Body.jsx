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
        <Grid
          container
          spacing={0}
          style={{
            minHeight: "100vh",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card raised>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
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
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </>
    );
  }
}
export default inject("authStore")(observer(LoginCreateUserBody));
