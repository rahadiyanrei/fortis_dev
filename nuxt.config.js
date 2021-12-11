import webpack from 'webpack'
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Pako Wheels',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Pako wheels diproduksi di Indonesia oleh PT. Pakoakuina & PT. Inkoasku dengan sub brand PAKO Wheels, FORTIS Wheels, Avantech, dan INKO. Mempunya selogan produk lokal dikenal dunia',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '@/plugins/vue-youtube', mode: 'client' },
    { src: '@/plugins/lingallery', mode: 'client' },
    { src: '@/plugins/utils/filters/common.filter.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/vuetify',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/dotenv',
      {
        filename: `.env.${process.env.NODE_ENV}`,
        systemvars: true,
      },
    ],
    [
      'nuxt-gmaps',
      {
        key: 'AIzaSyAJcUqLaW2fubNen_w5WQaHuriNcWABo6E',
      },
    ],
  ],
  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL,
    sendEmailURL: process.env.SEND_EMAIL_URL,
    numberSendWhatsapp: process.env.NUMBER_SEND_WHATSAPP,
    proxyHeaders: false,
    credentials: false,
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    numberSendWhatsapp: process.env.NUMBER_SEND_WHATSAPP,
    imageURL: process.env.IMAGE_URL,
    imagePATH: process.env.IMAGE_PATH,
  },

  vuetify: {
    customVariables: ['~/assets/scss/variables/variables.scss'],
    treeShake: true,
    defaultAssets: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash',
      }),
    ],
  },
}
