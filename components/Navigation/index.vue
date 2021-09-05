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
