<template>
  <v-container fluid>
    <v-row>
    <v-col class="fill-height" md="8">
      <a-carousel autoplay>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </a-carousel>
    </v-col>
    <v-col md="4">
      <v-card>
        <v-card-title>
          Login
        </v-card-title>
        <v-card-text>
          <v-sheet class="mx-auto">

            <v-form ref="form">
              <v-text-field v-model="username" :counter="10" :rules="nameRules" label="Username" required></v-text-field>

              <v-text-field v-model="password" :counter="10" :rules="nameRules" label="Password" required></v-text-field>

              <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Remember me?"
                required></v-checkbox>

              <div class="d-flex flex-column">
                <v-btn class="mt-4" color="success" block to="dashboard">
                  Login
                </v-btn>

                <v-btn class="mt-4" color="error" block @click="reset">
                  Clear
                </v-btn>
              </div>
            </v-form>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
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
      async validate () {
        const { valid } = await this.$refs.form.validate()

        if (valid) alert('Form is valid')
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
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
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>