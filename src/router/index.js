import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration

import { getPageTitle } from "@/utils/utils";
// import { getToken } from "../utils/auth";

// import { Message } from "@element-plus/icons";
// import store from "@/store";
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// const whiteList = ["/login", "/home", "/first"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // 设置页面的title
  document.title = getPageTitle(to.meta.title);

  next();
  // 判断是否登录
  // const hasToken = getToken();

  // if (hasToken) {
  //   if (to.path === "/login") {
  //     // if is logged in, redirect to the home page
  //     next({ path: "/" });
  //     NProgress.done();
  //   } else {
  //     // determine whether the user has obtained his permission roles through getInfo
  //     const hasRoles = store.getters.roles && store.getters.roles.length > 0;
  //     if (hasRoles) {
  //       next();
  //     } else {
  //       try {
  //         // get user info
  //         // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
  //         const { roles } = await store.dispatch("user/getInfo");

  //         // generate accessible routes map based on roles
  //         const accessRoutes = await store.dispatch(
  //           "permission/generateRoutes",
  //           roles
  //         );

  //         // dynamically add accessible routes
  //         router.addRoutes(accessRoutes);

  //         // hack method to ensure that addRoutes is complete
  //         // set the replace: true, so the navigation will not leave a history record
  //         next({ ...to, replace: true });
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch("user/resetToken");
  //         Message.error(error || "Has Error");
  //         next(`/login?redirect=${to.path}`);
  //         NProgress.done();
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next();
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`);
  //     NProgress.done();
  //   }
  // }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;
