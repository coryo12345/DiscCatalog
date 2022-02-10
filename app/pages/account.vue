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
      <v-btn class="my-auto ml-auto" color="primary" @click="logout">
        Log Out
      </v-btn>
    </div>
    <div><h2>Settings</h2></div>
    <div class="d-block">
      <v-text-field
        v-model="displayName"
        class="shrink"
        label="Display Name"
        outlined
        dense
      />
      <v-btn color="primary" @click="saveSettings">Save</v-btn>
    </div>
    <div>
      {{ $auth.user }}
    </div>
  </v-container>
</template>

<script>
// import { URLS } from '@/constants/'

export default {
  name: 'AccountPage',
  data() {
    return {
      displayName: '',
    }
  },
  created() {
    // check if logged in
    if (this.$auth.loggedIn) {
      // TODO fetch displayName
      this.displayName = ''
    } else {
      // take to login page if not
      this.$auth.loginWith('auth0')
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    saveSettings() {
      // TODO save displayName
      alert('TODO')
    },
  },
}
</script>

<style lang="scss" scoped>
#dc-account > div {
  margin-bottom: 1em;
}

.v-text-field {
  max-width: 20em;
}
</style>
