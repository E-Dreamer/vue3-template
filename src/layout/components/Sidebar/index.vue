<!--
 * @Author: 陈诚
 * @Date: 2021-09-06 09:20:23
 * @LastEditTime: 2021-09-09 16:17:34
 * @LastEditors: E-Dreamer
 * @Description:
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo :collapse="isCollapse"></Logo>
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="item in routes"
          :key="item.path"
          :item="item"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import variables from "@/styles/variables.scss";
import { computed } from "vue";
import Logo from "./Logo.vue";
import FixiOSBug from "./FixiOSBug";
import { useStore } from "vuex";
import SidebarItem from "../Sidebar/sidebarItem.vue";
import { useRoute } from "vue-router";
export default {
  components: { Logo, SidebarItem },
  mixins: [FixiOSBug],
  setup() {
    const store = useStore();
    const currentRoute = useRoute();
    const sidebar = computed(() => {
      return store.getters.sidebar;
    });
    const routes = computed(() => {
      return store.getters.routes;
    });
    const activeMenu = computed(() => {
      const route = currentRoute;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    const isCollapse = computed(() => {
      return !sidebar.value.opened;
    });
    const showLogo = computed(() => {
      return store.state.settings.sidebarLogo;
    });
    return {
      sidebar,
      routes,
      activeMenu,
      variables,
      isCollapse,
      showLogo,
    };
  },
};
</script>
