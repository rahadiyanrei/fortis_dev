<template>
  <v-navigation-drawer
    v-model="openDrawer"
    absolute
    class="nav__menu-mobile"
    width="100%"
  >
    <v-list nav dense>
      <v-list-item class="nav__menu-mobile__item" link>Wheels</v-list-item>

      <v-list-item class="nav__menu-mobile__item" link>Gallery</v-list-item>

      <v-list-item class="nav__menu-mobile__item" link>Blog</v-list-item>

      <v-list-item class="nav__menu-mobile__item" link>Apparel</v-list-item>

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

        <v-list-item v-for="(item, i) in cruds" :key="i" link :to="item.to">
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
    cruds: [
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
    openDrawer() {
      return this.isDrawer
    },
  },
}
</script>
<style></style>
