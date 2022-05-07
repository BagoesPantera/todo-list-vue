import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// https://stackoverflow.com/a/53389528/13079820
import "bootstrap";
import "../node_modules/bootswatch/dist/lux/bootstrap.min.css";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App);
app.use(router);
app.use(VueSweetalert2);
app.mount("#app");
