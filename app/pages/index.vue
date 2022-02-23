<template>
  <v-container>
    <div class="d-flex justify-center mt-4 mb-12">
      <h1>DiscCatalog</h1>
    </div>
    <v-row class="max-width mx-auto">
      <v-col v-for="link in links" :key="link.name" cols="12" sm="6">
        <v-card class="pa-8 even-height" :to="link.to">
          <v-card-title class="d-flex justify-center">{{ link.name }}</v-card-title>
          <v-card-subtitle class="d-flex justify-center">{{ link.desc }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      links: [
        {
          name: 'Browse',
          desc: 'View publicly shared discs from other users',
          to: '/browse'
        },
        {
          name: 'Your Discs',
          desc: 'View and edit your uploaded discs',
          to: '/discs'
        },
        {
          name: 'Shop',
          desc: 'Find and shop for new discs',
          to: '/stores'
        },
        {
          name: 'Your Account',
          desc: 'See your account details and update your details',
          to: '/account'
        },
      ]
    };
  },
  created() {
    if (this.$auth.loggedIn) {
      const token = this.$auth.strategy.token.get();
      this.$axios.setToken(token);
    }
  },
};
</script>

<style scoped>
.max-width {
  max-width: 50em;
}

.even-height {
  height: 100%;
}
</style>
