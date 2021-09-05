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
            <div class="about__body">
              <div class="main-title border-accent left">
                About
                <span class="font-bold">{{ selectAbout.name }}</span>
              </div>
              <div class="flex justify-between">
                <p class="about__description">
                  {{ selectAbout.description }}
                </p>
                <div class="about__action">
                  <div class="about__action-item">
                    <v-btn text outlined elevation="false">
                      Download Brochure
                    </v-btn>
                  </div>
                  <div class="about__action-item">
                    <v-btn text outlined elevation="false">Contact Us</v-btn>
                  </div>
                  <div class="about__action-item">
                    <v-btn text outlined elevation="false">Find a Dealer</v-btn>
                  </div>
                </div>
              </div>
              <div
                v-if="selectAbout.extendDescription.length"
                class="flex justify-between w-3/6"
              >
                <p
                  v-for="(item, idx) in selectAbout.extendDescription"
                  :key="idx"
                  v-html="item.text"
                ></p>
              </div>
            </div>
            <div
              v-for="(items, idx2) in selectAbout.extendDescription"
              :key="idx2"
            >
              <div class="about__plugin">
                <div class="about__plugin-title">
                  Volutpat pretium dictum mauris a placerat vulputate.
                </div>
                <div class="about__plugin-content">
                  <youtube video-id="aM5ijokX9R0" />
                </div>
              </div>
              <div class="about__plugin">
                <div class="about__plugin-title">
                  Volutpat pretium dictum mauris a placerat vulputate.
                </div>
                <div class="about__plugin-content">
                  <GMap
                    ref="gMap"
                    language="en"
                    :cluster="{ options: { styles: clusterStyle } }"
                    :center="{ lat: locations[0].lat, lng: locations[0].lng }"
                    :options="{ fullscreenControl: false, styles: mapStyle }"
                    :zoom="13"
                  >
                    <GMapMarker
                      v-for="location in locations"
                      :key="location.id"
                      :position="{ lat: location.lat, lng: location.lng }"
                      :options="{
                        icon:
                          location === currentLocation
                            ? pins.selected
                            : pins.notSelected,
                      }"
                      @click="currentLocation = location"
                    >
                      <GMapInfoWindow :options="{ maxWidth: 200 }">
                        <code>
                          lat: {{ location.lat }}, lng: {{ location.lng }}
                        </code>
                      </GMapInfoWindow>
                    </GMapMarker>
                  </GMap>
                </div>
              </div>
              {{ items.contens.length }}
              <div v-if="items.type === 'card'" class="about__card-list">
                <v-card
                  v-for="(item, idx3) in items.contents"
                  :key="idx3"
                  class="about__card"
                  :elevation="0"
                >
                  <v-img :src="item.imageURL" height="100%" />
                  <v-card-title class="about__card-title">
                    {{ item.title }}
                  </v-card-title>
                  <v-card-text
                    class="about__card-description"
                    v-html="item.description"
                  ></v-card-text>
                </v-card>
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
  data: () => ({
    abouts: [
      {
        name: 'Pako Group',
        to: 'company',
        bannerURL: '/about/pako-group/banner.png',
        description: `Pako Group adalah perusahaan yang bergerak dalam industri komponen otomotif yang menghasilkan wheel rim yang terbuat dari baja dan alumunium untuk kendaraan roda dua dan roda empat. Pako Group mengawali bisnisnya dengan membuat produk OEM untuk customer dari dalam negeri dan luar negeri seperti Malaysia, Jepang, Jerman, Thailand, Hungaria, dan Italia. Perusahaan yang menjadi customer dari Pako Group antara lain Toyota, Daihatsu, Honda, dan lain sebagainya. Sejak tahun 2015, Pako Group mulai merambah ke bidang After Market dengan produknya yang bernama Fortis dan Avantech.`,
        extendDescription: [],
      },
      {
        name: 'Testing Facilities',
        to: 'testing-facilities',
        bannerURL: '/about/testing-facilities/banner.png',
        description: `Fasilitas pengujian kami mampu untuk menguji durability produk, material, korosi, dan ketahanan cat. Alat pengujian kami tersertifikasi oleh ISOTSxxxxx, xxxx, xxxx untuk memberikan hasil yang akurat. Pengujian dan hasil uji telah terakreditasi baik di dalam maupun luar negeri. Fasilitas uji kami telah diakui oleh beberapa brand otomotif seperti Toyota, Daihatsu, Honda, dll.`,
        extendDescription: [
          {
            type: 'card',
            contents: [
              {
                title: 'Drum Test',
                imageURL: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
                description: `
                Specification : <br/>
                • Truck & Bus. Load : Max 9000 Kg<br/>
                • Passenger car. Load : Max 2500 Kg & 4000 Kg<br/>
                • Motorcycle Wheel. Max Size : 18:<br/>
                • Accuracy for Testing Machine<br/>
                • Testing Improvement Program<br/>
                `,
              },
              {
                title: 'Impact Test',
                imageURL: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
                description: `
                Specification :<br/>
                • Load : Max 1010 Kg<br/>
                • Passenger car. Load : Max 2500 Kg & 4000 Kg<br/>
                • Wheel Size : 12” - 20”<br/>
                • Max Drop Height : 270mm<br/>
                • Accuracy for Testing Machine<br/>
                • Testing Improvement Program<br/>
                `,
              },
              {
                title: 'Salt Spray Test',
                imageURL: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
                description: `
                Specification :<br/>
                • Spray Capacity : 1-2 (ml/80cm2/Hr)<br/>
                • PH : 6,5 - 7,2<br/>
                • Pressure : 0,098 Mpa (0,07 - 1,67 Mpa)<br/>
                • Time Test : 24 Hours<br/>
                `,
              },
              {
                title: 'Moment Life Test',
                imageURL: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
                description: `
                Specification :<br/>
                • Load : Max 2000 Kg<br/>
                • car. Wheel Product. max Size : 20”<br/>
                • Motorcycle Wheel. Max Size : 18”<br/>
                • Accuracy for Testing Machine<br/>
                • Testing Improvement Program<br/>
                `,
              },
              {
                title: 'Tensile Test',
                imageURL: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
                description: `
                Specification :<br/>
                -
                `,
              },
              {
                title: 'Humidity Test',
                imageURL: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
                description: `
                Temperature : 40C<br/>
                Humidty : 85% RH<br/>
                Time Test : 120 Hours<br/>
                `,
              },
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
            text: `
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
          {
            text: `
            Lathe Machine <br/>
            CNC Milling <br/>
            Feeler <br/>
            Conture Machine <br/>
            Cylindrical Machine <br/>
            Manual Milling <br/>
            Drilling Machine <br/>
            Cutting Machine (Wire cut) <br/>
            `,
          },
        ],
      },
      {
        name: 'P-Pro',
        to: 'p-pro',
        bannerURL: '/about/p-pro/banner.png',
        description: `Kami memiliki keahlian dalam mengkonsep sebuah proyek desain hingga terwujud dalam styling concept design yang terintegrasi dengan bidang engineering design untuk diaplikasikan ke dalam manufaktur.`,
        extendDescription: [],
      },
    ],
    currentLocation: {},
    locations: [
      {
        lat: -6.136722215837163,
        lng: 106.89021826863029,
      },
    ],
    pins: {
      selected:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAADgElEQVRIia2XTWhcVRiGn+/MT4JJOq1jok1diD8FBRtBjMG4ahe6lJaIqQkIdaFQZOzGQJM64mBWGuIEwVbRNraWJjuLUDBSkAqzUqMu2gRqUZs0P00mTExm5s75XLSGMPfemTuD7+ryvd99n8M959x7rlCzVI6+8t5uY8xuAGvt3Nj5d+dAtJYUCdr49uHhh9WUUqI8b4WIQPiuVURx1MgPJezg2PjQ9f8F3NNzIbSn4WpakYOCtIH63aMoCxJi4q+NvYmJiZdLdYOTryUbV5zwlIEOhaZqg7xDJ2eQX5xdLQfS6bfyfn2mQoRknfAk8HRQKIBAs6LPmNW1yUp9IT/j2KvRPuANJDh0e64gbZ0dB25kpr//zWeAbvX0XAjtiV6bRXjIfYPQHGsi0hABoJgvkltbR9VjUSt/7HzMeSSZTNpyK+zuhgcbZp9DdIeWraNQJMT97W30Hj1ELB4DILuc5Vx6klt/L2BLZflCy+3ZcBfwYznDc44t2qsq95bXm1uaODLQvwUFiMVjHBnop3mH54zEQ9DrZXiCBX3c1RgydL/YtfWItyvaGKX7hWcxxj1zKjwRGAzcV16IRCO0PhD3aYe29lYiDVFXXZTWwGCFXHmtmC+yOL/sC164uUgxX3BnqbqyfMEiZqa8Zq3lyqUMxXzR1V/YLHDlUgZr3StbjVwNDFbV7xQ2y+u5bI5TH5xmdTm7VVtZWuWz4TOsr617RW1g7ZSX4bmdCtZ8EzXOMEj79nrJKTH/5y1Ovv8F0cY781nYLJDzhoLqiinYb70s33d1oj+VQen084NI0czoV0NdXp7vu1qMngT+qR8qOQOf+vm+4JiUzgIr9YKBVfJN52sGJ79Mbgp8IuDeI1WkQl5U0yMTxzZqBgPEws5HFl2qFSwqS1K4J12px/ezCHD558tO5779GwbpBhoDQZGsEXt85OuBTOW+qlJJ9KV+AukIAlZhenT8+FPVDn8VH/Xdsamo9gMLAbiLxtjDQU6cAcAwcvbEr8AZFa20vdZV+Xzk9Infg2QGAgPsfNR5R6xc87EVmLlZ2DsYNC8wOJlMWsfoQWDOw54PWV6qdqStCwwwNj503Yp5HeX2tvKyNbz54bnBG7VkVdxOXspMT8107dsfV9EnBSkIcmp0fHCs1pw6pZLoS11M9KUuVvizqCjPz2J1iZZ2fXzov+t6Ev4F0gdHv5TSrLMAAAAASUVORK5CYII=',
      notSelected:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAEjElEQVRIia2Wa0wcZRSG35m9DbcFdrktlVILLQIFKpfSiPaGmjSppqlBhdhEksb6o1E0Jo0Rl21qJE2NbQRNldqiUktKf1QhaoxcpFKg5VpoF4G4QBDoXtgBZneHvcz4C2RhdhnQ99fknHfOk3O+b+b7CGxYPHHq1TMakiQ1AMBx3HRlbdk0QPAbqUKINb5TVL49LMzxEQHu6Ug1KwsPcUoBgJ6Xu4yzlNvDS25bGGlp5XcfGv4XcEHBDUmqerBCGeI89uKB8aj42AWCWNUczxMYmwrmf2zaZpx3yOoemtJK6upe9mwarHtdR3EU33gwZzLjmayZIDGdtHbHMi33tvRbZar8ioq3Fn35SN8leIJTcDdf2D+WJRYKAPuypoKP7DfkqNyWm/58El+J0yeI155Msrx5MHdKNHRJmki7xGwNiErYeni8rbdlUMgjOOqCghuS1IjB0feK+7ZRcu+lGvtbicaeXWBdgQAASmbDs9kPEK+Z9/Kxi1J8cjV9DDGSBJ1Ox61mSIXAjylGn0pNnFWuhvaNxKB9aA+OnngFoepQAMCcZQ63Ltci74lOpO8wLnsphRvJCXRIW3/0XgB3VjME1zg0hC3MSLKoVsbsrBRNXSkoKilehgJAqDoUhW8Xo7E7FY5F75XbnWRRq4JdhUIMQTBJcsmR4Q6vmN6gRvahPMgUsjV+OSVH5oE86P+K8IpHqOwgpZ4U0WCOQ0QA5T1mmlEiPDJSyA4AUEVFwWpTesWCAjzgOULwJUEwISEZxua9/GHB87CaTD7Bs0YjwoO8N9iCTQaC4BnRYPAYoRcor1Dy4xZ0N9+Ba9G1xu5knehpaUPydrNXnF6Qg+P5P0WDGYf0t4lHQezKWCDlxqHsQXx/4TJoy9xy3Gqmcf3i13gu+wECFN7LMzEV4mAYRaMQQ/BzYlhZfb9eXb4vczp2ZTwj8RHCA1vxc5UFrDsYAEBJGRzJGUScZu1Ee4fUVo+D+0mI4fNfffZUaWfJ8ft7VnchVjaHFBdr0jvLPj+7Vyjv819tZ2VftffG2DdFBdDep2FYu/RLX3mfYIWbv9beH231cH7OER/ycCQ6BqJolgmp3TBYV61j3R580atXOzcKvjsQsejiyIoLde86fHn8tiNxSj79pS3O7HSL79rlJtHUEWe2W5QVfmv7S7b0tbhzd+U7OI7MS9w6R/nzLunXtrg5w6Tyg/PX3u/051u3lXNXtZe69epxM70+12Sl0PUwcrz8ivbyel4RMyR4mpYfr2nYYeR53zclnidQU7/TNG+XFom5cfod9ZI6BpqNuan50aSE3x0fy6w9ngD83q2xDRtUl85dKbsupqboXSPZQpxu7YodnjYFrsnNmAP52/diR4asKaVi64kG63Q6zszIjn1bv3N60fnvoFinBNU/JM0wC/Kj611pV0rUqJd0934znZuWrzdMKg9nppgCAALVt5IsRlr+xvlvyvzu4v8EBoA/elpGMpOfV9tYadrohNI5PKaq+rjqTOVG62xSPKE9qW3QntQ2AH62uh8JHovri+Ct8s9eWnreTIV/AIR1wOGopbx1AAAAAElFTkSuQmCC',
    },
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
            weight: 2,
          },
          {
            gamma: 0.84,
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
            color: '#00C5CD',
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
            color: '#00C5CD',
          },
        ],
      },
      {
        featureType: 'poi.attraction',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#00C5CD',
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
            color: '#00C5CD',
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
            color: '#00C5CD',
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
            color: '#00C5CD',
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
            color: '#00C5CD',
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
