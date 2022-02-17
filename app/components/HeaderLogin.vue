<template>
  <v-btn v-if="$auth.loggedIn && $route.name === 'account'" @click="logout">
    Log Out
  </v-btn>
  <v-btn v-else-if="$auth.loggedIn" :to="'/account'" color="text">
    My Account
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
