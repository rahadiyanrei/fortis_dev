<template>
  <v-app class="viewport">
    <Navigation />
    <!-- Sizes your content based upon application components -->
    <v-main class="main">
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="main__wrapper">
        <div class="main__body">
          <!-- If using vue-router -->
          <Nuxt />
        </div>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>
