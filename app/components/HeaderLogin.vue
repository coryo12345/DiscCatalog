<template>
  <v-btn v-if="$auth.loggedIn" :to="'/account'" color="text">
    My Account
  </v-btn>
  <v-btn v-else @click="login">
    Sign In
  </v-btn>
</template>

<script>
export default {
  methods: {
    login() {
      this.$auth.loginWith('auth0');
    }
  }
}
</script>
