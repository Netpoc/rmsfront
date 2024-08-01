<template>
  <v-container fluid>
    <v-row>
      <v-col md="8">
        <a-carousel class="d-none d-md-block" autoplay>
          <v-card color="transparent" min-height="100vh">
            <v-card-text>
              <v-sheet class="centered-box flex-column">
                <span class="text-h2 text-light-green-accent-4">Transform Your Energy Management</span>
                <span class="ma-2 text-h5">Real-time Monitoring for Optimal Performance</span>
                <span>Experience seamless control over your energy consumption with our
                  advanced Remote Monitoring System (RMS). Track diesel levels, monitor
                  generator efficiency, and ensure uninterrupted power supply—all from
                  a single, intuitive dashboard.</span>
                <v-btn class="ma-3">Get Started</v-btn>
              </v-sheet>
            </v-card-text>
          </v-card>
          <v-card color="transparent" min-height="100vh">
            <v-card-text>
              <v-sheet color="#92D050" class="centered-box flex-column">
                <span class="text-h2 text-indigo-darken-4">Optimize Your Fuel Usage</span>
                <span class="ma-2 text-h5">Cut Costs and Increase Efficiency</span>
                <span>With our RMS, you can precisely monitor diesel consumption, detect
                  anomalies, and prevent fuel theft. Our solution ensures that you get
                  the most out of every drop of fuel, saving costs and enhancing operational efficiency.</span>
                <v-btn class="ma-3">Learn More</v-btn>
              </v-sheet>
            </v-card-text>
          </v-card>
          <v-card color="transparent" min-height="100vh">
            <v-card-text>
              <v-sheet class="centered-box flex-column">
                <span class="text-h2 text-light-green-accent-4">Total Control, Anywhere, Anytime</span>
                <span class="ma-2 text-h5">Remote Access to Critical Data</span>
                <span>Stay connected to your power infrastructure with real-time data
                  accessible from any location. Our RMS app provides comprehensive
                  insights and alerts, allowing you to make informed decisions and
                  maintain peak performance at all times.</span>
                <v-btn class="ma-3">Discover More</v-btn>
              </v-sheet>
            </v-card-text>
          </v-card>
        </a-carousel>
      </v-col>
      <v-col md="4" cols="12">
        <v-sheet color="#92D050" class="pa-5 rounded-xl fill-height">
          <v-card color="#0E0856" class="pa-2 rounded-xl">
            <v-card-title>
              Login
            </v-card-title>
            <v-card-text color="transparent">


              <v-form ref="form">
                <v-text-field v-model="username" :counter="10" :rules="nameRules" label="Username"
                  required></v-text-field>

                <v-text-field v-model="password" :counter="10" :rules="nameRules" label="Password"
                  required></v-text-field>

                <v-alert color="error" v-if="loginError">Invalid Username or Password!</v-alert>
                <div class="d-flex flex-column">
                  <v-btn class="mt-2" color="success" block @click="loginClick()">
                    Login
                  </v-btn>

                  <v-btn class="mt-4" color="error" block @click="reset">
                    Clear
                  </v-btn>
                </div>
              </v-form>
              <!-- Loader Dialog-->
              <v-dialog v-model="loginLoader" max-width="320" persistent>
                <v-list class="py-2" color="primary" elevation="12" rounded="lg">
                  <v-list-item prepend-icon="$vuetify-outline" title="Loading RMS Application...">
                    <template v-slot:prepend>
                      <div class="pe-4">
                        <v-img max-height="100" :src="require('../assets/volt_icon.png')"></v-img>
                      </div>
                    </template>

                    <template v-slot:append>
                      <v-progress-circular color="success" indeterminate="disable-shrink" size="42"
                        width="4"></v-progress-circular>
                    </template>
                  </v-list-item>
                </v-list>
              </v-dialog>

            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import router from '@/router';

export default {
  data: () => ({
    dialog: false,
    loginLoader: false,
    loginError: false,
    name: '',
    username: '',
    password: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
  }),

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) alert('Form is valid')
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    loginClick() {
      if (this.username === 'admin' && this.password==='password') {
        this.loginLoader = true;
        setTimeout(() => (this.$router.push('/dashboard')), 4000)
      } else {
        this.loginError = true
      }

    }

  },
}
</script>
<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 85vh;
  line-height: 160px;
  background: #0E0856;
  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: #fff;
}

.centered-box {
  display: flex;
  justify-content: center;
  /* Centers the child div horizontally */
  align-items: center;
  /* Centers the child div vertically */
  height: 80vh;
  /* Full height of the viewport */
  border: none
}

.left-aligned-text {
  text-align: left;
  /* Aligns text to the left */
  border: none;
  /* Optional: To visualize the text box */
  padding: 20px;
}
</style>