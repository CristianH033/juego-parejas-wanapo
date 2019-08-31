<template>
  <div
    class="flip-card"
    :class="{ 'selected': item.selected | item.flipped, 'flipped': item.flipped }"
    @click="$emit('click')"
  >
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <span>?</span>
      </div>
      <div
        class="flip-card-back"
        :style="{'background-image': `url(${require(`@/assets/svg/${item.value}.svg`)})`}"
      >
        <transition name="wrong">
          <span v-if="wrong">❌</span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: { item: Object },
  data: () => ({}),
  computed: {
    ...mapGetters({
      selectedItems: "getSelectedItems"
    }),
    totalSelected() {
      return this.selectedItems.length;
    },
    wrong() {
      return (
        this.item.selected && !this.item.flipped && this.totalSelected >= 2
      );
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.flip-card {
  perspective: 500px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  border-radius: 50%;
}

.flip-card.selected .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front {
  background-color: rgb(130, 0, 190);
  color: white;
}
.flip-card-back {
  background-color: rgb(255, 255, 255);
}
.flip-card-front,
.flip-card-back {
  font-size: 45pt;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 50%;
  border: 5px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
}

.flip-card-front.wrong,
.flip-card-back.wrong {
  border: 5px solid rgb(182, 0, 0);
}

.flip-card-back {
  transform: rotateY(180deg);
}

.flipped {
  animation: match 0.6s 0.4s ease-in-out;
}

.wrong-enter-active,
.wrong-leave-active {
  transition: opacity 0.5s;
  transition-delay: 0.5s;
}
.wrong-enter,
.wrong-leave-to {
  opacity: 0;
}

@keyframes match {
  0% {
    transform: scale(1);
    background-color: rgb(131, 255, 131);
  }
  25% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    background-color: rgb(131, 255, 131);
  }
}
</style>
