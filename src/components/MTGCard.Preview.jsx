import { Card, CardHeader, CardMedia, Typography } from "@mui/material";
import { inject } from "mobx-react";
import { PureComponent } from "react";

const colorIdentity = { R: "red", U: "blue", W: "white" };

class MTGCard extends PureComponent {
  render() {
    const { card } = this.props;
    return (
      <div
        className="darker"
        style={{ flexDirection: "row" }}
        onMouseEnter={() => {
          return <div>test</div>;
        }}
        onClick={async () => {
          await this.props.routerStore.goTo("Card", {
            params: { id: card.id },
          });
        }}
      >
        <Card>
          <CardMedia
            component="img"
            height="384"
            image={card.imageUrl}
            alt={`${card.name}-image`}
          />
        </Card>
      </div>
    );
  }
}

export default inject("routerStore")(MTGCard);
