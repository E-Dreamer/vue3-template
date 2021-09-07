/*
 * @Author: 陈诚
 * @Date: 2021-09-06 09:20:05
 * @LastEditTime: 2021-09-06 11:33:34
 * @LastEditors: 陈诚
 * @Description:
 */
import store from "@/store";

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) {
      console.log(route);
      if (this.device === "mobile" && this.sidebar.opened) {
        store.dispatch("app/closeSideBar", { withoutAnimation: false });
      }
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      store.dispatch("app/toggleDevice", "mobile");
      store.dispatch("app/closeSideBar", { withoutAnimation: true });
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    $_resizeHandler() {
      // document.hidden 页面是否隐藏
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        store.dispatch("app/toggleDevice", isMobile ? "mobile" : "desktop");

        if (isMobile) {
          store.dispatch("app/closeSideBar", { withoutAnimation: true });
        }
      }
    },
  },
};
