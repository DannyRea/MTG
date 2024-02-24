import { PureComponent } from "react";
import MTGCard from "../../components/MTGCard.Preview";
import { Box, Grid } from "@mui/material";
import { inject, observer } from "mobx-react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddToDeckIcon from "@mui/icons-material/AddToPhotos";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

class CardContainer extends PureComponent {
  render() {
    const {
      cardStore: { cardsWithImages, page, setPage, setDialogOpen },
      routerStore: { goTo, routes },
    } = this.props;
    console.log(routes);
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="success"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                test
              </Typography>
              <span>
                <FormControl>
                  <InputLabel id="user-state-select">Deck</InputLabel>
                  <Select
                    labelId="user-state-select"
                    sx={{ flexGrow: 1, minWidth: "20vh" }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </span>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => setDialogOpen()}
              >
                <AddToDeckIcon />
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexWrap: "wrap",
              padding: "5vh",
            }}
          >
            {cardsWithImages?.map((card) => {
              return (
                <div style={{ padding: "2.5vh" }}>
                  <MTGCard card={card} />
                </div>
              );
            })}
          </div>
          <Button onClick={async () => setPage(page - 1)}>
            <ArrowBackIosIcon />
          </Button>
          <span style={{ display: "inline-flex" }}>{page}</span>
          <Button onClick={() => setPage(page + 1)}>
            <ArrowForwardIosIcon />
          </Button>
        </Grid>
      </>
    );
  }
}
export default inject("cardStore", "routerStore")(CardContainer);
