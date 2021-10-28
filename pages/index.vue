<template>
  <section class="main__section">
    <div class="home">
      <div class="home__wrapper">
        <div class="home__banner">
          <v-carousel
            v-model="model"
            class="carousel__banner"
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            height="100%"
          >
            <v-carousel-item v-for="(item, idx) in banners" :key="idx">
              <v-card
                class="banner cursor-pointer"
                flat
                color="transparent"
                height="100%"
              >
                <v-img :src="item.image" height="100%" :aspect-ratio="9 / 3">
                  <div
                    class="
                      flex flex-column
                      items-center
                      justify-center
                      h-full
                      text-center
                      space-y-4
                    "
                  >
                    <v-card-title v-if="item.title" class="banner__title">
                      <div
                        class="
                          w-full
                          lg:w-2/3
                          text-2xl
                          md:text-6xl
                          text-white
                          font-bold
                          tracking-widest
                          break-normal
                        "
                      >
                        {{ item.title }}
                      </div>
                    </v-card-title>
                    <v-card-subtitle v-if="item.body" class="banner__subtitle">
                      <div
                        class="
                          w-2/3
                          m-auto
                          text-xs
                          md:text-lg
                          text-white
                          tracking-widest
                          break-normal
                        "
                      >
                        {{ item.body }}
                      </div>
                    </v-card-subtitle>
                  </div>
                </v-img>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="home__product">
          <div class="main__container relative">
            <div class="flex justify-between items-center">
              <div class="main-title border-accent content-end">
                New
                <span class="font-bold">Arrival</span>
              </div>

              <div class="carousel__wheel-navigation">
                <v-btn
                  class="carousel__wheel-navigation__button"
                  outlined
                  small
                  @click="handleSwiperWheel('prev')"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  class="carousel__wheel-navigation__button"
                  outlined
                  small
                  @click="handleSwiperWheel('next')"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <div class="carousel__wheel lg:mt-20">
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide v-for="(items, idx) in newArrival" :key="idx">
                <v-card
                  class="wheel cursor-pointer"
                  flat
                  color="transparent"
                  :to="`/wheels/${items.uuid}`"
                >
                  <div class="wheel__head">
                    <v-img
                      :src="items.image"
                      class="wheel__image"
                      contain
                    ></v-img>
                    <div class="wheel__color">
                      <div
                        v-for="(color, idx2) in items.colors"
                        :key="idx2"
                        class="wheel__color-item"
                        :style="{ 'background-color': color.color_hex }"
                      ></div>
                    </div>
                  </div>
                  <div class="wheel__body">
                    <v-card-title class="wheel__title">
                      {{ items.brand }}
                    </v-card-title>
                    <v-card-subtitle class="wheel__subtitle">
                      {{ items.name }}
                    </v-card-subtitle>
                    <v-card-text class="wheel__description">
                      <div v-for="(size, idx3) in items.size" :key="idx3">
                        {{ size.diamter }}
                        <span
                          v-if="idx3 !== items.size.length - 1"
                          class="pr-1"
                        >
                          |
                        </span>
                      </div>
                    </v-card-text>
                  </div>
                </v-card>
              </swiper-slide>
            </swiper>
          </div>
          <div class="home__wheel-action mt-16">
            <v-btn dark large to="/wheels">View All Wheel</v-btn>
          </div>
        </div>
        <div class="home__gallery">
          <div class="main__container">
            <div class="main-title border-accent m-auto">
              Our
              <span class="font-bold">Gallery</span>
            </div>
            <div class="home__gallery-body mt-12 lg:mt-20">
              <div
                v-for="(items, idx) in galleryOverviews"
                :key="idx"
                class="gallery__overview"
              >
                <v-card
                  class="gallery__overview-thumbnail cursor-pointer"
                  flat
                  :to="`/gallery/${items.thumbnail.uuid}`"
                >
                  <v-img
                    :src="items.thumbnail.image_thumbnail"
                    :aspect-ratio="16 / 9"
                  >
                    <v-card-title
                      class="gallery__overview-tag"
                      :class="[
                        items.placement === 'right' ? 'ml-auto' : 'mr-auto',
                      ]"
                    >
                      <div
                        class="break-normal"
                        :class="[
                          items.placement === 'right'
                            ? 'text-right'
                            : 'text-left',
                        ]"
                      >
                        {{ items.title }}
                      </div>
                    </v-card-title>
                  </v-img>
                </v-card>
                <div class="gallery__overview-list">
                  <v-card
                    v-for="(item, idx2) in items.list"
                    :key="idx2"
                    class="gallery__overview-item cursor-pointer"
                    :to="`/gallery/${item.uuid}`"
                    flat
                  >
                    <v-img
                      :src="item.image_thumbnail"
                      :aspect-ratio="16 / 9"
                    ></v-img>
                    <v-card-title>
                      <div class="break-normal">
                        {{
                          item.vehicle_brand
                            ? item.vehicle_brand.name
                            : item.wheel.name
                        }}
                      </div>
                    </v-card-title>
                    <v-card-subtitle>
                      <div class="break-normal">
                        {{ item.title }}
                      </div>
                    </v-card-subtitle>
                  </v-card>
                  <v-card
                    class="gallery__overview-action"
                    flat
                    :to="
                      items.title === 'Vehicle Galleries'
                        ? '/gallery/vehicle'
                        : '/gallery/wheel'
                    "
                  >
                    <div class="gallery__overview-action__wrapper">
                      <v-card-title>
                        View The Full
                        <span>
                          {{ items.title }}
                        </span>
                      </v-card-title>
                    </div>
                  </v-card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="home__blog">
          <div class="main__container">
            <div class="main-title border-accent m-auto">
              Latest
              <span class="font-bold">Update</span>
            </div>
            <div class="home__blog-body mt-20">
              <div
                v-for="(items, idx) in blogOverviews"
                :key="idx"
                class="blog__overview"
              >
                <v-card
                  class="blog__overview-thumbnail flex-col cursor-pointer"
                  flat
                  color="transparent"
                  :to="`/blog/${items.slug}`"
                >
                  <!-- Tag  -->
                  <!-- <v-card-title class="blog__overview-tag left">
                    <div
                      class="break-normal whitespace-nowrap"
                      :class="[
                        items.placement === 'right'
                          ? 'text-right'
                          : 'text-left',
                      ]"
                    >
                      {{ items.tag }}
                    </div>
                  </v-card-title> -->
                  <!-- Tag  -->
                  <v-img :src="items.image" :aspect-ratio="16 / 9"></v-img>
                  <v-card-subtitle class="blog__overview-subtitle">
                    {{ items.created_at | datetimeToDatetime }} /
                    {{ items.created_by.fullname }}
                  </v-card-subtitle>
                  <v-card-title class="blog__overview-title">
                    {{ items.title }}
                  </v-card-title>
                  <v-card-text
                    class="blog__overview-description"
                    v-html="$options.filters.textElipsis(items.content)"
                  ></v-card-text>
                </v-card>
              </div>
            </div>
            <div class="home__blog-action mt-16">
              <v-btn outlined large to="/blog">Explore Our Blog</v-btn>
            </div>
          </div>
        </div>
        <div class="home__about">
          <div class="main__container relative z-10">
            <div class="home__about-body mt-20">
              <div
                v-for="(items, idx) in aboutOverviews"
                :key="idx"
                class="about__overview"
              >
                <v-card
                  class="about__overview-thumbnail cursor-pointer"
                  flat
                  color="transparent"
                  :to="items.to"
                >
                  <v-img
                    :src="getImageURL(items.imageURL)"
                    :aspect-ratio="3 / 1"
                  >
                    <div class="about__overview-body">
                      <v-card-title class="about__overview-title">
                        <div class="border-accent tracking-widest">
                          {{ items.title }}
                        </div>
                      </v-card-title>
                      <v-card-text class="about__overview-description">
                        <p class="tracking-wider">
                          {{ items.description }}
                        </p>
                      </v-card-text>
                    </div>
                  </v-img>
                </v-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ $axios, $config: { baseURL } }) {
    const banners = await $axios
      .$get(`${baseURL}/api/banner`)
      .then((res) => res.data)

    let galleryOverviews = await $axios
      .$get(`${baseURL}/api/gallery/dashboard`)
      .then((res) => res.data)

    const blogOverviews = await $axios
      .$get(`${baseURL}/api/blog/dashboard`)
      .then((res) => res.data)

    galleryOverviews = [
      {
        placement: 'left',
        title: 'Vehicle Galleries',
        thumbnail: galleryOverviews.single_vehicle,
        list: [...galleryOverviews.multiple_vehicle],
      },
      {
        placement: 'right',
        title: 'Wheels Galleries',
        thumbnail: galleryOverviews.single_wheel,
        list: [...galleryOverviews.multiple_wheel],
      },
    ]

    const newArrival = await $axios
      .$get(`${baseURL}/api/wheel/new_arrival`, {
        params: { limit: 10, offset: 0 },
      })
      .then((res) => res.data)

    return { banners, newArrival, galleryOverviews, blogOverviews }
  },
  data: () => ({
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
    swiperOptions: {
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4.5,
          spaceBetween: 50,
        },
        1920: {
          slidesPerView: 5.5,
          spaceBetween: 50,
        },
      },
    },
    wheels: [
      {
        title: 'Fortis Radix',
        subtitle: 'Fortis Wheel',
        variant: {
          colors: [
            { name: 'gold', colorHEX: '#CC7E36' },
            { name: 'silver', colorHEX: '#DDDDDD' },
          ],
          size: ['19”', '21”', '23”'],
        },
        imageURL: '/wheels/wheel-1.png',
      },
      {
        title: 'Fortis Radix #2',
        subtitle: 'Fortis Wheel',
        variant: {
          colors: [
            { name: 'gold', colorHEX: '#CC7E36' },
            { name: 'silver', colorHEX: '#DDDDDD' },
          ],
          size: ['19”', '21”', '23”'],
        },
        imageURL: '/wheels/wheel-2.png',
      },
      {
        title: 'Fortis Radix #3',
        subtitle: 'Fortis Wheel',
        variant: {
          colors: [
            { name: 'gold', colorHEX: '#CC7E36' },
            { name: 'silver', colorHEX: '#DDDDDD' },
          ],
          size: ['19”', '21”', '23”'],
        },
        imageURL: '/wheels/wheel-3.png',
      },
      {
        title: 'Fortis Radix #4',
        subtitle: 'Fortis Wheel',
        variant: {
          colors: [
            { name: 'gold', colorHEX: '#CC7E36' },
            { name: 'silver', colorHEX: '#DDDDDD' },
          ],
          size: ['19”', '21”', '23”'],
        },
        imageURL: '/wheels/wheel-1.png',
      },
      {
        title: 'Fortis Radix #5',
        subtitle: 'Fortis Wheel',
        variant: {
          colors: [
            { name: 'gold', colorHEX: '#CC7E36' },
            { name: 'silver', colorHEX: '#DDDDDD' },
          ],
          size: ['19”', '21”', '23”'],
        },
        imageURL: '/wheels/wheel-2.png',
      },
      {
        title: 'Fortis Radix #6',
        subtitle: 'Fortis Wheel',
        variant: {
          colors: [
            { name: 'gold', colorHEX: '#CC7E36' },
            { name: 'silver', colorHEX: '#DDDDDD' },
          ],
          size: ['19”', '21”', '23”'],
        },
        imageURL: '/wheels/wheel-3.png',
      },
      {
        title: 'Fortis Radix #7',
        subtitle: 'Fortis Wheel',
        variant: {
          colors: [
            { name: 'gold', colorHEX: '#CC7E36' },
            { name: 'silver', colorHEX: '#DDDDDD' },
          ],
          size: ['19”', '21”', '23”'],
        },
        imageURL: '/wheels/wheel-1.png',
      },
      {
        title: 'Fortis Radix #8',
        subtitle: 'Fortis Wheel',
        variant: {
          colors: [
            { name: 'gold', colorHEX: '#CC7E36' },
            { name: 'silver', colorHEX: '#DDDDDD' },
          ],
          size: ['19”', '21”', '23”'],
        },
        imageURL: '/wheels/wheel-2.png',
      },
    ],
    blogOverviews: [
      {
        placement: 'left',
        tag: 'News',
        subtitle: 'All New Suzuki Jimney / 23 AUG 2021',
        title: 'Sit viverra donec sapien ut vel. commo...',
        description:
          'Pellentesque sem bibendum egestas suspendisse enim mi mauris ullamcorper. Risus placerat tellus nunc ante dictum eget hac sed.',
        imageURL: '/blog/overview/blog-1.png',
      },
      {
        placement: 'right',
        tag: 'Tips & Trick',
        subtitle: 'All New Suzuki Jimney / 23 AUG 2021',
        title: 'Sit viverra donec sapien ut vel. commo...',
        description:
          'Pellentesque sem bibendum egestas suspendisse enim mi mauris ullamcorper. Risus placerat tellus nunc ante dictum eget hac sed.',
        imageURL: '/blog/overview/blog-2.png',
      },
    ],
    aboutOverviews: [
      {
        title: 'Testing Facilities',
        to: '/about/testing-facilities',
        description: `Fasilitas pengujian kami mampu untuk menguji durability produk, material, korosi, dan ketahanan cat. Alat pengujian kami tersertifikasi oleh ISOTSxxxxx, xxxx, xxxx untuk memberikan hasil yang akurat. Pengujian dan hasil uji telah terakreditasi baik di dalam maupun luar negeri. Fasilitas uji kami telah diakui oleh beberapa brand otomotif seperti Toyota, Daihatsu, Honda, dll.`,
        imageURL: '/about/testing-facilities/banner.png',
      },
      {
        title: 'Die Shop',
        to: '/about/dieshop',
        description: `Pako Dieshop memiliki kemampuan untuk memproduksi komponen khusus yang terbuat dari berbagai bahan untuk mould casting, dies stamping, dll. Teknisi kami yang berdedikasi, mengasah keterampilan mereka menggunakan teknologi terbaru, bersama-sama membuat komponen terbaik. Fasilitas kami sepenuhnya mendukung semua kebutuhan pelanggan.`,
        imageURL: '/about/die-shop/banner.png',
      },
      {
        title: 'P-Pro',
        to: '/about/p-pro',
        description: `Kami memiliki keahlian dalam mengkonsep sebuah proyek desain hingga terwujud dalam styling concept design yang terintegrasi dengan bidang engineering design untuk diaplikasikan ke dalam manufaktur.`,
        imageURL: '/about/p-pro/banner.png',
      },
    ],
  }),
  computed: {},
  mounted() {},
  methods: {
    getImageURL(filename) {
      const data =
        this.$config.imageURL + this.$config.imagePATH + '/images' + filename
      return data
    },
    handleSwiperWheel(navigation) {
      if (navigation === 'next') {
        this.$refs.mySwiper.$swiper.slideNext()
      } else if (navigation === 'prev') {
        this.$refs.mySwiper.$swiper.slidePrev()
      }
    },
  },
}
</script>
