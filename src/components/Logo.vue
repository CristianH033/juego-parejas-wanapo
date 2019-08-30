<template>
  <div
    class="flip-card h-20 w-20 mx-auto flex cursor-pointer m-5"
    :class="{ 'selected': item.selected | item.flipped, 'flipped': item.flipped }"
    @click="$emit('click')"
  >
    <div class="flip-card-inner flex mx-auto">
      <div
        class="flip-card-front bg-blue-300 rounded-lg shadow-lg flex justify-center items-center mx-auto"
      >
        <span class="text-5xl">?</span>
      </div>
      <div
        class="flip-card-back bg-red-300 rounded-lg shadow-lg flex justify-center items-center mx-auto"
      >
        <span class="text-5xl">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { item: Object },
  data: () => ({}),
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.flip-card {
  perspective: 500px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

.flip-card.selected .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.flipped {
  animation: match 0.6s 0.4s ease-in-out;
}

// .flipped .flip-card-back {
//   @apply bg-green-500;
// }

@keyframes match {
  0% {
    transform: scale(1);
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
  }
}
</style>
