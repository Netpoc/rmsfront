<template>
  <v-container fluid>
    <v-row>
      <v-col md="8">
        <a-carousel class="d-none d-md-block" autoplay>
          <div>
            Money!
          </div>
          <div>
            <h3>Energy Management Ad</h3>
          </div>
          <div>
            <h3>Earthing Protection Ad</h3>
          </div>
          <div>
            <h3>Energy Audit Ad</h3>
          </div>
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

                <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Remember me?"
                  required></v-checkbox>

                <div class="d-flex flex-column">
                  <v-btn
                  :disabled="dialog" 
                  class="mt-4" 
                  color="success" 
                  block 
                  to="dashboard">
                    Login
                  </v-btn>

                  <v-btn class="mt-4" color="error" block @click="reset">
                    Clear
                  </v-btn>
                </div>
              </v-form>
              <!-- Loader Dialog-->
              <v-dialog v-model="dialog" max-width="320" persistent>
                <v-list class="py-2" color="primary" elevation="12" rounded="lg">
                  <v-list-item prepend-icon="$vuetify-outline" title="Loading RMS Application...">
                    <template v-slot:prepend>
                      <div class="pe-4">
                        <v-icon color="primary" size="x-large"></v-icon>
                      </div>
                    </template>

                    <template v-slot:append>
                      <v-progress-circular color="primary" indeterminate="disable-shrink" size="16"
                        width="2"></v-progress-circular>
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
import router from '@/router';

export default {
  data: () => ({
    dialog: false,
    name: '',
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
</style>