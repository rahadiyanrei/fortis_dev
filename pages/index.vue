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
                <v-img :src="item.image" height="100%" :aspect-ratio="16 / 9">
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
        <div class="home__wheel">
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
              <swiper-slide v-for="(items, idx) in wheels" :key="idx">
                <v-card class="wheel cursor-pointer" flat color="transparent">
                  <div class="wheel__head">
                    <v-img
                      :src="items.imageURL"
                      class="wheel__image"
                      contain
                    ></v-img>
                    <div class="wheel__color">
                      <div
                        v-for="(color, idx2) in items.variant.colors"
                        :key="idx2"
                        class="wheel__color-item"
                        :style="{ 'background-color': color.colorHEX }"
                      ></div>
                    </div>
                  </div>
                  <div class="wheel__body">
                    <v-card-title class="wheel__title">
                      {{ items.title }}
                    </v-card-title>
                    <v-card-subtitle class="wheel__subtitle">
                      {{ items.subtitle }}
                    </v-card-subtitle>
                    <v-card-text class="wheel__description">
                      <div
                        v-for="(size, idx3) in items.variant.size"
                        :key="idx3"
                      >
                        {{ size }}
                        <span
                          v-if="idx3 !== items.variant.size.length - 1"
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
            <v-btn dark large>View All Wheel</v-btn>
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
                <v-card class="gallery__overview-thumbnail cursor-pointer" flat>
                  <v-img :src="items.imageURL" :aspect-ratio="16 / 9">
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
                    flat
                  >
                    <v-img :src="item.imageURL" :aspect-ratio="16 / 9"></v-img>
                    <v-card-title>
                      <div class="break-normal">
                        {{ item.name }}
                      </div>
                    </v-card-title>
                    <v-card-subtitle>
                      <div class="break-normal">
                        {{ item.title }}
                      </div>
                    </v-card-subtitle>
                  </v-card>
                  <v-card class="gallery__overview-action" flat>
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
            <div class="home__blog-description mt-16">
              <p>
                Hendrerit vestibulum nulla nibh massa mollis feugiat maecenas
                integer. Mollis quis feugiat viverra sit. Tristique integer
                vulputate at orci sem ut. Scelerisque id scelerisque sed
                dignissim tortor adipiscing tempus.
              </p>
            </div>
            <div class="home__blog-body mt-20">
              <div
                v-for="(items, idx) in blogOverviews"
                :key="idx"
                class="blog__overview"
              >
                <v-card
                  class="blog__overview-thumbnail cursor-pointer"
                  flat
                  color="transparent"
                >
                  <!-- Tag  -->
                  <v-card-title class="blog__overview-tag left">
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
                  </v-card-title>
                  <!-- Tag  -->
                  <v-img :src="items.imageURL" :aspect-ratio="16 / 9"></v-img>
                  <v-card-subtitle class="blog__overview-subtitle">
                    {{ items.subtitle }}
                  </v-card-subtitle>
                  <v-card-title class="blog__overview-title">
                    {{ items.title }}
                  </v-card-title>
                  <v-card-text class="blog__overview-description">
                    <p>
                      {{ items.description }}
                    </p>
                  </v-card-text>
                </v-card>
              </div>
            </div>
            <div class="home__blog-action mt-16">
              <v-btn outlined large>Explore Our Blog</v-btn>
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
                >
                  <v-img :src="items.imageURL" :aspect-ratio="3 / 1">
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
  async asyncData({ $axios, $config }) {
    console.log($config)
    const banners = await $axios
      .$get(
        `http://devpako-backend.herokuapp.com
/api/banner`
      )
      .then((res) => res.data)
    console.log(banners)

    return { banners }
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
    // banners: [
    //   {
    //     title: `Performance. Strength. Style`,
    //     subtitle: `Especially made for the strongest who wants to combine performance with style.`,
    //     imageURL: '/images/banner/banner-1.png',
    //   },
    //   {
    //     title: `Fortis Falcon`,
    //     subtitle: `Especially made for the strongest who wants to combine performance with style.`,
    //     imageURL: '/images/banner/banner-2.png',
    //   },
    //   {
    //     title: `Charge with no limit.`,
    //     subtitle: `Especially made for the strongest who wants to combine performance with style.`,
    //     imageURL: '/images/banner/banner-3.png',
    //   },
    // ],
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
        imageURL: '/images/wheels/wheel-1.png',
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
        imageURL: '/images/wheels/wheel-2.png',
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
        imageURL: '/images/wheels/wheel-3.png',
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
        imageURL: '/images/wheels/wheel-1.png',
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
        imageURL: '/images/wheels/wheel-2.png',
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
        imageURL: '/images/wheels/wheel-3.png',
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
        imageURL: '/images/wheels/wheel-1.png',
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
        imageURL: '/images/wheels/wheel-2.png',
      },
    ],
    galleryOverviews: [
      {
        placement: 'left',
        title: 'Vehicle Galleries',
        imageURL: '/images/gallery/overview/vehicle.png',
        list: [
          {
            name: 'Mobil #1',
            title: 'Nama Velg | Brand Velg',
            imageURL: '/images/gallery/vehicle-1.png',
          },

          {
            name: 'Mobil #2',
            title: 'Nama Velg | Brand Velg',
            imageURL: '/images/gallery/vehicle-2.png',
          },

          {
            name: 'Mobil #3',
            title: 'Nama Velg | Brand Velg',
            imageURL: '/images/gallery/vehicle-1.png',
          },

          {
            name: 'Mobil #4',
            title: 'Nama Velg | Brand Velg',
            imageURL: '/images/gallery/vehicle-2.png',
          },

          {
            name: 'Mobil #5',
            title: 'Nama Velg | Brand Velg',
            imageURL: '/images/gallery/vehicle-1.png',
          },
        ],
      },
      {
        placement: 'right',
        title: 'Wheels Galleries',
        imageURL: '/images/gallery/overview/wheel.png',
        list: [
          {
            name: 'Velg #1',
            title: 'Nama Velg | Brand Velg',
            imageURL: '/images/gallery/wheel-1.png',
          },

          {
            name: 'Velg #2',
            title: 'Nama Velg | Brand Velg',
            imageURL: '/images/gallery/wheel-2.png',
          },

          {
            name: 'Velg #3',
            title: 'Nama Velg | Brand Velg',
            imageURL: '/images/gallery/wheel-1.png',
          },

          {
            name: 'Velg #4',
            title: 'Nama Velg | Brand Velg',
            imageURL: '/images/gallery/wheel-2.png',
          },

          {
            name: 'Velg #5',
            title: 'Nama Velg | Brand Velg',
            imageURL: '/images/gallery/wheel-1.png',
          },
        ],
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
        imageURL: '/images/blog/overview/blog-1.png',
      },
      {
        placement: 'right',
        tag: 'Tips & Trick',
        subtitle: 'All New Suzuki Jimney / 23 AUG 2021',
        title: 'Sit viverra donec sapien ut vel. commo...',
        description:
          'Pellentesque sem bibendum egestas suspendisse enim mi mauris ullamcorper. Risus placerat tellus nunc ante dictum eget hac sed.',
        imageURL: '/images/blog/overview/blog-2.png',
      },
    ],
    aboutOverviews: [
      {
        title: 'Testing Facilities',
        description: `Fasilitas pengujian kami mampu untuk menguji durability produk, material, korosi, dan ketahanan cat. Alat pengujian kami tersertifikasi oleh ISOTSxxxxx, xxxx, xxxx untuk memberikan hasil yang akurat. Pengujian dan hasil uji telah terakreditasi baik di dalam maupun luar negeri. Fasilitas uji kami telah diakui oleh beberapa brand otomotif seperti Toyota, Daihatsu, Honda, dll.`,
        imageURL: '/images/about/testing-facilities.png',
      },
      {
        title: 'Die Shop',
        description: `Pako Dieshop memiliki kemampuan untuk memproduksi komponen khusus yang terbuat dari berbagai bahan untuk mould casting, dies stamping, dll. Teknisi kami yang berdedikasi, mengasah keterampilan mereka menggunakan teknologi terbaru, bersama-sama membuat komponen terbaik. Fasilitas kami sepenuhnya mendukung semua kebutuhan pelanggan.`,
        imageURL: '/images/about/die-shop.png',
      },
      {
        title: 'P-Pro',
        description: `Kami memiliki keahlian dalam mengkonsep sebuah proyek desain hingga terwujud dalam styling concept design yang terintegrasi dengan bidang engineering design untuk diaplikasikan ke dalam manufaktur.`,
        imageURL: '/images/about/p-pro.png',
      },
    ],
  }),
  mounted() {
    console.log(process.env)
  },
  methods: {
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
