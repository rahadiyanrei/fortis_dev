<template>
  <section class="main__section">
    <div class="home">
      <div class="home__wrapper">
        <div class="home__banner hidden">
          <v-carousel v-model="model" class="carousel__banner">
            <v-carousel-item v-for="(color, i) in colors" :key="color">
              <v-sheet :color="color" height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <div class="text-h2">Slide {{ i + 1 }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="home__wheel hidden">
          <div class="main__title">New Arrival</div>
          <v-carousel v-model="model" class="carousel__wheel">
            <v-carousel-item v-for="(color, i) in colors" :key="color">
              <v-sheet :color="color" height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <div class="text-h2">Slide {{ i + 1 }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
          <div class="carousel__wheel-navigation">
            <v-btn>View All Wheels</v-btn>
          </div>
        </div>
        <div class="home__gallery">
          <div
            v-for="(item, idx) in overviews"
            :key="idx"
            class="gallery__overview"
          >
            <v-card class="gallery__overview-thumbnail" flat>
              <v-img
                :src="item.imageURL"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="350px"
              >
                <v-card-title
                  :class="[item.placement === 'right' ? 'ml-auto' : 'mr-auto']"
                >
                  <div>
                    {{ item.title }}
                  </div>
                </v-card-title>
              </v-img>
            </v-card>
            <div class="gallery__overview-list">
              <div class="gallery__overview-item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
    overviews: [
      {
        placement: 'left',
        title: 'Vehicle Galleries',
        imageURL: require('@/assets/images/gallery/overview/vehicle.png'),
      },
      {
        placement: 'right',
        title: 'Wheels Galleries',
        imageURL: require('@/assets/images/gallery/overview/wheel.png'),
      },
    ],
    gallery: [],
  }),
}
</script>
