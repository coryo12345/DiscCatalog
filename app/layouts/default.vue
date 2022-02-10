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
      <v-container>
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
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-cart',
          title: 'Stores',
          to: '/stores',
        },
        {
          icon: 'mdi-briefcase',
          title: 'My Discs',
          to: '/discs',
        },
        {
          icon: 'mdi-account',
          title: 'Account',
          to: '/account',
        },
      ],
      right: true,
      title: 'DiscCatalog',
    }
  },
}
</script>

<style scoped>
header button span.v-btn__content i.v-icon {
  color: var(--v-text-base);
}
</style>
