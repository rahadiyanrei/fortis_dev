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
                  v-if="product.is_all_sizes !== 1"
                  class="product-detail__features-item flex"
                >
                  Available Size :
                  <div
                    v-for="(size, idx3) in product.sizes"
                    :key="idx3"
                    class="md:pl-1 space-x-2"
                  >
                    {{ size }}
                    <span v-if="idx3 !== product.sizes.length - 1">,</span>
                  </div>
                </div>
                <div
                  class="product-detail__features-item"
                  v-html="product.description"
                ></div>
              </div>
            </div>
            <div class="product-detail__action">
              <span v-if="product.tokopedia_url || product.shopee_url">
                Buy now on :
              </span>
              <div class="product-detail__action-group">
                <v-btn
                  v-if="product.tokopedia_url"
                  :href="product.tokopedia_url"
                  target="_blank"
                  block
                  large
                  dark
                  class="product-detail__button"
                  color="#21883D"
                  link
                >
                  Tokopedia
                </v-btn>
                <v-btn
                  v-if="product.shopee_url"
                  :href="product.shopee_url"
                  target="_blank"
                  block
                  large
                  dark
                  class="product-detail__button"
                  color="#F94C2F"
                >
                  Shopee
                </v-btn>
                <v-btn
                  v-if="product.lazada_url"
                  :href="product.lazada_url"
                  target="_blank"
                  block
                  large
                  dark
                  class="product-detail__button"
                  color="#181B56"
                >
                  Lazada
                </v-btn>
                <v-btn
                  v-if="product.bukalapak_url"
                  :href="product.bukalapak_url"
                  target="_blank"
                  block
                  large
                  dark
                  class="product-detail__button"
                  color="#E31F52"
                >
                  Bukalapak
                </v-btn>
                <v-btn
                  v-if="product.blibli_url"
                  :href="product.blibli_url"
                  target="_blank"
                  block
                  large
                  dark
                  class="product-detail__button"
                  color="#0095DA"
                >
                  Blibli
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
                <div class="product__body my-0">
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
