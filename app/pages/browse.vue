<template>
  <v-container fluid>
    <h1>Browse Discs</h1>
    <p>
      These are discs that other users have shared. You can share your discs by
      checking the shared box for any disc.
    </p>
    <v-row v-if="loading">
      <v-col v-for="n in 6" :key="n" cols="12" sm="4" md="3">
        <v-skeleton-loader :loading="loading" type="card" class="mx-1" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="(disc, index) in discs"
        :key="index"
        cols="12"
        sm="4"
        md="3"
      >
        <DiscCard :disc="disc" @details="showDetails" />
      </v-col>
    </v-row>
    <v-dialog v-model="discDetails" max-width="700">
      <DiscDetail :disc="dialogDisc" :editable="false" />
    </v-dialog>
  </v-container>
</template>

<script>
import { URLS } from '@/constants/';

export default {
  name: 'BrowsePage',
  data() {
    return {
      discs: [],
      dialogDisc: {},
      loading: true,
      discDetails: false
    };
  },
  async fetch() {
    this.discs = await this.$axios.$get(URLS.GET_ALL_DISCS);
    this.loading = false;
  },
  methods: {
    showDetails(disc) {
      this.dialogDisc = disc;
      this.discDetails = true;
    }
  }
};
</script>
