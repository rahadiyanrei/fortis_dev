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
            src="https://ik.imagekit.io/fjxmsbwas7n/hardcode-image-dont-delete/static/logo_pako.png"
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
                :to="itemChild.to"
                class="footer__navigation-menu__item"
                width="min-content"
                left
                text
                depressed
                small
                active-class="no-active"
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
            to: '/wheels?orderBy=created_at&orderType=desc&brand=pako&limit=12&offset=0&newRelease=0',
          },
          {
            name: 'Inko',
            to: '/wheels?orderBy=created_at&orderType=desc&brand=inko&limit=12&offset=0&newRelease=0',
          },
          {
            name: 'Fortis',
            to: '/wheels?orderBy=created_at&orderType=desc&brand=fortis&limit=12&offset=0&newRelease=0',
          },
          {
            name: 'Avantech',
            to: '/wheels?orderBy=created_at&orderType=desc&brand=avantech&limit=12&offset=0&newRelease=0',
          },
        ],
      },
      {
        name: 'Gallery',
        menu: [
          {
            name: 'Wheel',
            to: '/gallery/wheel?limit=12&offset=0&type=wheel&vehicle_brand_id=0&wheel_id=0',
          },
          {
            name: 'Vehicle',
            to: '/gallery/vehicle?limit=12&offset=0&type=car&vehicle_brand_id=0&wheel_id=0',
          },
        ],
      },
      {
        name: 'Blog',
        menu: [
          {
            name: 'Latest Update',
            to: '/blog',
          },
        ],
      },
      {
        name: 'Apparel',
        menu: [
          {
            name: 'Shirt',
            to: '/apparel?orderBy=created_at&orderType=desc&apparel_category_id=1&limit=12&offset=0',
          },
          {
            name: 'Headwear',
            to: '/apparel?orderBy=created_at&orderType=desc&apparel_category_id=2&limit=12&offset=0',
          },
          {
            name: 'Accessories',
            to: '/apparel?orderBy=created_at&orderType=desc&apparel_category_id=3&limit=12&offset=0',
          },
        ],
      },
      {
        name: 'About',
        menu: [
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
      },
      {
        name: 'Contact',
        menu: [
          {
            name: 'Contact',
            to: '/contact',
          },
          {
            name: 'Find Dealer',
            to: '/dealer',
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
