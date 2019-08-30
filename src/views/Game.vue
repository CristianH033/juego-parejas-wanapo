<template>
  <div>
    <malla></malla>
    <span>intentos: {{attempts}}</span>
    <span>Clicks: {{clicks}}</span>
  </div>
</template>

<script>
import Malla from "../components/Malla.vue";
import { mapGetters } from "vuex";
export default {
  props: {},
  components: {Malla},
  data: () => ({}),
  computed: {
    ...mapGetters({
      attempts: "getAttempts",
      clicks: "getClicks",
    })
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
