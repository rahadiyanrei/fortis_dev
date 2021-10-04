<template>
  <section class="main__section">
    <div class="blog-detail">
      <div class="blog-detail__banner">
        <v-img :src="data.image" :aspect-ratio="3 / 1"></v-img>
      </div>
      <div class="main__container">
        <div class="blog-detail__wrapper">
          <div class="blog-detail__content">
            <div class="blog-detail__head">
              <div class="blog-detail__subtitle">
                {{ data.created_at | datetimeToDatetime }} /
                {{ data.created_by.fullname }}
              </div>
              <div class="blog-detail__title">{{ data.title }}</div>
            </div>
            <div class="blog-detail__body">
              <div class="blog-detail__text" v-html="data.content"></div>
            </div>
            <div class="blog-detail__footer">
              <v-btn plain to="/blog">
                <v-subheader class="blog-detail__navigation">
                  <v-icon class="mr-4">mdi-chevron-left</v-icon>
                  Back to Our Blog
                </v-subheader>
              </v-btn>
              <div class="blog-detail__socmeds"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, $config: { baseURL }, route }) {
    const data = await $axios
      .$get(`${baseURL}/api/blog/` + route.params.name)
      .then((res) => res.data)

    return { data }
  },
}
</script>
<style></style>
