<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" :fixed="fixed" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="text--text" v-text="title" />
      <HeaderLogin class="my-auto ml-auto" />
    </v-app-bar>
    <v-main>
      <v-container v-if="error">
        <h3>We're sorry, something went wrong...</h3>
      </v-container>
      <v-container v-else>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      clipped: false,
      fixed: true,
      error: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-magnify',
          title: 'Browse',
          to: '/browse',
        },
        {
          icon: 'mdi-briefcase',
          title: 'My Discs',
          to: '/discs',
        },
        {
          icon: 'mdi-cart',
          title: 'Stores',
          to: '/stores',
        },
        {
          icon: 'mdi-account',
          title: 'Account',
          to: '/account',
        },
      ],
      right: true,
      title: 'DiscCatalog',
    };
  },
  watch: {
    '$route'() {
      this.error = false;
    }
  },
  errorCaptured(err) {
    this.error = true;
    if (err.message.includes('401')) {
      this.$auth.logout();
    }
  }
};
</script>

<style scoped>
header button span.v-btn__content i.v-icon {
  color: var(--v-text-base);
}
</style>
