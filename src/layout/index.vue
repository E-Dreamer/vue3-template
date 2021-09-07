<!--
 * @Author: 陈诚
 * @Date: 2021-09-06 09:11:15
 * @LastEditTime: 2021-09-07 11:14:57
 * @LastEditors: 陈诚
 * @Description:
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container"></Sidebar>
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>
<script>
import { Sidebar, Navbar, TagsView, AppMain } from "./components";

import { mapState } from "vuex";
import ResizeMixin from "./mixin/ResizeHandler";
export default {
  name: "Layout",
  components: { Sidebar, Navbar, TagsView, AppMain },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
