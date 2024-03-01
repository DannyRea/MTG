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
import ApplyChangesIcon from "@mui/icons-material/Check";
import ClearChangesIcon from "@mui/icons-material/Close";

class CardContainer extends PureComponent {
  render() {
    const {
      cardStore: {
        cardsWithImages,
        page,
        setPage,
        setDialogOpen,
        currentUserDecks,
        setSelectedDeck,
        currentDeck,
        patchDeck,
        resetDeck,
      },
      routerStore: { goTo, routes },
    } = this.props;
    console.log(routes);
    return (
      <>
        <Box
          container
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <AppBar
            position="static"
            sx={{
              borderRadius: 15,
              backgroundColor: "black",
              justifyContent: "center",
            }}
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Grid item xs={4}>
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="menu"
                  sx={{
                    backgroundColor: "white",
                    marginRight: "40px",
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid>
                <span style={{ marginRight: "40px" }}>
                  <FormControl
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 15,
                    }}
                  >
                    <InputLabel id="user-state-select">Deck</InputLabel>
                    <Select
                      labelId="user-state-select"
                      onChange={setSelectedDeck}
                      sx={{ flexGrow: 1, minWidth: "20vh", borderRadius: 15 }}
                    >
                      {currentUserDecks?.map((deck) => {
                        return (
                          <MenuItem value={deck}>{deck.deckName}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </span>
              </Grid>
              <Grid item xs={4}>
                {currentDeck?.length > 0 && (
                  <>
                    <Button
                      color="success"
                      variant="contained"
                      onClick={() => patchDeck()}
                      sx={{ marginRight: "10px", borderRadius: "50px" }}
                    >
                      <ApplyChangesIcon />
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => resetDeck()}
                      sx={{ marginRight: "10px", borderRadius: "50px" }}
                    >
                      <ClearChangesIcon />
                    </Button>
                  </>
                )}
                <Button
                  color="info"
                  variant="contained"
                  onClick={() => setDialogOpen()}
                  sx={{ borderRadius: "50px" }}
                >
                  <AddToDeckIcon />
                </Button>
              </Grid>
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
export default inject("cardStore", "routerStore")(observer(CardContainer));
