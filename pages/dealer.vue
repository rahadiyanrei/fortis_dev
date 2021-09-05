<template>
  <section class="main__section">
    <div class="dealer">
      <div class="dealer__wrapper">
        <div class="dealer__menu">
          <div class="dealer__filter">
            <v-autocomplete
              v-model="dealerFilter"
              :items="province"
              label="Lokasi Dealer"
              color="#ffffff"
              item-text="name"
              item-value="id"
              dark
              outlined
            ></v-autocomplete>
          </div>
          <div class="dealer__list">
            <div v-for="(item, idx) in dealer" :key="idx" class="dealer__item">
              <div class="dealer__subtitle">{{ item.province.name }}</div>
              <div class="dealer__title">{{ item.name }}</div>
              <div class="dealer__address">
                {{ item.address }}
                <br />
                {{ item.phone_number }}
                <br />
                {{ item.email }}
              </div>
            </div>
          </div>
        </div>
        <div class="dealer__map">
          <GMap
            ref="gMap"
            language="en"
            :center="{
              lat: locations[1].lat,
              lng: locations[1].lng,
            }"
            :options="{
              fullscreenControl: false,
              styles: mapStyle,
            }"
            :zoom="7"
          >
            <GMapMarker
              v-for="location in locations"
              :key="location.id"
              :position="{ lat: location.lat, lng: location.lng }"
              @click="currentLocation = location"
            >
              <GMapInfoWindow :options="{ maxWidth: 200 }">
                <code>lat: {{ location.lat }}, lng: {{ location.lng }}</code>
              </GMapInfoWindow>
            </GMapMarker>
          </GMap>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, $config: { baseURL } }) {
    const province = await $axios
      .$get(`${baseURL}/api/province`)
      .then((res) => res.data)

    const dealer = await $axios
      .$get(`${baseURL}/api/dealer`)
      .then((res) => res.data)

    const locations = await dealer.map((item) => {
      const data = {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.long),
      }
      return data
    })

    return { province, dealer, locations }
  },
  data: () => ({
    dealerFilter: null,
    currentLocation: {},
    locations: [],
    clusterStyle: [
      {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
        width: 56,
        height: 56,
        textColor: '#fff',
      },
    ],
    mapStyle: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#3e606f',
          },
          {
            weight: 1.5,
          },
          {
            gamma: 0.5,
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            weight: 0.6,
          },
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {
            color: '#E5E5E5',
          },
          {
            lightness: '5',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#E5E5E5',
          },
        ],
      },
      {
        featureType: 'poi.attraction',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#E5E5E5',
          },
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi.attraction',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'on',
            color: '#E5E5E5',
          },
          {
            lightness: '14',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#E5E5E5',
          },
          {
            visibility: 'simplified',
          },
          {
            lightness: '-5',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#E5E5E5',
          },
          {
            lightness: '0',
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#E5E5E5',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
    ],
    province: [],
  }),
  async created() {
    this.locations = await this.dealer.map((item) => {
      const data = {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.long),
      }
      return data
    })
    console.log(this.locations)
  },
  methods: {},
}
</script>
<style></style>
