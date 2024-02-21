import { observer } from "mobx-react";
import { PureComponent } from "react";
import CardContainer from "./Card.Container";
import { RouterView } from "mobx-state-router";
import { viewMap } from "../../stores/viewMap.jsx";
import AddDeckDialog from "../Dialogs/AddDeck.Dialog.jsx";

class AppLayout extends PureComponent {
  render() {
    return (
      <>
        <RouterView viewMap={viewMap} />
        <AddDeckDialog />
      </>
    );
  }
}
export default AppLayout;
