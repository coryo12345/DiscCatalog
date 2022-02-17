<template>
  <v-card class="disc-card" @click="showDetails">
    <v-card-title class="word-break d-flex justify-space-between">
      <span>{{ name }}</span>
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
      const pl = this.disc.plastic ? this.disc.plastic : '';
      const mld = this.disc.mold ? this.disc.mold : '';
      return `${pl} ${mld}`.trim();
    },
  },
  methods: {
    showDetails() {
      this.$emit('details', this.disc);
    }
  }
};
</script>

<style scoped>
.word-break.v-card__title {
  word-break: break-word;
}

.disc-card {
  height: 100%;
}
</style>
