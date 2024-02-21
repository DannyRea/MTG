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
                    label="Username"
                    variant="standard"
                    onChange={this.handleUsername}
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    label="Password"
                    variant="standard"
                    onChange={this.handlePassword}
                  />
                </div>
                <div style={{ marginTop: "15px" }}>
                  <Button
                    variant="contained"
                    onClick={async () =>
                      await loginUser(this.username, this.password)
                    }
                  >
                    Log In
                  </Button>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Link
                    component={"button"}
                    onClick={async () =>
                      await this.props.routerStore.goTo("CreateUser")
                    }
                  >
                    Create user
                  </Link>
                </div>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      </>
    );
  }
}
export default inject("routerStore", "authStore")(observer(LoginBody));
