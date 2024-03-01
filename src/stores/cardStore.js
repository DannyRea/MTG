import { makeAutoObservable, runInAction, reaction, toJS } from "mobx";
import axios from "axios";

export default class CardStore {
  page = 1;
  routeCard = {};
  newDeck = {};
  selectedDeck = {};
  cards = [];
  sets = [];
  currentDeck = [];
  userDbDecks = [];
  dialogOpen = false;
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
    });

    // const pageDispose = reaction(
    //   () => this.page,
    //   async (page) => {
    //     await this.refresh();
    //   }
    // );

    // this.pageDispose && this.pageDispose();
  }
  setDialogOpen = () => {
    runInAction(() => {
      this.dialogOpen = !this.dialogOpen;
    });
  };
  addToDeck = (card) => {
    this.currentDeck.push(card);
  };
  removeFromDeck = (card) => {
    const foundCardIndex = this.currentDeck
      .slice()
      .findIndex((deckCard) => deckCard.id === card.id);
    if (foundCardIndex !== -1) {
      this.currentDeck.splice(foundCardIndex, 1);
    }
  };

  refresh = async () => {
    try {
      await this.getCards();
      await this.getSets();
    } catch (err) {
      console.error("ERROR cardStore refresh", err);
    }
  };

  setPage = (val) => {
    runInAction(() => {
      this.page = val;
    });
  };
  setRouteCard = async (id) => {
    await fetch(`https://api.magicthegathering.io/v1/cards/${id}`).then(
      async (res) =>
        res.json().then((res) => {
          runInAction(() => {
            this.routeCard = res.card;
          });
        })
    );
  };
  setNewDeck = (key, val) => {
    runInAction(() => {
      this.newDeck[key] = val;
    });
  };

  resetDeck = () => {
    this.currentDeck = [];
  };

  patchDeck = async () => {
    try {
      await axios
        .patch(
          `http://localhost:3030/mtg/card?deckId=${this.selectedDeck.deckId}`,
          this.currentDeck.slice()
        )
        .then(
          () =>
            this.rootStore.notificationStore.addNotification(
              "Changed saved to deck!"
            ),
          { variant: "success" }
        );
    } catch (e) {
      this.rootStore.notificationStore.addNotification("Error saving to deck"),
        { variant: "error" };
    }
    this.resetDeck();
  };

  getCards = async () => {
    await fetch(
      `https://api.magicthegathering.io/v1/cards?page=${this.page}`
    ).then(async (res) =>
      res.json().then((res) => {
        runInAction(() => {
          this.cards = res.cards;
        });
      })
    );
  };
  getSets = async () => {
    await fetch(
      `https://api.magicthegathering.io/v1/sets?page=${this.page}`
    ).then(async (res) =>
      res.json().then((res) => {
        runInAction(() => {
          this.sets = res.sets;
        });
      })
    );
  };
  getUserDbDecks = async () => {
    console.log(this.rootStore.authStore.currentUser.userId);
    if (this.rootStore.authStore.currentUser?.userId) {
      await axios
        .get(
          `http://localhost:3030/mtg/deck?userId=${this.rootStore.authStore.currentUser.userId}`
        )
        .then(async (res) => {
          console.log(res);
          if (res?.data?.data?.length) {
            this.userDbDecks = [...res.data.data];
          }
          console.log(this.userDbDecks);
        });
    }
  };

  setSelectedDeck = (event) => {
    console.log(event.target.value);
    this.selectedDeck = event.target.value;
  };

  createDeck = async () => {
    console.log(this.rootStore.authStore.currentUser.userId);
    console.log(this.newDeck);
    try {
      await axios
        .post("http://localhost:3030/mtg/deck", {
          userId: this.rootStore.authStore.currentUser.userId,
          ...this.newDeck,
        })
        .then(() => {
          this.rootStore.notificationStore.addNotification(
            `'${this.newDeck.deckName} deck created!'`,
            { variant: "success" }
          );
        });
    } catch (e) {
      this.rootStore.notificationStore.addNotification(
        `Error creating deck: ${e.message ? e.message : e}`
      );
    }
  };

  get cardsWithImages() {
    if (!this.cards || !this.cards?.length) return [];
    return this.cards
      .slice()
      .map((card) => {
        if (card.imageUrl) return card;
      })
      .filter((x) => x);
  }

  get currentUserDecks() {
    return this.userDbDecks.slice() || [];
  }
}
