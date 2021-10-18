<template>
  <section class="main__section">
    <div class="blog">
      <div class="main__container">
        <div class="blog-wrapper">
          <div class="blog__head">
            <div class="main-title border-accent left">
              Latest
              <span class="font-bold">Update</span>
            </div>
          </div>
          <div class="blog__content">
            <div class="blog__list">
              <div
                v-for="(items, idx) in blogs"
                :key="idx"
                class="blog__overview"
              >
                <v-card
                  class="blog__overview-thumbnail md:space-x-8 cursor-pointer"
                  flat
                  color="transparent"
                  :to="`/blog/${items.slug}`"
                >
                  <v-list-item-avatar
                    tile
                    class="blog__overview-image mt-0 mb-0"
                  >
                    <v-img :src="items.image"></v-img>
                  </v-list-item-avatar>
                  <div class="blog__overview-content">
                    <div class="block pt-4 md:pt-0">
                      <v-card-subtitle class="blog__overview-subtitle pt-0">
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
                    </div>
                    <div class="blog__overview-actions">
                      <v-btn text class="blog__overview-readmore">
                        <span class="text-red-700">Read More</span>
                      </v-btn>
                      <!-- <div class="blog__overview-socmed">
                        <v-btn icon>
                          <v-icon>mdi-facebook</v-icon>
                        </v-btn>
                      </div> -->
                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </div>
          <div class="blog__pagination">
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
  </section>
</template>
<script>
export default {
  // async asyncData({ $axios, $config: { baseURL } }) {
  //   const blogs = await $axios
  //     .$get(`${baseURL}/api/blog`)
  //     .then((res) => res.data)

  //   return { blogs }
  // },
  data: () => ({
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
        limit: 10,
        offset: 0,
      }
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
          .$get(`${this.$config.baseURL}/api/blog`, {
            params: query,
          })
          .then((res) => res)

        this.blogs = responseBody.data
        this.totalData = responseBody.count
        this.page =
          Math.ceil((Number(query.offset) - 1) / Number(query.limit)) + 1
        this.limit = Number(query.limit)

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
  },
}
</script>
<style></style>
