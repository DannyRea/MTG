import { observer } from "mobx-react";
import { PureComponent } from "react";
import LoginBody from "./Login.Body";

class LoginContainer extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ alignItems: "center" }}>
        <LoginBody />
      </div>
    );
  }
}
export default LoginContainer;
