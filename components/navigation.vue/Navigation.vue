<template>
  <v-app-bar app flat dense elevate-on-scroll class="nav">
    <v-btn>
      <v-icon>Wheels</v-icon>
    </v-btn>

    <v-btn>
      <v-icon>Gallery</v-icon>
    </v-btn>

    <v-btn>
      <v-icon>Blog</v-icon>
    </v-btn>

    <v-spacer />

    <v-btn>
      <v-img src="./logo_fortis.svg"></v-img>
    </v-btn>

    <v-spacer />

    <v-btn>
      <v-icon>Apparel</v-icon>
    </v-btn>

    <v-btn>
      <v-icon>About</v-icon>
    </v-btn>

    <v-btn>
      <v-icon>Contact</v-icon>
    </v-btn>

    <!-- <v-menu left bottom>
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <!-- -->
  </v-app-bar>
</template>
<script>
export default {
  data: () => ({}),
  methods: {},
}
</script>
<style></style>
