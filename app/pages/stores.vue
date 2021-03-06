<template>
  <v-container fluid>
    <div class="d-flex align-center justify-space-between wrap">
      <h1 class="d-block">Stores</h1>
      <div class="d-flex wrap">
        <v-checkbox
          v-model="showManufacturers"
          label="Manufacturers"
          class="mr-4"
        />
        <v-checkbox v-model="showRetailers" label="Retailers" class="mr-4" />
        <v-checkbox v-model="showPlayers" label="Players" class="mr-4" />
        <v-text-field
          v-model="search"
          placeholder="Search"
          class="text-width my-auto"
          hide-details
          solo
        />
      </div>
    </div>
    <div v-if="loading">
      <v-row>
        <v-col v-for="n in 10" :key="n">
          <v-skeleton-loader :loading="loading" type="button" />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-container v-if="showManufacturers">
        <v-row>
          <v-col>
            <h2>Manufacturers</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="(store, index) in manufacturers"
            :key="index"
            class="my-2"
            cols="auto"
          >
            <a
              :href="store.link"
              target="_blank"
              class="store-card text--text"
              >{{ store.display_name }}</a
            >
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
          <v-col
            v-for="(store, index) in retailers"
            :key="index"
            class="my-2"
            cols="auto"
          >
            <a
              :href="store.link"
              target="_blank"
              class="store-card text--text"
              >{{ store.display_name }}</a
            >
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
          <v-col
            v-for="(store, index) in players"
            :key="index"
            class="my-2"
            cols="auto"
          >
            <a
              :href="store.link"
              target="_blank"
              class="store-card text--text"
              >{{ store.display_name }}</a
            >
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import { URLS } from '@/constants/';

function storeSort(a, b) {
  if (a.display_name < b.display_name) return -1;
  else if (a.display_name > b.display_name) return 1;
  else return 0;
}

export default {
  name: 'StoresPage',
  data() {
    return {
      loading: true,
      stores: [],
      search: '',
      showManufacturers: true,
      showRetailers: true,
      showPlayers: true,
    };
  },
  async fetch() {
    this.stores = await this.$axios.$get(URLS.GET_STORES);
    this.loading = false;
  },
  computed: {
    manufacturers() {
      return this.stores
        .filter((s) => s.store_type === 'FACTORY')
        .filter((s) =>
          s.display_name.toLowerCase().includes(this.search.toLowerCase())
        )
        .sort(storeSort);
    },
    retailers() {
      return this.stores
        .filter((s) => s.store_type === 'RETAILER')
        .filter((s) =>
          s.display_name.toLowerCase().includes(this.search.toLowerCase())
        )
        .sort(storeSort);
    },
    players() {
      return this.stores
        .filter((s) => s.store_type === 'PLAYER')
        .filter((s) =>
          s.display_name.toLowerCase().includes(this.search.toLowerCase())
        )
        .sort(storeSort);
    },
  },
};
</script>

<style scoped>
.store-card {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--v-primary-base);
  text-decoration: none;
}

.text-width {
  max-width: 18em;
}

.wrap {
  flex-wrap: wrap;
}
</style>
