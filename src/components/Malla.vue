<template>
  <div>
    <transition-group name="flip-list" tag="div" class="flex flex-wrap max-w-2xl overflow-hidden">
      <div v-for="item in items" :key="item.id" class="my-2 px-2 w-1/4 overflow-hidden">
        <logo :item="item" @click="select(item)"></logo>
      </div>
    </transition-group>
    <br />
    <button class="py-2 px-4 rounded text-white bg-green-500" @click="newGame">Nuevo Juego</button>
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
      items: "getItems",
      selectedItems: "getSelectedItems",
      flippedItems: "getFlippedItems",
      win: "getWin",
      ongoingGame: "getOngoingGame"
    })
  },
  methods: {
    select(item) {
      if (item.flipped) {
        return;
      }

      if (this.selectedItems.find(i => i.id == item.id)) {
        this.$store.dispatch("setSelected", item);
        return;
      }

      if (this.selectedItems.length >= 2) {
        this.$store.dispatch("unselectItemsSelected");
        this.$store.dispatch("incrementAttempts");
      }

      if ((prevItem = this.selectedItems.find(i => i.value == item.value))) {
        var prevItem;
        this.$store.dispatch("setItemsFlipped", [prevItem, item]);
        this.$store.dispatch("unselectItemsSelected");
        this.$store.dispatch("incrementAttempts");
        return;
      }

      this.$store.dispatch("setSelected", item);
    },
    newGame() {
      let time = (this.selectedItems.length > 0 | this.flippedItems.length > 0) ? 500 : 0;
      this.$store.dispatch("unselectAll");
      this.$store.dispatch("unflipAll");
      this.$store.dispatch("resetAttempts");
      setTimeout(() => {
        this.$store.dispatch("shuffleItems");
      }, time);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform .6s;
}
</style>
