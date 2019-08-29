<template>
  <div id="app" class="h-screen w-screen">
    <div id="nav">
      <router-link :to="{ name: 'home' }">Inicio</router-link>|
      <router-link :to="{ name: 'game' }">Juego</router-link>|
      <router-link :to="{ name: 'results' }">Resultados</router-link>
    </div>
      <router-view />
  </div>
</template>

<script>
export default {
  props: {},
  data: () => ({}),
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
