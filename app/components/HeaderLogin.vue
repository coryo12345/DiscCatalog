<template>
  <v-btn v-if="$auth.loggedIn" @click="logout">
    Log Out
  </v-btn>
  <v-btn v-else @click="login"> Sign In </v-btn>
</template>

<script>
export default {
  methods: {
    login() {
      this.$auth.loginWith('auth0');
    },
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
