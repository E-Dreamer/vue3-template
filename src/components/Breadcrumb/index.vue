<!--
 * @Author: 陈诚
 * @Date: 2021-09-06 15:26:28
 * @LastEditTime: 2021-09-09 15:53:10
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { reactive, toRefs, watch, onBeforeMount } from "vue";
import pathToRegexp from "path-to-regexp";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Breadcrumb",
  setup() {
    const currentRoute = useRoute();
    const router = useRouter();
    const findHomePath = (routes) => {
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].name === "home") {
          return routes[i];
        } else {
          if (routes[i].children && routes[i].children.length) {
            return findHomePath(routes[i].children);
          }
        }
      }
    };
    const pathCompile = (path) => {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = currentRoute;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    };
    const state = reactive({
      levelList: null,
      getBreadcrumb() {
        // only show routes with meta.title
        let matched = currentRoute.matched.filter(
          (item) => item.meta && item.meta.title
        );
        const first = matched[0];

        const homepath = findHomePath(router.options.routes);
        if (!state.isHome(first)) {
          matched = [homepath].concat(matched);
        }

        state.levelList = matched.filter(
          (item) =>
            item.meta && item.meta.title && item.meta.breadcrumb !== false
        );
      },
      isHome(route) {
        const name = route && route.name;
        if (!name) {
          return false;
        }
        return name.trim().toLocaleLowerCase() === "home".toLocaleLowerCase();
      },
      handleLink(item) {
        const { redirect, path } = item;
        if (redirect) {
          router.push(redirect);
          return;
        }
        router.push(pathCompile(path));
      },
    });
    watch(
      () => currentRoute.path,
      (path) => {
        if (path.startsWith("/redirect/")) {
          return;
        }
        state.getBreadcrumb();
      }
    );
    onBeforeMount(() => {
      state.getBreadcrumb();
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
