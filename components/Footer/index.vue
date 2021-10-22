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
            <v-img :src="getImageURL(item.logoURL)" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer__navigation">
      <div class="main__container">
        <div class="footer__navigation-logo">
          <v-img
            src="https://ik.imagekit.io/fjxmsbwas7n/hardcode-image-dont-delete/static/logo_fortis.png"
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
          <template v-for="item in socmed">
            <div v-if="item.status" :key="item" class="footer__socmed-item">
              <v-btn :href="item.link" large icon target="_blank">
                <v-icon color="black">{{ item.icon }}</v-icon>
              </v-btn>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // async asyncData({ $axios, $config: { baseURL } }) {
  //   let socmed = await $axios
  //     .$get(`${baseURL}/api/social_media`)
  //     .then((res) => res.data)

  //   socmed = [
  //     {
  //       icon: 'mdi-facebook',
  //       link: socmed.facebook,
  //     },
  //     {
  //       icon: 'mdi-youtube',
  //       link: socmed.youtube,
  //     },
  //     {
  //       icon: 'mdi-twitter',
  //       link: socmed.twitter,
  //     },
  //     {
  //       icon: 'mdi-linkedin',
  //       link: socmed.linkedin,
  //     },
  //     {
  //       icon: 'mdi-instagram',
  //       link: socmed.instagram,
  //     },
  //   ]

  //   return { socmed }
  // },
  data: () => ({
    brands: [
      {
        logoURL: '/brand/Fortis-Wheels-Logo.svg',
      },

      {
        logoURL: '/brand/Avantech-Wheels-Logo.svg',
      },

      {
        logoURL: '/brand/PAKO-Logo.svg',
      },

      {
        logoURL: '/brand/Inko-Logo.svg',
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
    socmed: [],
  }),
  async mounted() {
    await this.getData()
  },
  methods: {
    getImageURL(filename) {
      const data =
        this.$config.imageURL + this.$config.imagePATH + '/images' + filename
      return data
    },
    async getData() {
      console.log('get Data')
      this.data = []
      try {
        const responseBody = await this.$axios
          .$get(`${this.$config.baseURL}/api/social_media`)
          .then((res) => res.data)

        this.socmed = [
          {
            icon: 'mdi-facebook',
            link: responseBody.facebook,
            status:
              responseBody.facebook !== null ? responseBody.facebook : false,
          },
          {
            icon: 'mdi-youtube',
            link: responseBody.youtube,
            status:
              responseBody.youtube !== null ? responseBody.youtube : false,
          },
          {
            icon: 'mdi-twitter',
            link: responseBody.twitter,
            status:
              responseBody.twitter !== null ? responseBody.twitter : false,
          },
          {
            icon: 'mdi-linkedin',
            link: responseBody.linkedin,
            status:
              responseBody.linkedin !== null ? responseBody.linkedin : false,
          },
          {
            icon: 'mdi-instagram',
            link: responseBody.instagram,
            status:
              responseBody.instagram !== null ? responseBody.instagram : false,
          },
        ]

        // if (this.GENERATOR.DATATABLE.FILTERS) {
        //   this.GENERATOR.DATATABLE.FILTERS.forEach((filter, index) => {
        //     if (filter.valueType === "number" && this.query[filter.model]) {
        //       this.query[filter.model] = Number(this.query[filter.model]);
        //     }
        //   });
        // }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style></style>
