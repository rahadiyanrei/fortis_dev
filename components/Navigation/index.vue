<template>
  <v-app-bar app flat elevate-on-scroll class="nav" color="white">
    <div class="nav__menu-left desktop">
      <v-btn text elevation="false" to="/wheels">Wheels</v-btn>
      <v-menu offset-y rounded>
        <template #activator="{ on, attrs }">
          <v-btn text elevation="false" v-bind="attrs" v-on="on">Gallery</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in gallerys" :key="index">
            <v-btn text elevation="false" :to="item.to">
              {{ item.name }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text elevation="false" to="/apparel">Apparel</v-btn>
    </div>

    <v-spacer class="desktop" />

    <div class="nav__logo">
      <nuxt-link to="/">
        <v-img :src="logo" width="150"></v-img>
      </nuxt-link>
    </div>

    <v-spacer />

    <div class="nav__menu-right desktop">
      <v-btn text elevation="false" to="/blog">Blog</v-btn>
      <v-menu offset-y rounded>
        <template #activator="{ on, attrs }">
          <v-btn text elevation="false" v-bind="attrs" v-on="on">About</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in abouts" :key="index">
            <v-btn text elevation="false" :to="item.to">{{ item.name }}</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text elevation="false" to="/contact">Contact</v-btn>
      <v-btn icon to="/dealer">
        <v-icon>mdi-map-marker-outline</v-icon>
      </v-btn>
    </div>
    <div class="tablet">
      <v-app-bar-nav-icon
        @click.stop="
          (event) => {
            $emit('drawer', event)
          }
        "
      ></v-app-bar-nav-icon>
    </div>

    <!-- -->
  </v-app-bar>
</template>
<script>
export default {
  data: () => ({
    abouts: [
      {
        name: 'Company',
        to: '/about/company',
      },
      {
        name: 'Testing Facilities',
        to: '/about/testing-facilities',
      },
      {
        name: 'Dieshop',
        to: '/about/dieshop',
      },
      {
        name: 'P-Pro',
        to: '/about/p-pro',
      },
    ],
    gallerys: [
      {
        name: 'Vehicle',
        to: '/gallery/vehicle',
      },
      {
        name: 'Wheel',
        to: '/gallery/wheel',
      },
    ],
  }),
  computed: {
    logo() {
      const data =
        this.$config.imageURL + this.$config.imagePATH + '/logo_pako.png'
      return data
    },
  },
  mounted() {},
  methods: {
    goToTop() {
      return window.scrollTo(0, 0)
    },
  },
}
</script>
<style></style>
