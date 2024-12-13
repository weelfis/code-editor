import { createApp } from "vue";
import App from "./App.vue";
import { makeServer } from "./mirage";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

import("./assets/main.css");

createApp(App).mount("#app");
