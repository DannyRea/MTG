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
class LoginBodyContainer extends PureComponent {
  render() {
    return (
      <Grid container justifyContent={"center"}>
        <Card raised>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor="#404040"
            borderRadius="12px"
            boxShadow="2"
            minWidth={"50vh"}
            minHeight={"50vh"}
            backgroundColor={"white"}
            style={{ alignItems: "center", borderRadius: "0" }}
          >
            <CardContent style={{ margin: "auto" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                  padding: "35px",
                }}
              >
                {this.props.children}
              </div>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    );
  }
}
export default LoginBodyContainer;
