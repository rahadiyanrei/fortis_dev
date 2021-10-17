<template>
  <section class="main__section">
    <div class="product-detail">
      <div class="main__container">
        <div class="product-detail__wrapper">
          <div class="product-detail__preview">
            <v-btn plain to="/apparel">
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
              <div class="product-detail__title">
                {{ product.category.name }}
              </div>
              <div class="product-detail__name">{{ product.name }}</div>
            </div>
            <div class="product-detail__body">
              <div class="product-detail__features">
                <div
                  class="product-detail__features-item"
                  v-html="product.description"
                ></div>
              </div>
            </div>
            <div class="product-detail__action">
              <div class="product-detail__action-group">
                <v-btn block large dark class="product-detail__button">
                  Buy Product
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <div v-if="related.length != 0" class="product-detail__related">
          <div class="product-detail__related-title">Related Products</div>
          <div class="product-detail__related-list">
            <div
              v-for="(items, idx) in related"
              :key="idx"
              class="product-detail__related-item"
            >
              <v-card
                class="product cursor-pointer"
                flat
                color="transparent"
                :to="`/apparel/${items.uuid}`"
              >
                <div class="product__head">
                  <v-img
                    :src="items.image_thumbnail"
                    class="product__image"
                    contain
                  ></v-img>
                </div>
                <div class="product__body">
                  <v-card-title class="product__title">
                    {{ items.name }}
                  </v-card-title>
                </div>
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
      .$get(`${baseURL}/api/apparel/` + route.params.code)
      .then((res) => res)

    let product = []
    let related = []
    product = data.data
    related = data.related

    let gallery = _.map(product.images, (item, index) => {
      return {
        id: index + 1,
        src: item.image,
        thumbnail: item.image,
      }
    })

    gallery = [
      ...gallery,
      {
        id: 0,
        src: product.image_thumbnail,
        thumbnail: product.image_thumbnail,
      },
    ]

    return { product, gallery, related }
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
