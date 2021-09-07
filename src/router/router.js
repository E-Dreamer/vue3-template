/*
 * @Author: 陈诚
 * @Date: 2021-09-06 09:10:39
 * @LastEditTime: 2021-09-07 11:07:55
 * @LastEditors: 陈诚
 * @Description:
 */
import Layout from "@/layout";
import store from "@/store";
// 这段需要放在最后面
// 匹配所有
const nofound = {
  path: "/:pathMatch(.*)",
  name: "NoFound",
  component: () => import("@/components/404"),
};
const routes = [
  {
    path: "/",
    component: Layout,
    name: "Layout",
    redirect: "/home",
    children: [
      // {
      //   path: "/:path(.*)",
      //   component: () => import("@/views/redirect/index"),
      // },
      // {
      //   path: "/home",
      //   component: () => import("@/views/home"),
      //   keepAlive: true,
      //   name: "home",
      //   meta: {
      //     title: "首页",
      //   },
      // },
      // {
      //   path: "/first",
      //   component: () => import("@/views/first"),
      //   meta: {
      //     title: "第一项",
      //   },
      // },
    ],
  },
  nofound,
];

store.getters.routes.forEach((item) => {
  routes[0].children.push(item);
});
export default routes;
