<template>
  <v-navigation-drawer
    v-model="openDrawer"
    fixed
    temporary
    class="nav__menu-mobile"
    width="100%"
  >
    <v-list nav dense class="mt-4 space-y-4">
      <v-list-item class="nav__menu-mobile__item" link to="/wheels">
        Wheels
      </v-list-item>

      <v-list-group :value="false">
        <template #activator>
          <v-list-item-content class="nav__menu-mobile__item">
            <div
              class="
                font-medium
                justify-start
                text-sm
                tracking-widest
                uppercase
              "
            >
              Gallery
            </div>
          </v-list-item-content>
        </template>

        <v-list-item v-for="(item, i) in gallerys" :key="i" link :to="item.to">
          <v-list-item-title
            class="
              font-medium
              justify-start
              pl-4
              text-sm
              tracking-widest
              uppercase
            "
            :to="item.to"
            v-text="item.name"
          ></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item class="nav__menu-mobile__item" link to="/apparel">
        Apparel
      </v-list-item>
      <v-list-item class="nav__menu-mobile__item" link to="/blog">
        Blog
      </v-list-item>

      <v-list-group :value="false">
        <template #activator>
          <v-list-item-content class="nav__menu-mobile__item">
            <div
              class="
                font-medium
                justify-start
                text-sm
                tracking-widest
                uppercase
              "
            >
              About
            </div>
          </v-list-item-content>
        </template>

        <v-list-item v-for="(item, i) in abouts" :key="i" link :to="item.to">
          <v-list-item-title
            class="
              font-medium
              justify-start
              pl-4
              text-sm
              tracking-widest
              uppercase
            "
            :to="item.to"
            v-text="item.name"
          ></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item class="nav__menu-mobile__item" link to="/contact">
        Contact
      </v-list-item>

      <v-list-item
        class="nav__menu-mobile__item justify-center mt-8"
        link
        to="/dealer"
      >
        <v-btn outlined large>
          <v-icon class="mr-2">mdi-map-marker-outline</v-icon>
          Find Dealer
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    isDrawer: {
      type: Boolean,
      default: false,
    },
  },
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
    openDrawer() {
      return this.isDrawer
    },
  },
}
</script>
<style></style>
