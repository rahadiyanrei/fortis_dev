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
              clearable
              @change="handleFilterDealer"
            ></v-autocomplete>
          </div>
          <div class="dealer__list">
            <div v-if="loading" class="h-3/4 flex justify-center items-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <template v-else>
              <template v-if="filterDealer.length">
                <div
                  v-for="(item, idx) in filterDealer"
                  :key="idx"
                  class="dealer__item"
                  @click="selectLocation(item)"
                >
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
              </template>
              <div v-else class="text-center">
                Lokasi Dealer tidak ditemukan
              </div>
            </template>
          </div>
        </div>
        <div class="dealer__map">
          <GMap
            ref="gMap"
            language="en"
            :center="{
              lat: currentLocation.length ? currentLocation.lat : dealer[1].lat,
              lng: currentLocation.length
                ? currentLocation.long
                : dealer[1].long,
            }"
            :options="{
              fullscreenControl: false,
              styles: mapStyle,
            }"
            :zoom="7"
          >
            <GMapMarker
              v-for="location in dealer"
              :key="location.id"
              ref="gMapMarker"
              :position="{ lat: location.lat, lng: location.long }"
              @click="selectLocation(location)"
            >
              <GMapInfoWindow :options="{ maxWidth: 200 }" :opened="false">
                <div class="dealer__map-info">
                  <div class="dealer__map-head">
                    <span class="dealer__map-info__title">
                      {{ location.name }}
                    </span>

                    <div>
                      {{ location.email }} | {{ location.phone_number }}
                    </div>
                  </div>
                  <div class="dealer__map-info__body">
                    <div>
                      {{ location.address }}
                    </div>
                  </div>
                </div>
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

    dealer.map((item) => {
      item.lat = parseFloat(item.lat)
      item.long = parseFloat(item.long)

      return item
    })

    const filterDealer = dealer

    // const locations = await dealer.map((item) => {
    //   const data = {
    //     lat: parseFloat(item.lat),
    //     lng: parseFloat(item.long),
    //   }
    //   return data
    // })

    return { province, dealer, filterDealer }
  },
  data: () => ({
    loading: false,
    dealerFilter: null,
    openedMarkerID: null,
    currentLocation: {},
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
    filterDealer: [],
  }),
  created() {},
  methods: {
    selectLocation(location) {
      console.log(location)
      if (location.uuid) {
        this.openedMarkerID = location.uuid
      } else {
        this.openedMarkerID = location
      }
      console.log(this.openedMarkerID === location.uuid)
      // this.currentLocation = location
      // this.$refs.gMap.map.setCenter({ lat: location.lat, lng: location.long })
      // this.$refs.gMap.map.panTo({ lat: location.lat, lng: location.long })
      // console.log(
      //   this.$refs.gMap.map
      //     .getBounds()
      //     .contains({ lat: location.lat, lng: location.long })
      // )
    },
    async handleFilterDealer(e) {
      this.loading = true
      const filter = await this.$axios
        .$get(`${this.$config.baseURL}/api/dealer`, {
          params: { province_id: e },
        })
        .then((res) => res.data)
      this.filterDealer = filter
      this.filterDealer.map((item) => {
        item.lat = parseFloat(item.lat)
        item.long = parseFloat(item.long)

        return item
      })
      setTimeout(() => {
        this.loading = false
      }, 500)
      console.log(e)
    },
  },
}
</script>
<style></style>
