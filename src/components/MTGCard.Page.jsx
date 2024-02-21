import { PureComponent } from "react";
import MTGCard from "./MTGCard.Preview";
import { inject, observer } from "mobx-react";
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { computed } from "mobx";
import { GlobalStyles } from "@mui/material";
const styles = makeStyles((theme) => ({
  divider: {
    background: "black",
  },
}));

class MTGCardPage extends PureComponent {
  constructor(props) {
    super(props);
    routeCard: computed;
  }

  get routeCard() {
    const {
      cardStore: { cards, setRouteCard },
      routerStore: {
        routerState: { params },
      },
    } = this.props;
    console.log("params", params);
    if (!cards?.length) return {};
    return cards.slice().find((card) => card.id === params?.id) || {};
  }
  render() {
    console.log("routeCard", this.routeCard);
    return (
      <>
        <span style={{ padding: "5" }}>
          <img alt={"image"} src={this.routeCard?.imageUrl} />
        </span>
        <Box container sx={{ alignItems: "center" }}>
          <Grid>
            <Grid item xs={16}>
              <div style={{ textAlign: "left" }}>
                Name<div style={{ textAlign: "center" }}>Name</div>
              </div>
            </Grid>
            <Grid item xs={8}>
              test
            </Grid>
            <Grid item xs={8}>
              test
            </Grid>
            <Grid item xs={8}>
              test
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}
export default inject("routerStore", "cardStore")(observer(MTGCardPage));
