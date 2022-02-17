<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <h1>My Discs</h1>
      <v-btn color="primary" class="ml-auto" @click="addDisc"
        >Add Disc</v-btn
      >
    </div>
    <v-row v-if="loading">
      <v-col 
        v-for="n in 6"
        :key="n"
        cols="12"
        sm="4"
        md="3"
      >
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
    <v-dialog v-model="addDiscForm" max-width="700">
      <DiscForm :disc="dialogDisc" @update="updateDisc" />
    </v-dialog>
    <v-dialog v-model="discDetails" max-width="700">
      <DiscDetail :disc="dialogDisc" @edit="editDiscCallback" />
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
      addDiscForm: false,
      dialogDisc: {},
      discDetails: false
    };
  },
  async created() {
    this.discs = await this.$axios.$get(URLS.GET_DISCS);
    // temp
    this.discs.push(...[
      { id: 0, brand: 'Innova', mold: 'Destroyer', plastic: 'Halo' },
      { id: 1, brand: 'Innova', mold: 'Firebird', plastic: 'Champion' },
      { id: 2, brand: 'Discraft', mold: 'Buzzz', plastic: 'Z' },
      { id: 3, brand: 'Discraft', mold: 'Heat', plastic: 'ESP' },
      { id: 4, brand: 'Discmania', mold: 'P2', plastic: 'D-line' },
    ]);
    this.loading = false;
  },
  methods: {
    addDisc() {
      this.dialogDisc = {};
      this.addDiscForm = true;
      this.discDetails = false;
    },
    editDiscCallback(disc) {
      this.dialogDisc = disc;
      this.addDiscForm = true;
    },
    showDetails(disc) {
      this.dialogDisc = disc;
      this.addDiscForm = false;
      this.discDetails = true;
    },
    updateDisc(disc) {
      const id = disc.id;
      if (id === undefined) return;
      let idx = -1;
      for (let i = 0; i < this.discs.length; i++) {
        if (id === this.discs[i].id) idx = i;
      }
      if (idx === -1) return;
      this.discs[idx] = disc;
      this.dialogDisc = this.discs[idx];
      this.addDiscForm = false;
    }
  },
};
</script>
