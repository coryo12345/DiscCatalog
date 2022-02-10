<template>
  <v-container>
    <h1>Auth</h1>
    <v-btn @click.stop="login">Login</v-btn>
    <v-btn @click.stop="logout">Logout</v-btn>
    <br />
    <v-btn @click="log">auth</v-btn>
    {{$auth.user}}
    <p v-if="$auth.loggedIn">Logged in</p>
    <p v-else>Not Logged in</p>
  </v-container>
</template>

<script>
export default {
  name: 'AuthPage',
  mounted() {

  },
  methods: {
    async login() {
      await this.$auth.loginWith('auth0');
    },
    async logout() {
      await this.$auth.logout();
    },
    log() {
      console.log(this.$auth);
      console.log(this.$store);
      console.log(this.$auth.strategy.token.get());
    }
  },
}
</script>
