import { makeAutoObservable, runInAction, reaction, toJS } from "mobx";
import axios from "axios";

export default class CardStore {
  page = 1;
  routeCard = {};
  newDeck = {};
  cards = [];
  sets = [];
  currentDeck = [];
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
  createDeck = async () => {
    await axios.post("http://localhost:3030/mtg/deck", this.newDeck);
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
}
