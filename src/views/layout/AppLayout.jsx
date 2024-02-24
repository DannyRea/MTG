import { inject, observer } from "mobx-react";
import { PureComponent } from "react";
import CardContainer from "./Card.Container";
import { RouterView } from "mobx-state-router";
import { viewMap } from "../../stores/viewMap.jsx";
import AddDeckDialog from "../Dialogs/AddDeck.Dialog.jsx";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../../App.css";
const defaultStyle = {
  transition: `opacity 300ms ease-in-out`,
  opacity: 0,
};
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

class AppLayout extends PureComponent {
  render() {
    console.log(this.props.routerStore.routerState.routeName);
    return (
      <>
        <div className="content-holder">
          <TransitionGroup component={null}>
            <CSSTransition
              key={this.props.routerStore.routerState.routeName}
              timeout={250}
              classNames="fade"
            >
              <RouterView viewMap={viewMap} />
            </CSSTransition>
          </TransitionGroup>
        </div>

        <AddDeckDialog />
      </>
    );
  }
}
export default inject("routerStore")(observer(AppLayout));
