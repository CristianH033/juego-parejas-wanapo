import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import _ from "lodash";

import items from "./items";

Vue.use(Vuex);

const VuexPersist = new VuexPersistence({
  key: "wanapo-app",
  storage: localStorage
});

export default new Vuex.Store({
  state: {
    ongoingGame: false,
    win: false,
    items: items,
    attempts: 0,
    time: null
  },
  getters: {
    getItems: state => {
      return state.items;
    },
    getSelectedItems: (state, getters) => {
      return getters.getItems.filter(item => item.selected);
    },
    getFlippedItems: (state, getters) => {
      return getters.getItems.filter(item => item.flipped);
    },
    getTotalFliped: (state, getters) => {
      return getters.getSelectedItems.length + getters.getFlippedItems.length;
    },
    getTotalSelected: (state, getters) => {
      return getters.getSelectedItems.length;
    },
    getItemsLeft: (state, getters) => {
      return getters.getItems.length - getters.getFlippedItems.length;
    },
    getWin: state => {
      return state.win;
    },
    getOngoingGame: state => {
      return state.ongoingGame;
    },
    getAttempts: state => {
      return state.attempts;
    }
  },
  mutations: {
    setItems: (state, items) => {
      state.items = items;
    },
    setItem: (state, item) => {
      Object.assign(
        state.items.find(i => i.id === item.id),
        item
      );
    },
    setSelected: (state, item) => {
      item.selected = true;
    },
    setUnselected: (state, item) => {
      item.selected = false;
    },
    setToggleSelected: (state, item) => {
      item.selected = !item.selected;
    },
    setFlipped: (state, item) => {
      item.flipped = true;
    },
    setUnFlipped: (state, item) => {
      item.flipped = false;
    },
    setItemsFlipped: (state, items) => {
      items.map(item => (item.flipped = true));
    },
    setItemsUnFlipped: (state, items) => {
      items.map(item => (item.flipped = false));
    },
    unselectItems: (state, items) => {
      items.map(item => (item.selected = false));
    },
    unselectAll(state) {
      state.items.map(item => (item.selected = false));
    },
    unflipAll(state) {
      state.items.map(item => (item.flipped = false));
    },
    setAttempts: (state, attempts) => {
      state.attempts = attempts;
    },
    setOngoingGame: (state, value) => {
      state.ongoingGame = value;
    },
    setWin: (state, value) => {
      state.win = value;
    }
  },
  actions: {
    shuffleItems: ({ commit }) => {
      commit("setItems", _.shuffle(items));
    },
    setSelected: ({ commit }, item) => {
      return new Promise(resolve => {
        commit("setToggleSelected", item);
        resolve();
      });
    },
    setFlipped: ({ commit }, item) => {
      return new Promise(resolve => {
        commit("setFlipped", item);
        resolve();
      });
    },
    unselectItemsSelected: ({ commit, getters }) => {
      return new Promise(resolve => {
        commit("unselectItems", getters.getSelectedItems);
        resolve();
      });
    },
    setItemsFlipped: ({ commit }, items) => {
      return new Promise(resolve => {
        commit("setItemsFlipped", items);
        resolve();
      });
    },
    setItemsUnFlipped: ({ commit }, items) => {
      return new Promise(resolve => {
        commit("setItemsUnFlipped", items);
        resolve();
      });
    },
    unselectAll: ({ commit }) => {
      return new Promise(resolve => {
        commit("unselectAll");
        resolve();
      });
    },
    unflipAll: ({ commit }) => {
      return new Promise(resolve => {
        commit("unflipAll");
        resolve();
      });
    },
    incrementAttempts: ({ commit, getters }) => {
      return new Promise(resolve => {
        commit("setAttempts", getters.getAttempts + 1);
        resolve();
      });
    },
    resetAttempts: ({ commit }) => {
      return new Promise(resolve => {
        commit("setAttempts", 0);
        resolve();
      });
    },
    setOngoingGame: ({ commit }, val) => {
      return new Promise(resolve => {
        commit("setOngoingGame", val);
        resolve();
      });
    },
    setWin: ({ commit }, val) => {
      return new Promise(resolve => {
        commit("setWin", val);
        resolve();
      });
    },
    newGame: ({ getters, dispatch }) => {
      return new Promise(resolve => {
        let time = getters.getTotalFliped > 0 ? 500 : 0;
        let t2 = getters.getWin ? 500 : 0;
        time += t2;
        dispatch("setWin", false);
        setTimeout(() => {
          dispatch("unselectAll");
          dispatch("unflipAll");
          dispatch("resetAttempts");
          dispatch("setOngoingGame", false);
        }, t2);
        setTimeout(() => {
          dispatch("shuffleItems");
          resolve();
        }, time);
      });
    }
  },
  plugins: [VuexPersist.plugin]
});
