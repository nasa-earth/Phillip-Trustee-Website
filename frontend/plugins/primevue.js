// filepath: frontend/plugins/primevue.js
import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
// Example: frontend/plugins/primevue.js
// import 'primevue/resources/themes/lara-light-blue/theme.css'
// import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue)
})