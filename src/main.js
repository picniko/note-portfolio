import { createApp } from "vue";
import App from "./App.vue";
import mdiVue from "mdi-vue/v3";
// import only used icons
import {
  mdiReceiptTextPlus,
  mdiPencil,
  mdiDotsGrid,
  mdiCancel,
  mdiGithub,
  mdiNotePlusOutline,
  mdiDeleteSweepOutline,
  mdiFormatListBulleted,
  mdiContentSaveCheckOutline,
} from "@mdi/js";

createApp(App)
  .use(mdiVue, {
    icons: {
      mdiNotePlusOutline,
      mdiReceiptTextPlus,
      mdiPencil,
      mdiCancel,
      mdiGithub,
      mdiDotsGrid,
      mdiFormatListBulleted,
      mdiDeleteSweepOutline,
      mdiContentSaveCheckOutline,
    },
  })
  .mount("#app");
