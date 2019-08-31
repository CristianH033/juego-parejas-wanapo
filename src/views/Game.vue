<template>
  <div id="app" class="game">
    <img class="logo" src="@/assets/svg/logo.svg" alt="logo" />
    <div class="pad">
      <transition name="win">
        <div v-if="win" class="win-message">
          <p>🎉 Felicitaciones! 🎉</p>
        </div>
      </transition>
      <malla></malla>
      <div class="info">
        <p>intentos: {{attempts}}</p>
        <button @click="newGame">Nuevo Juego</button>
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
      this.$store.dispatch("newGame");
    }
  },
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style lang="scss" scoped>
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
  top: 30px;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 30px;
  text-align: center;
  font-size: 30pt;
}
.logo {
  flex-grow: 1;
  align-self: flex-end;
  margin: 15px;
  max-width: 300px;
  width: 100%;
}
.info {
  display: flex;
  justify-content: space-between;
  font-size: 20pt;
}

// Transitions
.win-enter-active,
.win-leave-active {
  transition: transform 0.5s;
}
.win-enter, .win-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-100%);
}
</style>
