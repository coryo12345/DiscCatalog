<template>
  <v-container fluid>
    <div v-if="!$auth.loggedIn">
      You must sign in to view your discs. Sign in on the account page.
    </div>
    <div v-else>
      <div class="d-flex align-center mb-4">
        <h1>My Discs</h1>
        <v-btn color="primary" class="ml-auto mr-2" large @click="addDisc"
          >Add Disc</v-btn
        >
        <DiscSearch
          v-model="shownDiscs"
          :discs="discs"
          :attributes="['brand', 'mold', 'plastic', 'color']"
        />
      </div>
      <v-row v-if="loading">
        <v-col v-for="n in 6" :key="n" cols="12" sm="4" md="3">
          <v-skeleton-loader :loading="loading" type="card" class="mx-1" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="(disc, index) in shownDiscs"
          :key="index"
          cols="12"
          sm="4"
          md="3"
        >
          <DiscCard :disc="disc" @details="showDetails" />
        </v-col>
      </v-row>
      <v-dialog v-model="addDiscForm" max-width="700">
        <DiscForm
          :disc="dialogDisc"
          @update="updateDisc"
          @create="createDisc"
        />
      </v-dialog>
      <v-dialog v-model="discDetails" max-width="700">
        <DiscDetail
          :disc="dialogDisc"
          :editable="true"
          @edit="editDiscCallback"
        />
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import { URLS } from '@/constants/';

export default {
  name: 'DiscsPage',
  data() {
    return {
      discs: [],
      shownDiscs: [],
      loading: true,
      addDiscForm: false,
      dialogDisc: {},
      discDetails: false,
    };
  },
  computed: {
    showData() {
      return this.$auth.loggedIn && !this.error;
    },
  },
  async created() {
    if (this.$auth.loggedIn) {
      await this.fetchDiscs();
    }
    this.loading = false;
  },
  methods: {
    async fetchDiscs() {
      this.discs = await this.$axios.$get(URLS.GET_DISCS);
    },
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
    createDisc(disc) {
      this.discs.push(disc);
      this.addDiscForm = false;
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
    },
  },
};
</script>
