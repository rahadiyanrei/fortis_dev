<template>
  <section class="main__section">
    <div class="contact">
      <div class="contact__wrapper">
        <div class="main__container">
          <div class="contact__body">
            <div class="contact__info">
              <div class="main-title border-accent left">
                Contact
                <span class="font-bold">Info</span>
              </div>
              <div class="contact__info-body">
                <div class="contact__info-list">
                  <div class="contact__info-item">
                    <span class="contact__info-title">Office Address</span>
                    <div class="contact__info-value">
                      Jl. Gaya Motor Raya, Sunter II Jakarta Utara - 14330,
                      Indonesia
                    </div>
                  </div>
                  <div class="contact__info-item">
                    <span class="contact__info-title">Email</span>
                    <div class="contact__info-value">hamid@pakoakuina.com</div>
                  </div>
                  <div class="contact__info-item">
                    <span class="contact__info-title">Phone Number</span>
                    <div class="contact__info-value">+62 21 651 1228</div>
                  </div>
                  <div class="contact__info-item">
                    <span class="contact__info-title">Social Media</span>
                    <div class="contact__info-value">
                      <v-btn
                        v-for="(item, idx) in socmed"
                        :key="idx"
                        :href="item.link"
                        large
                        icon
                        target="_blank"
                      >
                        <v-icon color="black">{{ item.icon }}</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
              <div class="contact__info-action">
                <v-btn outlined text large elevation="false" to="/dealer">
                  Find A Delaer
                </v-btn>
              </div>
            </div>
            <div class="contact__form">
              <v-card class="contact__form-card" elevation="3">
                <div class="contact__form-title">
                  If you have any question regarding our product, don’t hesitate
                  to contact or fill out this form.
                </div>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="form.fullname"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Nama Lengkap"
                    outlined
                    required
                  ></v-text-field>

                  <v-select
                    v-model="form.contactType"
                    :items="['Whatsapp', 'Email']"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Kontak yang dapat dihubungi"
                    outlined
                    required
                  ></v-select>

                  <v-text-field
                    v-if="form.contactType === 'Whatsapp'"
                    v-model="form.whatsapp"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Nomer Whatsapp "
                    outlined
                    required
                  ></v-text-field>

                  <v-text-field
                    v-if="form.contactType === 'Email'"
                    v-model="form.email"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Email Anda"
                    outlined
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="form.fortisKnowFrom"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Dari mana mengenal fortis"
                    outlined
                    required
                  ></v-text-field>

                  <div class="grid grid-cols-2 gap-4">
                    <v-text-field
                      v-model="form.city"
                      :rules="[(v) => !!v || 'Item is required']"
                      label="Kota"
                      outlined
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.province"
                      :rules="[(v) => !!v || 'Item is required']"
                      label="Provinsi"
                      outlined
                      required
                    ></v-text-field>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <v-select
                      v-model="form.country"
                      :rules="[(v) => !!v || 'Item is required']"
                      :items="country"
                      label="Negara"
                      outlined
                      required
                    ></v-select>
                    <v-text-field
                      v-model="form.postalCode"
                      :rules="[(v) => !!v || 'Item is required']"
                      label="Kode Pos"
                      outlined
                      required
                    ></v-text-field>
                  </div>

                  <v-textarea
                    v-model="form.comment"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Komentar"
                    rows="3"
                    outlined
                    required
                  ></v-textarea>

                  <v-btn
                    :disabled="!valid"
                    color="black"
                    class="mr-4"
                    block
                    large
                    @click="submitForm"
                  >
                    <span class="text-white">Send</span>
                  </v-btn>
                </v-form>
              </v-card>
            </div>
          </div>
        </div>
        <div class="contact__background">
          <v-img :src="getImageURL('/contact__background.png')"></v-img>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    form: {
      fullname: '',
      contactType: '',
      email: '',
      whatsapp: '',
      fortisKnowFrom: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
      comment: '',
    },
    socmed: [
      // {
      //   icon: 'mdi-facebook',
      //   link: '#',
      // },
      {
        icon: 'mdi-youtube',
        link: 'https://www.youtube.com/channel/UC2FJfWhPytQdIaz3wvD4VQg',
      },
      // {
      //   icon: 'mdi-twitter',
      //   link: '#',
      // },
      // {
      //   icon: 'mdi-linkedin',
      //   link: '#',
      // },
      {
        icon: 'mdi-instagram',
        link: 'https://www.instagram.com/fortiswheels/',
      },
    ],
    notification: {
      isOpen: true,
      message: 'Test',
    },
    country: ['Indonesia', 'Other'],
  }),
  methods: {
    getImageURL(filename) {
      const data =
        this.$config.imageURL + this.$config.imagePATH + '/images' + filename
      return data
    },
    async submitForm() {
      this.notification.isOpen = false
      const form = {
        fullname: this.form.fullname,
        contactType: this.form.contactType,
        email: this.form.email,
        fortisKnowFrom: this.form.fortisKnowFrom,
        city: this.form.city,
        province: this.form.province,
        country: this.form.country,
        postalCode: this.form.postalCode,
        comment: this.form.comment,
      }
      const body = {
        From: form.email,
        To: 'malvin@member.id',
        // Cc: 'string',
        // Bcc: 'string',
        Subject: 'Send Email',
        // Tag: 'string',
        HtmlBody: 'Test Email Postmark',
        TextBody: 'Test Send Email',
        // ReplyTo: 'string',
        // TrackOpens: true,
        // TrackLinks: 'None',
        // Headers: [
        //   {
        //     Name: 'string',
        //     Value: 'string',
        //   },
        // ],
        // Attachments: [
        //   {
        //     Name: 'string',
        //     Content: 'string',
        //     ContentType: 'string',
        //     ContentID: 'string',
        //   },
        // ],
      }
      const dataHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': '0649124d-6fe8-4094-9571-40007489dc04',
      }
      const valid = this.$refs.form.validate()

      if (valid) {
        try {
          const sendEmail = await this.$axios.$post(
            this.$config.baseURL + '/api/email',
            body,
            { headers: dataHeaders }
          )
          if (sendEmail) {
            this.notification.isOpen = true
            this.notification.message = 'Thank you, your form has been sent'
          }
          console.log(sendEmail)
        } catch (error) {
          if (!error.response.status) {
            this.notification.isOpen = true
            this.notification.message = error.response.statusText
          }
          console.log(error.response)
        }
      }
    },
  },
}
</script>
<style></style>
