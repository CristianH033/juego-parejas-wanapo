<template>
  <div class="home">
    <img src="@/assets/svg/logo.svg" class="logo" alt />
    <div class="flex flex-wrap max-w-2xl overflow-hidden justify-around">
      <button @click="newGame">Nuevo Juego</button>
      <button v-if="onGoingGame" @click="resumeGame">Reanudar Juego</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {},
  data: () => ({}),
  computed: {
    ...mapGetters({
      onGoingGame: "getOngoingGame"
    })
  },
  methods: {
    newGame() {
      this.$router.push({ name: "game" });
      this.$store.dispatch("newGame");
    },
    resumeGame() {
      this.$router.push({ name: "game" });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.home{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.logo {
  max-width: 400px;
  width: 100%;
}
</style>
