import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const VuexPersist = new VuexPersistence({
  key: "wanapo-app",
  storage: localStorage
});

export default new Vuex.Store({
  state: {
    number: 1
  },
  getters: {
    getNumber: state => {
      return state.number;
    }
  },
  mutations: {
    setNumber: (state, number) => {
      state.number = number;
    }
  },
  actions: {
    setNumber: ({commit}, number) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            commit("setNumber", number);
            resolve();
          } catch (error) {
            reject(error);
          }
        }, 100);
      });
    }
  },
  plugins: [VuexPersist.plugin]
});
