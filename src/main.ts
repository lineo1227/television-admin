import app from "@/stores";
import router from "./router";
import "@/assets/style/style.css";
import "animate.css";
import "@/utils/rem.ts";
app.use(router);
app.mount("#app");
