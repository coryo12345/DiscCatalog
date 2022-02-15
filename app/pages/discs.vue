<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <h1>My Discs</h1>
      <v-btn color="primary" class="ml-auto" @click="addDiscForm = !addDiscForm">Add Disc</v-btn>
    </div>
    <div v-if="loading">
      <v-skeleton-loader :loading="loading" />
    </div>
    <v-row v-else>
      <v-col v-for="(disc, index) in discs" :key="index" cols="12" sm="4" md="3">
        <disc-card :disc="disc" />
      </v-col>
    </v-row>
    <v-dialog v-model="addDiscForm" max-width="700">
      <DiscForm />
    </v-dialog>
  </v-container>
</template>

<script>
import { URLS } from '@/constants/';

export default {
  name: 'DiscsPage',
  data() {
    return {
      discs: [],
      loading: true,
      addDiscForm: false
    }
  },
  async fetch() {
    this.discs = await this.$axios.$get(URLS.GET_DISCS);
    // temp
    this.discs = [
      { brand: 'Innova', mold: 'Destroyer', plastic: 'Halo' },
      { brand: 'Innova', mold: 'Firebird', plastic: 'Champion' },
      { brand: 'Discraft', mold: 'Buzzz', plastic: 'Z' },
      { brand: 'Discraft', mold: 'Heat', plastic: 'ESP' },
      { brand: 'Discmania', mold: 'P2', plastic: 'D-line' },
    ]
    this.loading = false
  },
  methods: {
    createDisc() {
      alert('FORM TO CREATE DISC')
    }
  }
}
</script>
