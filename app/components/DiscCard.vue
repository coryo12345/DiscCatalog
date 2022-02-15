<template>
  <v-card class="max-height">
    <v-card-title class="word-break">
      {{ name }}
    </v-card-title>
    <v-card-subtitle>
      {{ disc.brand }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    /**
     * The disc object to display as a card
     * Disc {
     *  brand
     *  mold
     *  plastic
     *  weight
     *  run
     *  foil
     *  stamp
     *  color
     * }
     */
    disc: {
      type: Object,
      required: true,
    },
  },
  computed: {
    name() {
      return `${this.disc.plastic} ${this.disc.mold}`
    },
  },
}
</script>

<style scoped>
.word-break.v-card__title {
  word-break: break-word;
}

.max-height {
  height: 100%;
}
</style>
