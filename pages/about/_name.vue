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
            <div class="main-title border-accent left">
              About
              <span class="font-bold">{{ selectAbout.name }}</span>
            </div>
            <div class="about__body">
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
        extendDescription: [],
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
