import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Box,
  CardContent,
  Button,
} from "@mui/material";
import { inject } from "mobx-react";
import { PureComponent } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../App.css";
const colorIdentity = { R: "red", U: "blue", W: "white" };

class MTGCard extends PureComponent {
  render() {
    const { card } = this.props;
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
                onMouseEnter={() => {
                  console.log("test");
                }}
              />
            </CardContent>
            <span
              style={{
                display: "inline-flex",
                flexDirection: "row",
                flexGrow: 3,
              }}
            >
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ borderRadius: "100px" }}
              >
                <CancelIcon />
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "100px" }}
              >
                <AddCircleIcon />
              </Button>
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

export default inject("routerStore")(MTGCard);
