<template>
  <section class="main__section">
    <div class="gallery-detail">
      <div class="gallery-detail__banner">
        <v-img :src="getImageURL(bannerURL)" :aspect-ratio="3 / 1"></v-img>
      </div>
      <div class="main__container">
        <div class="gallery-detail__wrapper">
          <v-btn plain to="/gallery/vehicle" dark>
            <v-subheader class="gallery-detail__navigation">
              <v-icon class="mr-4">mdi-chevron-left</v-icon>
              Back to Gallery
            </v-subheader>
          </v-btn>
          <div class="gallery-detail__content">
            <div class="gallery-detail__head">
              <div class="gallery-detail__subtitle">
                {{
                  data.vehicle_brand
                    ? data.vehicle_brand.name
                    : `${data.wheel.brand} Wheel`
                }}
              </div>
              <div class="gallery-detail__title">{{ data.title }}</div>
            </div>
            <div class="gallery-detail__body">
              <div class="gallery-detail__list">
                <lingallery
                  ref="gallery"
                  :start-image="currentId"
                  :width="'100%'"
                  :height="'100%'"
                  accent-color="rgba(185, 28, 28)"
                  :mobile-height="340"
                  show-controls
                  :items="gallery"
                />
              </div>
              <v-card class="gallery-detail__card" flat>
                <v-list-item two-line>
                  <v-list-item-avatar
                    class="gallery-detail__card-image rounded-0"
                  >
                    <v-img :src="data.wheel.image"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="gallery-detail__card-body">
                    <v-card-title>
                      <div class="block">
                        <div
                          v-if="data.vehicle_brand"
                          class="break-normal text-lg uppercase text-red-700"
                        >
                          {{ data.vehicle_brand.name }}
                        </div>
                        <div class="break-normal">
                          {{ data.wheel.name }}
                        </div>
                      </div>
                    </v-card-title>
                    <v-card-subtitle>
                      <div class="flex break-normal uppercase">
                        {{ data.wheel.brand }}
                      </div>
                    </v-card-subtitle>
                    <v-card-text>
                      <div class="wheel__color">
                        <div
                          v-for="(color, idx2) in data.wheel.colors"
                          :key="idx2"
                          class="wheel__color-item"
                          :style="{ 'background-color': color.color_hex }"
                        ></div>
                      </div>
                    </v-card-text>
                    <v-card-actions class="md:gap-4">
                      <v-btn
                        dark
                        large
                        class="w-full md:w-1/4"
                        color="black"
                        :to="`/wheels/${data.wheel.uuid}`"
                      >
                        View Wheel Details
                      </v-btn>
                      <v-btn
                        outlined
                        text
                        large
                        class="w-full md:w-1/4"
                        to="/gallery/wheel"
                      >
                        Wheel Gallery
                      </v-btn>
                      <v-btn
                        outlined
                        text
                        large
                        class="w-full md:w-1/4"
                        to="/gallery/vehicle"
                      >
                        Vehicle Gallery
                      </v-btn>
                    </v-card-actions>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import _ from 'lodash'
export default {
  async asyncData({ $axios, $config: { baseURL }, route }) {
    const data = await $axios
      .$get(`${baseURL}/api/gallery/` + route.params.code)
      .then((res) => res.data)

    const filterGallery = _.map(data.img_gallery, (item) => {
      return {
        id: item.id,
        src: item.image,
        thumbnail: item.image,
      }
    })

    const gallery = [
      {
        id: 0,
        src: data.image_thumbnail,
        thumbnail: data.image_thumbnail,
      },
      ...filterGallery,
    ]

    console.log(gallery)

    return { data, gallery }
  },
  data: () => ({
    bannerURL: '/gallery__banner.png',
  }),
  methods: {
    getImageURL(filename) {
      const data =
        this.$config.imageURL + this.$config.imagePATH + '/images' + filename
      return data
    },
  },
}
</script>
<style></style>
