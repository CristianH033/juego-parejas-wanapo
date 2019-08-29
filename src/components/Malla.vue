<template>
  <div>
    <div class="flex flex-wrap max-w-2xl overflow-hidden">
      <div
        v-for="item in items"
        :key="item.id"
        class="my-2 px-2 w-1/4 overflow-hidden"
      >
        <logo :item="item" @click="select(item)"></logo>
      </div>
    </div>
    <button
      class="py-2 px-4 rounded text-white"
      :class="[item.selected | item.flipped ? 'bg-red-500' : 'bg-blue-500']"
      v-for="item in items"
      :key="item.id"
      @click="select(item)"
    >
      {{ item.text }}
    </button>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
import { mapGetters } from "vuex";
export default {
  props: {},
  components: { Logo },
  data: () => ({}),
  computed: {
    ...mapGetters({
      items: "getShuffleItems",
      selectedItems: "getSelectedItems",
      win: "getWin",
      ongoingGame: "getOngoingGame",
      // ...
    })
  },
  methods: {
    select(item) {
      if (item.flipped) {
        return;
      }

      if (this.selectedItems.length >= 2){
        this.$store.dispatch("unselectItemsSelected");
      }
      
      this.$store.dispatch("setSelected", item);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
