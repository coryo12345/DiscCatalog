<template>
  <v-container>
    <v-row align="center" justify="space-around">
      <v-col dense cols="12" md="auto">
        <h1>Stores</h1>
      </v-col>
      <v-spacer />
      <v-col cols="4" sm="3" md="auto">
        <v-checkbox v-model="showManufacturers" label="Manufacturers" />
      </v-col>
      <v-col cols="4" sm="3" md="auto">
        <v-checkbox v-model="showRetailers" label="Retailers" />
      </v-col>
      <v-col cols="4" sm="3" md="auto">
        <v-checkbox v-model="showPlayers" label="Players" />
      </v-col>
      <v-col cols="12" sm="3" md="auto">
        <v-text-field
          v-model="search"
          placeholder="Search"
          hide-details
          solo
        />
      </v-col>
    </v-row>
    <v-container v-if="showManufacturers">
      <v-row>
        <v-col>
          <h2>Manufacturers</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(store, index) in manufacturers" :key="index" cols="auto">
          <a :href="store.link" target="_blank" class="store-card text--text">{{
            store.display_name
          }}</a>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="showRetailers">
      <v-row>
        <v-col>
          <h2>Retailers</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(store, index) in retailers" :key="index" cols="auto">
          <a :href="store.link" target="_blank" class="store-card text--text">{{
            store.display_name
          }}</a>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="showPlayers">
      <v-row>
        <v-col>
          <h2>Players</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(store, index) in players" :key="index" cols="auto">
          <a :href="store.link" target="_blank" class="store-card text--text">{{
            store.display_name
          }}</a>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { URLS } from '@/constants/';

function storeSort(a, b) {
  if (a.display_name < b.display_name) return -1
  else if (a.display_name > b.display_name) return 1
  else return 0
}

export default {
  name: 'StoresPage',
  data() {
    return {
      stores: [],
      search: '',
      showManufacturers: true,
      showRetailers: true,
      showPlayers: true,
    }
  },
  async fetch() {
    this.stores = await this.$axios.$get(URLS.GET_STORES);
  },
  computed: {
    manufacturers() {
      return this.stores
        .filter((s) => s.store_type === 'FACTORY')
        .filter((s) =>
          s.display_name.toLowerCase().includes(this.search.toLowerCase())
        )
        .sort(storeSort)
    },
    retailers() {
      return this.stores
        .filter((s) => s.store_type === 'RETAILER')
        .filter((s) =>
          s.display_name.toLowerCase().includes(this.search.toLowerCase())
        )
        .sort(storeSort)
    },
    players() {
      return this.stores
        .filter((s) => s.store_type === 'PLAYER')
        .filter((s) =>
          s.display_name.toLowerCase().includes(this.search.toLowerCase())
        )
        .sort(storeSort)
    },
  },
}
</script>

<style scoped>
.store-card {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--v-primary-base);
  text-decoration: none;
}
</style>
