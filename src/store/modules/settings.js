/*
 * @Author: 陈诚
 * @Date: 2021-09-06 10:44:17
 * @LastEditTime: 2021-09-06 16:47:28
 * @LastEditors: 陈诚
 * @Description:
 */
import defaultSettings from "@/setting";

const { showSettings, tagsView, fixedHeader, sidebarLogo, title, Logo } =
  defaultSettings;

const settings = {
  namespaced: true,
  state: {
    logoTitle: title,
    locale: "zhCn",
    logoImg: Logo,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = value;
      }
    },
  },
  actions: {
    changeSetting({ commit }, data) {
      commit("CHANGE_SETTING", data);
    },
  },
};

export default settings;
