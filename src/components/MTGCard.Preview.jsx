import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Box,
  CardContent,
  Button,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import { PureComponent } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../App.css";
import { computed, makeObservable } from "mobx";
const colorIdentity = { R: "red", U: "blue", W: "white" };

class MTGCard extends PureComponent {
  constructor(props) {
    super(props);
    this.observableCurrentDeck = [];
    this.observableCard = {};
    makeObservable(this, {
      cardInDeck: computed,
    });
  }
  get cardInDeck() {
    return this.observableCurrentDeck
      .slice()
      .find((deckCard) => deckCard.id === this.observableCard.id);
  }
  //cant reference observables from props in actions/computeds since react 18.2. Create local observables and set on componentDidMount
  //See: https://github.com/mobxjs/mobx/blob/main/packages/mobx-react/README.md#note-on-using-props-and-state-in-derivations
  componentDidMount() {
    this.observableCurrentDeck = this.props.cardStore.currentDeck;
    this.observableCard = this.props.card;
  }
  render() {
    const {
      card,
      cardStore: { addToDeck, removeFromDeck },
    } = this.props;
    return (
      <div style={{ flexDirection: "row" }}>
        <Card sx={{ borderRadius: 5 }}>
          <Box container>
            <CardContent sx={{ padding: 0 }} className="darker">
              <CardMedia
                component="img"
                height="384"
                image={card.imageUrl}
                alt={`${card.name}-image`}
              />
            </CardContent>
            <span
              style={{
                display: "inline-flex",
                flexDirection: "row",
                flexGrow: 3,
              }}
            >
              {this.cardInDeck ? (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ borderRadius: "100px" }}
                  onClick={() => removeFromDeck(card)}
                >
                  <CancelIcon />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: "100px" }}
                  onClick={() => addToDeck(card)}
                >
                  <AddCircleIcon />
                </Button>
              )}
            </span>
          </Box>

          <div
            style={{
              top: "20px",
              left: "20px",
              color: "black",
              backgroundColor: "white",
            }}
          >
            {card.name}
          </div>
        </Card>
      </div>
    );
  }
}

export default inject("routerStore", "cardStore")(observer(MTGCard));
