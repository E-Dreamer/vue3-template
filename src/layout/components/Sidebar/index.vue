<!--
 * @Author: 陈诚
 * @Date: 2021-09-06 09:20:23
 * @LastEditTime: 2021-09-07 10:29:31
 * @LastEditors: 陈诚
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
import { defineComponent } from "vue";
import Logo from "./Logo.vue";
import FixiOSBug from "./FixiOSBug";
import { mapGetters } from "vuex";
import SidebarItem from "../Sidebar/sidebarItem.vue";
export default defineComponent({
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    return {
      handleOpen,
      handleClose,
    };
  },
  components: { Logo, SidebarItem },
  computed: {
    ...mapGetters(["sidebar", "routes"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
  },
  mixins: [FixiOSBug],
});
</script>
