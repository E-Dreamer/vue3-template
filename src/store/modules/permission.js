/*
 * @Author: 陈诚
 * @Date: 2021-09-07 09:57:47
 * @LastEditTime: 2021-09-07 11:01:57
 * @LastEditors: 陈诚
 * @Description:
 */
const permission = {
  namespaced: true,
  state: {
    routes: [
      {
        parentName: "Layout",
        name: "home",
        path: "/home",
        component: () => import(`@/views/home`),
        meta: {
          title: "首页",
          keepAlive: true,
          icon: "el-icon-menu",
          affix: true,
        },
      },
      {
        parentName: "Layout",
        name: "first",
        path: "/first",
        component: () => import(`@/views/first`),
        meta: {
          title: "第一项",
          icon: "el-icon-menu",
        },
      },
    ],
  },
  mutations: {
    SET_ROUTE: (state, value) => {
      state.routes = value;
    },
  },
  actions: {},
};
export default permission;
