<template>
  <div>
    <malla></malla>
    <span>{{attempts}}</span>
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
    })
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
