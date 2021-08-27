<template>
  <v-app-bar app flat elevate-on-scroll class="nav" color="white">
    <div class="nav__menu-left desktop">
      <v-btn text elevation="false">Wheels</v-btn>
      <v-btn text elevation="false">Gallery</v-btn>
      <v-btn text elevation="false">Blog</v-btn>
    </div>

    <v-spacer class="desktop" />

    <div class="nav__logo">
      <nuxt-link to="/">
        <v-img :src="logo"></v-img>
      </nuxt-link>
    </div>

    <v-spacer />

    <div class="nav__menu-right desktop">
      <v-btn text elevation="false">Apparel</v-btn>
      <v-btn text elevation="false">About</v-btn>
      <v-btn text elevation="false">Contact</v-btn>
    </div>
    <div class="tablet">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </div>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- -->
  </v-app-bar>
</template>
<script>
export default {
  asyncData({ env }) {
    // const logo =
    //   (await env.IMAGE_URL) +
    //   `/hardcode-image-dont-delete/static/logo_fortis.svg`
    // return { logo }
  },
  data: () => ({
    drawer: false,
  }),
  computed: {
    logo() {
      const data =
        this.$config.imageURL + this.$config.imagePATH + '/logo_fortis.svg'
      return data
    },
  },
  mounted() {},
  methods: {},
}
</script>
<style></style>
