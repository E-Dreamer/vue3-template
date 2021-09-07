/*
 * @Author: 陈诚
 * @Date: 2021-09-06 09:18:17
 * @LastEditTime: 2021-09-06 09:18:17
 * @LastEditors: 陈诚
 * @Description:
 */
import { createI18n } from "vue-i18n";
import zh from "./zh";
import en from "./en";
const messages = {
  zh,
  en,
};
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: sessionStorage.getItem("language") || "zh",
  messages,
});

export default i18n;
