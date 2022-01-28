<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Discs</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(disc, index) in discs" :key="index" cols="auto">
        <disc-card :disc="disc" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import DiscCard from '../components/DiscCard.vue';
import { mapGetters } from 'vuex'

export default {
  name: 'DiscsPage',
  computed: {
    ...mapGetters({
      discs: 'getDiscs',
    }),
  },
  created() {
    this.$store.dispatch('loadDiscs');
  },
}
</script>
