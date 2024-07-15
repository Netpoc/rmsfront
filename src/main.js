import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import VueApexCharts from "vue3-apexcharts";
import '@mdi/font/css/materialdesignicons.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css';


const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App).use(VueApexCharts).use(vuetify).use(Antd).use(router).mount('#app')
