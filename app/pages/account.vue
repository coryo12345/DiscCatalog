<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Account</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="name" placeholder="Name" solo />
      </v-col>
      <v-col>
        <v-text-field v-model="email" placeholder="Email" solo />
      </v-col>
      <v-col>
        <v-btn @click="addUser">Add</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <h1>Users</h1>
    </v-row>
    <v-row v-for="user in users" :key="user.email">
      <v-col>Name: {{ user.name }}</v-col>
      <v-col>Email: {{ user.email }}</v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AccountPage',
  data() {
    return {
      name: '',
      email: '',
    }
  },
  computed: {
    ...mapGetters({
      users: 'getUsers',
    }),
  },
  mounted() {
    this.$store.dispatch('loadUsers');
  },
  methods: {
    addUser() {
      this.$axios.$post('/api/user', {
        name: this.name,
        email: this.email,
      });
      this.$store.dispatch('loadUsers');
    },
  },
}
</script>
