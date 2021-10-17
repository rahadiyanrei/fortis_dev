<template>
  <section class="main__section">
    <div class="product">
      <div class="main__container">
        <div class="product-wrapper">
          <div class="product__category desktop">
            <div class="product__category-title">Shop By Categories</div>
            <div class="product__category-list">
              <div class="product__category-item">
                <v-checkbox
                  v-for="(item, idx) in categories"
                  :key="idx"
                  v-model="category"
                  dense
                  :label="item.name"
                  :value="item.id"
                  color="rgba(185, 28, 28)"
                  @change="handleCategories"
                ></v-checkbox>
              </div>
            </div>
          </div>
          <div class="product__content">
            <div class="product__head">
              <div class="main-title border-accent left">
                All
                <span class="font-bold">Product</span>
              </div>
              <div class="product__sort">
                <v-select
                  v-model="filter"
                  :items="sorts"
                  label="Sort By"
                  item-text="label"
                  item-value="label"
                  dense
                  outlined
                  @change="handleFilterWheel"
                ></v-select>
              </div>
              <div class="product__category mobile">
                <div class="product__category-title">Category</div>
                <div class="product__category-list">
                  <div class="product__category-item">
                    <v-checkbox
                      v-for="(item, idx) in categories"
                      :key="idx"
                      v-model="category"
                      dense
                      :label="item.label"
                      :value="item.value"
                      color="rgba(185, 28, 28)"
                      @change="handleCategories"
                    ></v-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div class="product__body">
              <div class="product__list">
                <div
                  v-for="(items, idx) in products"
                  :key="idx"
                  class="product__item"
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
              <div class="product__pagination">
                <v-pagination
                  v-model="currentPage"
                  color="rgba(185, 28, 28)"
                  :length="pageCount"
                  :total-visible="7"
                ></v-pagination>
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
    const categories = await $axios
      .$get(`${baseURL}/api/apparel_category/dropdown`)
      .then((res) => res.data)

    return { categories }
  },
  data: () => ({
    titleWheel: [],
    category: 0,
    filter: null,
    page: 0,
    limit: 0,
    totalData: 0,
    query: {},
    products: [],
    sorts: [
      {
        label: 'A to Z',
        value: 'name',
        sort: 'asc',
      },
      {
        label: 'Z to A',
        value: 'name',
        sort: 'desc',
      },
      {
        label: 'Created Date',
        value: 'created_at',
        sort: 'asc',
      },
      {
        label: 'Updated Date',
        value: 'created_at',
        sort: 'desc',
      },
    ],
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
        orderBy: 'created_at',
        orderType: 'desc',
        apparel_category_id: null,
        limit: 12,
        offset: 0,
      }
    },
    selectCategory() {
      const data = this.categories.find((item) => item.value === this.category)

      return data
    },
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
          .$get(`${this.$config.baseURL}/api/apparel`, {
            params: query,
          })
          .then((res) => res)

        this.products = responseBody.data
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
      let isManipulate = false
      if (Object.keys(this.$route.query).length > 0) {
        for (const [model] of Object.entries(this.$route.query)) {
          if (!models.includes(model)) {
            delete this.$route.query[model]
            isManipulate = true
          }
        }
        query = Object.assign(query, this.$route.query)
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
    handleCategories() {
      this.query.apparel_category_id = this.category
      this.query.offset = 0
    },
    handleFilterWheel() {
      const data = this.sorts.find((item) => item.label === this.filter)

      this.query.orderBy = data.value
      this.query.orderType = data.sort
      this.query.offset = 0
    },
  },
}
</script>
<style></style>
