<!--
 * @Author: 陈诚
 * @Date: 2021-09-06 09:11:15
 * @LastEditTime: 2021-09-09 16:33:04
 * @LastEditors: E-Dreamer
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
import { computed, onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { useStore } from "vuex";
import { Navbar, Sidebar, AppMain, TagsView } from "./components/index";
import resize from "./mixin/ResizeHandler";
export default {
  components: { Navbar, Sidebar, AppMain, TagsView },
  name: "Layout",
  setup() {
    const {
      sidebar,
      device,
      resizeMounted,
      addEventListenerOnResize,
      removeEventListenerResize,
      watchRouter,
    } = resize();
    const store = useStore();
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        mobile: device.value === "mobile",
        withoutAnimation: sidebar.value.withoutAnimation,
      };
    });
    const fixedHeader = computed(() => {
      return store.state.settings.fixedHeader;
    });
    const needTagsView = computed(() => {
      return store.state.settings.tagsView;
    });
    watchRouter;
    const hasTagsView = computed(() => {
      return store.state.settings.hasTagsView;
    });
    function handleClickOutside() {
      store.dispatch("app/closeSideBar");
      store.dispatch("app/toggleAnimation", { withoutAnimation: false });
    }
    onBeforeMount(() => {
      addEventListenerOnResize();
    });
    onMounted(() => {
      resizeMounted();
    });
    onBeforeUnmount(() => {
      removeEventListenerResize();
    });
    return {
      classObj,
      fixedHeader,
      device,
      sidebar,
      handleClickOutside,
      hasTagsView,
      needTagsView,
    };
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
