import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import _ from "lodash"

Vue.use(Vuex);

const VuexPersist = new VuexPersistence({
  key: "wanapo-app",
  storage: localStorage
});

export default new Vuex.Store({
  state: {
    ongoingGame: false,
    win: false,
    items: [
      { id: 1, img: "", text: "1", flipped: false, selected: false, value: 1 },
      { id: 2, img: "", text: "2", flipped: false, selected: false, value: 1 },
      { id: 3, img: "", text: "3", flipped: false, selected: false, value: 2 },
      { id: 4, img: "", text: "4", flipped: false, selected: false, value: 2 },
      { id: 5, img: "", text: "5", flipped: false, selected: false, value: 3 },
      { id: 6, img: "", text: "6", flipped: false, selected: false, value: 3 },
      { id: 7, img: "", text: "7", flipped: false, selected: false, value: 4 },
      { id: 8, img: "", text: "8", flipped: false, selected: false, value: 4 },
      { id: 9, img: "", text: "9", flipped: false, selected: false, value: 5 },
      { id: 10, img: "", text: "10", flipped: false, selected: false, value: 5 },
      { id: 11, img: "", text: "11", flipped: false, selected: false, value: 6 },
      { id: 12, img: "", text: "12", flipped: false, selected: false, value: 6 }
    ]
  },
  getters: {
    getItems: state => {
      return state.items;
    },
    getShuffleItems: (state, getters) => {
      return _.shuffle(getters.getItems);
    },
    getSelectedItems: (state, getters) => {
      return getters.getItems.filter(item => item.selected);
    },
    getWin: state => {
      return state.win;
    },
    getOngoingGame: state => {
      return state.ongoingGame;
    },
  },
  mutations: {
    setItems: (state, items) => {
      state.items = items;
    },
    setItem: (state, item) => {
      Object.assign(state.items.find(i => i.id === item.id), item);
    },
    setSelected(state, item) {
      Vue.set(item, "selected", true);
    },
    setUnselected(state, item) {
      Vue.set(item, "selected", false);
    },
    setToggleSelected(state, item) {
      Vue.set(item, "selected", !item.selected);
    },
    setFlipped(state, item) {
      Vue.set(item, "flipped", true);
    },
    setUnFlipped(state, item) {
      Vue.set(item, "flipped", false);
    },
    unselectItems(state, items) {
      items.map(item => (item.selected = false));
    },
    unselectAll(state) {
      state.items.map(item => (item.selected = false));
    }
  },
  actions: {
    setSelected: ({ commit, getters }, item) => {
      return new Promise((resolve) => {
        if(getters.getSelectedItems.find(i => i.value == item.value && i.id != item.id)){
          commit("setFlipped", getters.getSelectedItems.find(i => i.value == item.value));
          commit("setFlipped", item);
          commit("unselectItems", getters.getSelectedItems);
          // return resolve();
        }else{
          commit("setToggleSelected", item);
        }
        return resolve();
      });
    },
    unselectItemsSelected: ({ commit, getters }) => {
      commit("unselectItems", getters.getSelectedItems);
    }
  },
  plugins: [VuexPersist.plugin]
});
