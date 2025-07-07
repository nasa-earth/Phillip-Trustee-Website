// filepath: frontend/plugins/primevue.js
import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import "primeicons/primeicons.css";

// Import common components
import Button from "primevue/button";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import Chip from "primevue/chip";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Timeline from "primevue/timeline";
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import Breadcrumb from "primevue/breadcrumb";
import PanelMenu from "primevue/panelmenu";
import Editor from "primevue/editor";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Calendar from "primevue/calendar";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import FileUpload from "primevue/fileupload";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true,
  });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.use(ConfirmationService);

  // Register components globally
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("ConfirmDialog", ConfirmDialog);
  nuxtApp.vueApp.component("Chip", Chip);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("Tag", Tag);
  nuxtApp.vueApp.component("Timeline", Timeline);
  nuxtApp.vueApp.component("Card", Card);
  nuxtApp.vueApp.component("Avatar", Avatar);
  nuxtApp.vueApp.component("Breadcrumb", Breadcrumb);
  nuxtApp.vueApp.component("PanelMenu", PanelMenu);
  nuxtApp.vueApp.component("Editor", Editor);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Textarea", Textarea);
  nuxtApp.vueApp.component("Calendar", Calendar);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
  nuxtApp.vueApp.component("Dropdown", Dropdown);
  nuxtApp.vueApp.component("Accordion", Accordion);
  nuxtApp.vueApp.component("AccordionTab", AccordionTab);
  nuxtApp.vueApp.component("FileUpload", FileUpload);
});
