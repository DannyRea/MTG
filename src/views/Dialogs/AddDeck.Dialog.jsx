import { inject, observer } from "mobx-react";
import { PureComponent } from "react";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { DialogActions } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Radio, RadioGroup, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

class AddDeckDialog extends PureComponent {
  deckOptions = {};
  deckTypes = [];
  deckFormatValue = "";
  deckName = "";
  constructor(props) {
    super(props);
    makeObservable(this, {
      deckOptions: observable,
      deckFormatValue: observable,
      handleDeckFormatValue: action,
      handleDeckTypes: action,
      handleDeckName: action,
      resetDeck: action,
      validateDeckName: computed,
      validateDeckTypes: computed,
      validateFormat: computed,
      validateSubmit: computed,
    });
  }
  handleDeckFormatValue = (event) => {
    const {
      cardStore: { setNewDeck },
    } = this.props;
    this.deckFormatValue = event.target.value;
    setNewDeck("deckFormat", this.deckFormatValue);
  };
  handleDeckTypes = (type) => {
    const {
      cardStore: { setNewDeck },
    } = this.props;
    console.log(type);
    const typeFoundIndex = this.deckTypes.slice().findIndex((t) => t === type);
    if (typeFoundIndex !== -1) {
      this.deckTypes.splice(typeFoundIndex, 1);
    } else {
      this.deckTypes.push(type);
    }
    setNewDeck("deckTypes", this.deckTypes.join());
  };
  handleDeckName = (name) => {
    const {
      cardStore: { setNewDeck },
    } = this.props;
    this.deckName = name;
  };
  resetDeck = () => {
    this.deckName = "";
    this.deckTypes = [];
    this.deckFormatValue = "";
  };
  get validateDeckName() {
    return 0 < this.deckName?.length <= 35;
  }
  get validateDeckTypes() {
    return !!this.deckTypes.length;
  }
  get validateFormat() {
    return !!this.deckFormatValue.length;
  }
  get validateSubmit() {
    return (
      this.validateDeckName && this.validateDeckTypes && this.validateFormat
    );
  }
  //TODO: Fix computed validating submit
  render() {
    const {
      cardStore: { dialogOpen, setDialogOpen, createDeck, setNewDeck },
      notificationStore: { addNotification },
    } = this.props;
    const validateSubmit = computed(() => {
      return (
        this.validateDeckName && this.validateDeckTypes && this.validateFormat
      );
    }).get();

    return (
      <Dialog open={dialogOpen}>
        <DialogTitle>{"Create Deck"}</DialogTitle>
        <DialogContent>
          <div style={{ padding: "20px" }}>
            <TextField
              required
              onChange={(event) => this.handleDeckName(event.target.value)}
              label={"Deck Name"}
            ></TextField>
          </div>
          <Divider />
          <div style={{ padding: "20px" }}>
            <FormControl required>
              <FormLabel component="legend">Pick Types</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    value={"black"}
                    onClick={(event) =>
                      this.handleDeckTypes(event.target.value)
                    }
                  />
                }
                label="Black"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={"blue"}
                    onClick={(event) =>
                      this.handleDeckTypes(event.target.value)
                    }
                  />
                }
                label="Blue"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={"green"}
                    onClick={(event) =>
                      this.handleDeckTypes(event.target.value)
                    }
                  />
                }
                label="Green"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={"red"}
                    onClick={(event) =>
                      this.handleDeckTypes(event.target.value)
                    }
                  />
                }
                label="Red"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={"white"}
                    onClick={(event) =>
                      this.handleDeckTypes(event.target.value)
                    }
                  />
                }
                label="White"
              />
            </FormControl>
          </div>
          <Divider />
          <FormControl required sx={{ m: 3 }} variant="standard">
            <FormLabel>Deck Format</FormLabel>

            <RadioGroup
              row
              defaultValue="Commander"
              value={this.deckFormatValue}
              onChange={this.handleDeckFormatValue}
            >
              <FormControlLabel
                control={<Radio />}
                value="commander"
                label="Commander"
              />
              <FormControlLabel
                control={<Radio />}
                value="standard"
                label="Standard"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "flex" }}
          variant="standard"
        >
          <Button
            disabled={() => validateSubmit()}
            onClick={async () => {
              await createDeck()
                .then(() => {
                  addNotification("Deck Created", {
                    variant: "success",
                    position: "bc",
                  });
                })
                .catch((e) => {
                  addNotification("Deck Error", {
                    variant: "error",
                    position: "bc",
                  });
                  console.log(e);
                });
              this.resetDeck();
              setDialogOpen();
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default inject(
  "cardStore",
  "notificationStore"
)(observer(AddDeckDialog));
