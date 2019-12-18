<template>
  <div id="app" class="game">
    <transition name="win">
      <div v-if="win" class="win-message">
        <div class="message">
          <p>🎉 Felicitaciones! 🎉</p>
          <button @click="newGame">Nuevo Juego</button>
        </div>
      </div>
    </transition>
    <img class="logo" src="@/assets/svg/logo.svg" alt="logo" />
    <div class="pad">
      <malla></malla>
      <div class="info">
        <p>intentos: {{ attempts }}</p>
        <button @click="newGame">Nuevo Juego</button>
        <!-- <button @click="winGame">Ganar Juego</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import Malla from "../components/Malla.vue";
import { mapGetters } from "vuex";
export default {
  props: {},
  components: { Malla },
  data: () => ({}),
  computed: {
    ...mapGetters({
      attempts: "getAttempts",
      win: "getWin",
      onGoingGame: "getOngoingGame"
    })
  },
  methods: {
    newGame() {
      // this.$store.dispatch("setWin", !this.win);
      this.$store.dispatch("newGame");
    },
    winGame() {
      // this.$store.dispatch("setWin", !this.win);
      this.$store.dispatch("setItemsFlipped", this.$store.getters.getItems);
    }
  },
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style lang="scss" scoped>

$transition: .5s;
$delay: 1s;

.game {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}
.win-message {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
  // padding: 20px;
  // border-radius: 30px;
  // text-align: center;
  font-size: 30pt;
}
.message {
  opacity: 1;
  text-align: center;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 30px;
  text-align: center;
}
.logo {
  flex-grow: 1;
  align-self: flex-end;
  margin: 15px;
  max-width: 300px;
  width: 100%;
}
.pad {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  font-size: 20pt;
}

// Transitions
.win-enter-active {
  transition: all $transition $delay;
}
.win-leave-active {
  transition: all $transition;
  // transition: transform 0.5s;
}
.win-enter, .win-leave-to {
  // transform: translateY(-100%);
  background-color: rgba(255, 255, 255, 0);
  // opacity: 0;
}

.win-enter-active .message {
  transition: all ($transition / 2) ($delay + ($transition / 2));
}
.win-enter .message {
  opacity: 0;
  transform: scale(1.1);
}

.win-leave-active .message {
  transition: all ($transition / 2);
}
.win-leave-to .message {
  opacity: 0;
  transform: scale(1.1);
  // backdrop-filter: blur(0px);
}
</style>
