<template>
  <v-container id="dc-account">
    <div class="d-block">
      <h1>Account</h1>
    </div>
    <div v-if="$auth.loggedIn" class="d-flex align-center">
      <v-avatar v-if="!!$auth.user.picture">
        <img :src="$auth.user.picture" alt="user profile picture" />
      </v-avatar>
      <p class="my-0 ml-2 text-h6">{{ $auth.user.name }}</p>
    </div>
    <div><h2>Settings</h2></div>
    <div class="d-block">
      <v-text-field
        v-model="displayName"
        class="shrink d-inline-block"
        :loading="loading"
        label="Display Name"
        outlined
        dense
      />
      <p class="d-inline-block accent--text ml-2">
        Display name for public posts
      </p>
      <v-btn color="primary" class="d-block" @click="saveSettings">Save</v-btn>
    </div>
  </v-container>
</template>

<script>
import { URLS } from '@/constants/';

export default {
  name: 'AccountPage',
  data() {
    return {
      loading: true,
      displayName: '',
    };
  },
  async created() {
    // check if logged in
    if (this.$auth.loggedIn) {
      const userData = await this.$axios.$get(URLS.CURRENT_USER);
      this.displayName = userData.displayName;
      this.loading = false;
    } else {
      // take to login page if not
      this.$auth.loginWith('auth0');
    }
  },
  methods: {
    saveSettings() {
      this.$axios.$post(URLS.UPDATE_CURRENT_USER, {
        displayName: this.displayName,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#dc-account > div {
  margin-bottom: 1em;
}

.v-text-field {
  max-width: 20em;
}
</style>
