<template>
  <section class="main__section">
    <div class="product-detail">
      <div class="main__container">
        <div class="product-detail__wrapper">
          <div class="product-detail__preview">
            <v-btn plain to="/wheels">
              <v-subheader class="product-detail__navigation">
                <v-icon class="mr-4">mdi-chevron-left</v-icon>
                Back to Product List
              </v-subheader>
            </v-btn>
            <div class="product-detail__gallery">
              <lingallery
                ref="gallery"
                :start-image="currentId"
                :width="500"
                :height="500"
                accent-color="rgba(185, 28, 28)"
                :mobile-height="340"
                :show-controls="false"
                :items="gallery"
              />
            </div>
          </div>
          <div class="product-detail__content">
            <div class="product-detail__head">
              <div class="product-detail__title">{{ wheel.brand }}</div>
              <div class="product-detail__name">{{ wheel.name }}</div>
              <div class="product-detail__colors">
                <div
                  v-for="(color, idx2) in wheel.colors"
                  :key="idx2"
                  class="wheel__color-item"
                  :class="{ active: currentColorIdx === idx2 }"
                  :style="{ 'background-color': color.color_hex }"
                  @click="handleIdChange(idx2)"
                ></div>
              </div>
            </div>
            <div class="product-detail__body">
              <div class="product-detail__features">
                <div class="product-detail__features-item">
                  Size :
                  <span v-for="(item, idx3) in wheel.sizes" :key="idx3">
                    {{ item.diameter }} {{ item.option_width }}
                    <span v-if="idx3 !== wheel.sizes.length - 1">|</span>
                  </span>
                </div>
                <div class="product-detail__features-item">
                  PCD : {{ wheel.PCD }}
                </div>
                <div class="product-detail__features-item">
                  ET : {{ wheel.ET }}
                </div>
                <div class="product-detail__features-item">
                  Hub : {{ wheel.hub }}
                </div>
              </div>
              <div class="product-detail__panels">
                <v-expansion-panels flat>
                  <!-- <v-expansion-panel>
                    <v-expansion-panel-header>
                      Sizing Options
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div
                        v-for="(size, idx) in wheel.sizes"
                        :key="idx"
                        class="product-detail__panels-text"
                      >
                        <div class="text-lg font-bold">
                          {{ size.diameter }}”
                        </div>
                        <div class="font-semibold">
                          {{ size.diameter }} {{ size.option_width }}
                        </div>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel> -->
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      About {{ wheel.name }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div v-html="wheel.about"></div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </div>
            <div class="product-detail__action">
              <div class="product-detail__action-group">
                <v-btn
                  block
                  large
                  outlined
                  class="product-detail__button"
                  :to="`/gallery/wheel?limit=12&offset=0&type=wheel&vehicle_brand_id=0&wheel_id=${wheel.id}`"
                >
                  View Wheel Gallery
                </v-btn>
                <v-btn
                  block
                  large
                  outlined
                  class="product-detail__button"
                  :to="`/gallery/vehicle?limit=12&offset=0&type=car&vehicle_brand_id=0&wheel_id=${wheel.id}`"
                >
                  View Vehicle Gallery
                </v-btn>
              </div>
              <v-btn
                large
                block
                dark
                class="product-detail__button"
                :to="`/dealer?wheel_id=${wheel.id}`"
              >
                Find A Dealer
              </v-btn>
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
    const wheel = await $axios
      .$get(`${baseURL}/api/wheel/retrieve/` + route.params.code)
      .then((res) => res.data)

    if (
      _.find(wheel.colors, function (o) {
        return o.image.length
      }) !== undefined
    ) {
      const gallery = _.map(wheel.colors, (item) => {
        return {
          id: item.id,
          src: item.image[0].image,
          thumbnail: item.image[0].image,
        }
      })
      return { wheel, gallery }
    } else {
      const gallery = [{ id: 1, src: wheel.image, thumbnail: wheel.image }]

      return { wheel, gallery }
    }
  },
  data: () => ({
    currentColorIdx: 0,
  }),
  computed: {},
  methods: {
    handleIdChange(idx) {
      if (this.$refs.gallery.currentIndex !== idx) {
        this.currentColorIdx = idx
        this.$refs.gallery.currentIndex = idx
        this.$refs.gallery.pickImage(idx)
      }
    },
  },
}
</script>
<style></style>
