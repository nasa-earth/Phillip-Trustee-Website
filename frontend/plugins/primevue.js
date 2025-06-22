// filepath: frontend/plugins/primevue.js
import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

// Only import primeicons - we'll handle the theme in nuxt.config.ts
import "primeicons/primeicons.css"; // Icons

// Import common components
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Chip from 'primevue/chip';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Timeline from 'primevue/timeline';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import Breadcrumb from 'primevue/breadcrumb';
import PanelMenu from 'primevue/panelmenu';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true
  });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.use(ConfirmationService);
  
  // Register components globally
  nuxtApp.vueApp.component('Button', Button);
  nuxtApp.vueApp.component('Toast', Toast);
  nuxtApp.vueApp.component('Chip', Chip);
  nuxtApp.vueApp.component('DataTable', DataTable);
  nuxtApp.vueApp.component('Column', Column);
  nuxtApp.vueApp.component('Tag', Tag);
  nuxtApp.vueApp.component('Timeline', Timeline);
  nuxtApp.vueApp.component('Card', Card);
  nuxtApp.vueApp.component('Avatar', Avatar);
  nuxtApp.vueApp.component('Breadcrumb', Breadcrumb);
  nuxtApp.vueApp.component('PanelMenu', PanelMenu);
});
