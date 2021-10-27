<template>
  <section class="main__section">
    <div class="gallery">
      <div class="main__container">
        <div class="gallery-wrapper">
          <div class="gallery__head">
            <div class="main-title border-accent left">
              Vehicle
              <span class="font-bold">Gallery</span>
            </div>
            <div class="gallery__filter">
              <div class="gallery__filter-select">
                <v-autocomplete
                  v-model="query['vehicle_brand_id']"
                  :items="vehicleBrand"
                  label="Brand Vehicle"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                  clearable
                ></v-autocomplete>
              </div>
              <div class="gallery__filter-select">
                <v-autocomplete
                  v-model="query['wheel_id']"
                  :items="wheel"
                  label="Wheel"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                  clearable
                ></v-autocomplete>
              </div>
            </div>
          </div>
          <div class="gallery__content">
            <div v-if="gallery.length" class="gallery__list">
              <v-card
                v-for="(item, idx2) in gallery"
                :key="idx2"
                class="gallery__overview-item cursor-pointer"
                flat
                :to="`/gallery/${item.uuid}`"
              >
                <v-img
                  :src="item.image_thumbnail"
                  :aspect-ratio="16 / 9"
                ></v-img>
                <v-card-title>
                  <div class="break-normal">
                    {{ item.title }}
                  </div>
                </v-card-title>
                <v-card-subtitle>
                  <div class="flex break-normal uppercase">
                    {{ item.vehicle_brand.name }} |
                    <div
                      v-for="(size, idx3) in item.wheel.sizes"
                      :key="idx3"
                      class="pl-1"
                    >
                      {{ size.diameter }}"
                      <span
                        v-if="idx3 !== item.wheel.sizes.length - 1"
                        class="pr-1"
                      >
                        ,
                      </span>
                    </div>
                  </div>
                </v-card-subtitle>
              </v-card>
            </div>
            <div v-else class="gallery__empty">
              Vehicle Gallery Tidak Ditemukan
            </div>
          </div>
          <div class="gallery__pagination">
            <v-pagination
              v-if="gallery.length"
              v-model="currentPage"
              color="rgba(185, 28, 28)"
              :length="pageCount"
              :total-visible="7"
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, $config: { baseURL } }) {
    let vehicleBrand = await $axios
      .$get(`${baseURL}/api/vehicle_brand/dropdown`)
      .then((res) => res.data)

    vehicleBrand = vehicleBrand.map((item) => {
      return {
        id: item.id.toString(),
        name: item.name,
        logo: item.logo,
      }
    })

    let wheel = await $axios
      .$get(`${baseURL}/api/wheel/dropdown`)
      .then((res) => res.data)

    wheel = wheel.map((item) => {
      return {
        id: item.id.toString(),
        name: item.name,
      }
    })

    return { vehicleBrand, wheel }
  },
  data: () => ({
    vehicle_brand_id: null,
    wheel_id: null,
    gallery: [],
    query: {},
    page: 0,
    limit: 0,
    totalData: 0,
  }),
  computed: {
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.query = Object.assign(this.query, { limit: val })
        if (val > this.query.offset) {
          this.query.offset = 0
        }
      },
    },
    pageCount() {
      return Math.ceil(this.totalData / Number(this.$route.query.limit))
    },
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.query.offset =
          Number(this.$route.query.limit) * val -
          Number(this.$route.query.limit)
      },
    },
    datatableModels() {
      const datatableModels = []
      for (const [model] of Object.entries(this.defaultDatatableQuery)) {
        datatableModels.push(model)
      }
      return datatableModels
    },
    defaultDatatableQuery() {
      return {
        limit: 12,
        offset: 0,
        type: 'car',
        vehicle_brand_id: '0',
        wheel_id: '0',
      }
    },
    // selectCategory() {
    //   const data = this.categories.find((item) => item.value === this.category)

    //   return data
    // },
  },
  watch: {
    query: {
      handler(val, oldVal) {
        console.log('watcher')
        const query = { ...this.query }
        for (const [model, value] of Object.entries(query)) {
          if (value === '') {
            delete query[model]
          }
        }
        this.$router.replace({
          query,
        })
        console.log(query)
        this.getData()
      },
      deep: true,
    },
    $route(to, from) {
      console.log('route')
      this.buildQuery()
    },
  },
  created() {
    this.buildQuery()
  },
  methods: {
    async getData() {
      console.log('get Data')
      const query = { ...this.query }
      this.loading = true
      this.data = []
      try {
        const responseBody = await this.$axios
          .$get(`${this.$config.baseURL}/api/gallery`, {
            params: query,
          })
          .then((res) => res)

        this.gallery = responseBody.data
        this.totalData = responseBody.count
        this.page =
          Math.ceil((Number(query.offset) - 1) / Number(query.limit)) + 1
        this.limit = Number(query.limit)
        this.search = query.globalSearch

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
    buildQuery() {
      console.log('buildQuery')
      const models = [...this.datatableModels]
      let query = {
        ...this.defaultDatatableQuery,
        ...this.defaultGeneratorQuery,
      }
      console.log(query)
      let isManipulate = false
      if (Object.keys(this.$route.query).length > 0) {
        for (const [model] of Object.entries(this.$route.query)) {
          if (!models.includes(model)) {
            delete this.$route.query[model]
            isManipulate = true
          }
        }
        query = Object.assign(query, this.$route.query)
        this.query = query
      }
      if (
        Object.keys(this.query).length < 1 ||
        Object.keys(this.$route.query).length < 1 ||
        isManipulate
      ) {
        this.query = query
      }
    },
    getImageURL(filename) {
      const data =
        this.$config.imageURL + this.$config.imagePATH + '/images' + filename
      return data
    },
    handleFilter(type, value) {
      // this.query.type = null
      if (type === 'vehicle') {
        this.query.vehicle_brand_id = value
        this.query.offset = 0
        this.query.limit = 12
      } else {
        this.query.wheel_id = value
        this.query.offset = 0
        this.query.limit = 12
      }
    },
  },
}
</script>
<style></style>
