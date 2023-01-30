import { createApp } from "vue";
import App from "./App.vue";
import mdiVue from "mdi-vue/v3";
// import only used icons
import {
  mdiReceiptTextPlus,
  mdiPencil,
  mdiCancel,
  mdiDeleteSweepOutline,
  mdiContentSaveCheckOutline,
} from "@mdi/js";

createApp(App)
  .use(mdiVue, {
    icons: {
      mdiReceiptTextPlus,
      mdiPencil,
      mdiCancel,
      mdiDeleteSweepOutline,
      mdiContentSaveCheckOutline,
    },
  })
  .mount("#app");
