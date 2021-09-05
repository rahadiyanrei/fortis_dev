<template>
  <v-app class="viewport">
    <NavigationDrawer :is-drawer="drawer" />
    <Navigation @drawer="handleDrawer" />
    <!-- Sizes your content based upon application components -->
    <v-main class="main">
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="main__wrapper">
        <div class="main__body">
          <!-- If using vue-router -->
          <Nuxt />
        </div>
      </v-container>
      <Footer />
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    handleDrawer() {
      this.drawer = !this.drawer
      console.log(this.drawer)
    },
  },
}
</script>
