import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
// amfe-flexible
// import "amfe-flexible/index.js";
sessionStorage.setItem("language", "zh");
var jsSrc = (navigator.language || navigator.browserLanguage).toLowerCase();
console.log(jsSrc);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 中文包
// import zhCn from "element-plus/es/locale/lang/zh-cn";

import "normalize.css/normalize.css";
import "@/styles/index.scss"; // global css

import "./icons"; // icon
import SvgIcon from "@/components/SvgIcon";
const app = createApp(App);
app.component("svg-icon", SvgIcon);
// app.config.globalProperties.$axios = axios;
app.use(ElementPlus, {
  // locale: zhCn,
});
app.use(store).use(router).use(i18n).mount("#app");
