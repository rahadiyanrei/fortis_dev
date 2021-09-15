<template>
  <section class="main__section">
    <div class="about">
      <div class="about__wrapper">
        <div class="about__banner">
          <v-img
            :src="getImageURL(selectAbout.bannerURL)"
            :aspect-ratio="3 / 1"
          ></v-img>
        </div>
        <div class="main__container">
          <div class="about__content">
            <div class="about__head">
              <div class="main-title border-accent left">
                About
                <span class="font-bold">{{ selectAbout.name }}</span>
              </div>
              <div class="md:flex justify-between space-y-8 md:space-y-0">
                <div class="about__description">
                  <p>
                    {{ selectAbout.description }}
                  </p>
                  <template v-if="selectAbout.extendDescription.length">
                    <div
                      v-if="
                        selectAbout.extendDescription[0].type === 'description'
                      "
                      class="justify-between space-y-10"
                    >
                      <p
                        v-for="(item, idx3) in selectAbout.extendDescription[0]
                          .contents"
                        :key="idx3"
                        v-html="item.description"
                      ></p>
                    </div>
                  </template>
                </div>

                <div class="about__action">
                  <div class="about__action-item">
                    <v-btn text outlined elevation="false">
                      Download Brochure
                    </v-btn>
                  </div>
                  <div class="about__action-item">
                    <v-btn text outlined elevation="false" to="/contact">
                      Contact Us
                    </v-btn>
                  </div>
                  <div class="about__action-item">
                    <v-btn text outlined elevation="false" to="/dealer">
                      Find a Dealer
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="selectAbout.extendDescription.length">
              <div
                v-for="(items, idx2) in selectAbout.extendDescription"
                :key="idx2"
                class="about__body"
              >
                <template v-if="items.type === 'youtube'">
                  <div class="about__plugin">
                    <div class="about__plugin-title">
                      {{ items.contents.title }}
                    </div>
                    <div class="about__plugin-content">
                      <youtube :video-id="items.contents.videoId" resize />
                    </div>
                  </div>
                </template>
                <template v-if="items.type === 'google-maps'">
                  <div class="about__plugin">
                    <div class="about__plugin-title">
                      {{ items.contents.title }}
                    </div>
                    <div class="about__plugin-content">
                      <GMap
                        ref="gMap"
                        language="en"
                        :cluster="{ options: { styles: clusterStyle } }"
                        :center="{
                          lat: items.contents.locations[0].lat,
                          lng: items.contents.locations[0].lng,
                        }"
                        :options="{
                          fullscreenControl: false,
                          styles: mapStyle,
                        }"
                        :zoom="15"
                      >
                        <GMapMarker
                          v-for="location in items.contents.locations"
                          :key="location.id"
                          :position="{ lat: location.lat, lng: location.lng }"
                          @click="items.contents.currentLocation = location"
                        >
                          <GMapInfoWindow :options="{ maxWidth: 300 }">
                            <div class="dealer__map-info">
                              <div class="dealer__map-head">
                                <span class="dealer__map-info__title">
                                  {{ location.name }}
                                </span>

                                <div>
                                  {{ location.email }} |
                                  {{ location.phone_number }}
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
                </template>
                <div
                  v-if="items.type === 'card'"
                  class="about__card-list md:grid-cols-2"
                  :class="[
                    items.gridCols
                      ? `lg:grid-cols-${items.gridCols}`
                      : 'lg:grid-cols-3',
                  ]"
                >
                  <v-card
                    v-for="(item, idx3) in items.contents"
                    :key="idx3"
                    class="about__card"
                    :elevation="0"
                  >
                    <v-img
                      :src="getImageURL(item.imageURL)"
                      :aspect-ratio="16 / 9"
                    />
                    <v-card-title
                      v-if="item.title !== ''"
                      class="about__card-title"
                    >
                      {{ item.title }}
                    </v-card-title>
                    <v-card-text
                      v-if="item.description !== ''"
                      class="about__card-description"
                      v-html="item.description"
                    ></v-card-text>
                  </v-card>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data: () => ({
    abouts: [
      {
        name: 'Pako Group',
        to: 'company',
        bannerURL: '/about/pako-group/banner.png',
        description: `Pako Group adalah perusahaan yang bergerak dalam industri komponen otomotif yang menghasilkan wheel rim yang terbuat dari baja dan alumunium untuk kendaraan roda dua dan roda empat. Pako Group mengawali bisnisnya dengan membuat produk original equipment manufacturer (OEM) untuk customer dari dalam negeri dan luar negeri seperti Malaysia, Jepang, Jerman, Thailand, Hungaria, dan Italia. Sejak tahun 2015, Pako Group merambah ke bidang wheel aftermarket dengan brand Fortis dan Avantech.`,
        extendDescription: [
          {
            type: 'description',
            contents: [
              {
                description: `
                <b>Pakoakuina</b><br/>
                Pakoakuina Car Wheel & Motorcycle memproduksi alloy wheel untuk OEM dan aftermarket untuk mobil dan motor dengan total annual capacity sebesar 5.400.000 pcs. Perusahaan yang menjadi customer dari Pakoakuina antara lain Toyota, Daihatsu, Lexus, Honda, dan Perodua.
                `,
              },
              {
                description: `
                <b>Inkoasku</b><br/>
                Inkoasku memproduksi steel wheel untuk OEM dan aftermarket dengan annual capacity sebesar 5.000.000 pcs. Perusahaan yang menjadi customer dari Inkoasku antara lain Toyota, Daihatsu, dan Isuzu.
                `,
              },
            ],
          },
          {
            type: 'youtube',
            contents: {
              title: 'Company Profile',
              videoId: 'aM5ijokX9R0',
            },
          },
          {
            type: 'google-maps',
            contents: {
              title: 'Our Location',
              currentLocation: {},
              locations: [
                {
                  name: 'Pako Group',
                  email: 'hamid@pakoakuina.com',
                  phone_number: '+62 21 651 1228',
                  address: `Jl. Gaya Motor Raya, Sunter II Jakarta Utara - 14330, Indonesia`,
                  lat: -6.136722215837163,
                  lng: 106.89021826863029,
                },
              ],
            },
          },
        ],
      },
      {
        name: 'Testing Facilities',
        to: 'testing-facilities',
        bannerURL: '/about/testing-facilities/banner.png',
        description: `Fasilitas pengujian kami mampu untuk menguji durability produk, material, korosi, dan ketahanan cat. Alat pengujian kami tersertifikasi oleh ISOTSxxxxx, xxxx, xxxx untuk memberikan hasil yang akurat. Pengujian dan hasil uji telah terakreditasi baik di dalam maupun luar negeri. Fasilitas uji kami telah diakui oleh beberapa brand otomotif seperti Toyota, Daihatsu, Honda, dll.`,
        extendDescription: [
          {
            type: 'card',
            gridCols: 3,
            contents: [
              {
                imageURL: '/about/testing-facilities/image-1.png',
              },
              {
                imageURL: '/about/testing-facilities/image-2.png',
              },
              {
                imageURL: '/about/testing-facilities/image-3.png',
              },
              // {
              //   title: 'Impact Test',
              //   imageURL: '/about/testing-facilities/impact-test.png',
              //   description: `
              //   Specification :<br/>
              //   • Load : Max 1010 Kg<br/>
              //   • Passenger car. Load : Max 2500 Kg & 4000 Kg<br/>
              //   • Wheel Size : 12” - 20”<br/>
              //   • Max Drop Height : 270mm<br/>
              //   • Accuracy for Testing Machine<br/>
              //   • Testing Improvement Program<br/>
              //   `,
              // },
            ],
          },
        ],
      },
      {
        name: 'Dieshop',
        to: 'dieshop',
        bannerURL: '/about/die-shop/banner.png',
        description: `Pako Dieshop memiliki kemampuan untuk memproduksi komponen khusus yang terbuat dari berbagai bahan untuk mould casting, dies stamping, dll. Teknisi kami yang berdedikasi, mengasah keterampilan mereka menggunakan teknologi terbaru, bersama-sama membuat komponen terbaik. Fasilitas kami sepenuhnya mendukung semua kebutuhan pelanggan.`,
        extendDescription: [
          {
            type: 'description',
            contents: [
              {
                description: `
                <b>EXPERIENCE :</b><br/>
                1. LPDC (Low Pressure Die Casting) - Car Wheel Mould<br/>
                2. GDC (Gravity Die Casting) - Motorcycle Wheel Mould<br/>
                3. Press/ Stamping Die - Steel Wheel Disc<br/>
                4. General Parts<br/>
                5. Sand Core Mould<br/>
                6. HPDC (High Pressure Die Casting)<br/>
                7. Roll Forming & Expander Die - Steel Wheel Rim<br/>
                `,
              },
            ],
          },
          {
            type: 'card',
            gridCols: 3,
            contents: [
              {
                title: '',
                imageURL: '/about/die-shop/image-1.png',
                description: ``,
              },
              {
                title: '',
                imageURL: '/about/die-shop/image-2.png',
                description: ``,
              },
              {
                title: '',
                imageURL: '/about/die-shop/image-3.png',
                description: ``,
              },
            ],
          },
        ],
      },
      {
        name: 'P-Pro',
        to: 'p-pro',
        bannerURL: '/about/p-pro/banner.png',
        description: `Kami memiliki keahlian dalam mengkonsep sebuah proyek desain hingga terwujud dalam styling concept design yang terintegrasi dengan bidang engineering design untuk diaplikasikan ke dalam manufaktur.`,
        extendDescription: [
          {
            type: 'card',
            contents: [
              {
                title: '',
                imageURL: '/about/p-pro/image-1.png',
                description: `
                `,
              },
              {
                title: '',
                imageURL: '/about/p-pro/image-2.png',
                description: `
                `,
              },
              {
                title: '',
                imageURL: '/about/p-pro/image-3.png',
                description: `
                `,
              },
            ],
          },
        ],
      },
    ],

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
  }),
  computed: {
    selectAbout() {
      const select = this.abouts.filter((item) => {
        return item.to === this.$route.params.name
      })
      return select[0]
    },
  },
  methods: {
    getImageURL(filename) {
      const data =
        this.$config.imageURL + this.$config.imagePATH + '/images' + filename
      return data
    },
  },
}
</script>
<style></style>
