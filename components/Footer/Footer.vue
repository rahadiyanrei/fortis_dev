<template>
  <div class="footer">
    <div class="footer__brand">
      <div class="main__container h-full">
        <div class="footer__brand-list">
          <div
            v-for="(item, idx) in brands"
            :key="idx"
            class="footer__brand-item"
          >
            <v-img :src="item.logoURL" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer__navigation">
      <div class="main__container">
        <div class="footer__navigation-logo">
          <v-img
            src="./logo_fortis.svg"
            width="180"
            height="48"
            contain
          ></v-img>
        </div>
        <div class="footer__navigation-list">
          <div
            v-for="(item, idx2) in navigation"
            :key="idx2"
            class="footer__navigation-item"
          >
            <div class="footer__navigation-title">
              {{ item.name }}
            </div>
            <div class="footer__navigation-menu">
              <v-btn
                v-for="(itemChild, idx3) in item.menu"
                :key="idx3"
                class="footer__navigation-menu__item"
                width="min-content"
                left
                text
                depressed
                small
              >
                {{ itemChild.name }}
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:border-t border-gray-100">
      <div class="footer__bottom main__container">
        <div class="footer__copyright">
          ©2021 PAKO Group. Design by Alteridea.
        </div>
        <div class="footer__socmed">
          <div
            v-for="(item, idx4) in socmed"
            :key="idx4"
            class="footer__socmed-item"
          >
            <v-icon color="black">{{ item.icon }}</v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    brands: [
      {
        logoURL: require('@/assets/images/brand/Fortis-Wheels-Logo.svg'),
      },

      {
        logoURL: require('@/assets/images/brand/Avantech-Wheels-Logo.svg'),
      },

      {
        logoURL: require('@/assets/images/brand/PAKO-Logo.svg'),
      },

      {
        logoURL: require('@/assets/images/brand/PAKO-Logo.svg'),
      },
    ],
    navigation: [
      {
        name: 'Wheels',
        menu: [
          {
            name: 'Pako',
          },
          {
            name: 'Inko',
          },
          {
            name: 'Fortis',
          },
          {
            name: 'Avantech',
          },
        ],
      },
      {
        name: 'Gallery',
        menu: [
          {
            name: 'Wheel',
          },
          {
            name: 'Vehicle',
          },
        ],
      },
      {
        name: 'Blog',
        menu: [
          {
            name: 'Recent',
          },
          {
            name: 'Event',
          },
          {
            name: 'Dealer Spotlight',
          },
          {
            name: 'Owner Spotlight',
          },
        ],
      },
      {
        name: 'Apparel',
        menu: [
          {
            name: 'Hoodie',
          },
          {
            name: 'Hat',
          },
          {
            name: 'T-Shirt',
          },
          {
            name: 'Polo Shirt',
          },
        ],
      },
      {
        name: 'About',
        menu: [
          {
            name: 'Pako 2W',
          },
          {
            name: 'Pako 4W',
          },
          {
            name: 'Inko',
          },
          {
            name: 'Dieshop',
          },
          {
            name: 'P-Pro',
          },
          {
            name: 'Testing Facilities',
          },
        ],
      },
      {
        name: 'Contact',
        menu: [
          {
            name: 'Contact Us',
          },
          {
            name: 'Find Dealer',
          },
        ],
      },
    ],
    socmed: [
      {
        icon: 'mdi-facebook',
        link: '#',
      },
      {
        icon: 'mdi-youtube',
        link: '#',
      },
      {
        icon: 'mdi-twitter',
        link: '#',
      },
      {
        icon: 'mdi-linkedin',
        link: '#',
      },
      {
        icon: 'mdi-instagram',
        link: '#',
      },
    ],
  }),
}
</script>
<style></style>
