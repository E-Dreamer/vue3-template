<!--
 * @Author: 陈诚
 * @Date: 2021-09-06 17:29:21
 * @LastEditTime: 2021-09-09 17:04:20
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        Close
      </li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";
import path from "path";
import {
  reactive,
  toRefs,
  computed,
  onMounted,
  watch,
  nextTick,
  getCurrentInstance,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  components: { ScrollPane },

  setup() {
    const store = useStore();
    const currentRoute = useRoute();
    const router = useRouter();
    const In = getCurrentInstance();
    const visitedViews = computed(() => {
      return store.state.tagsView.visitedViews;
    });
    const routes = computed(() => {
      return store.state.permission.routes;
    });
    const state = reactive({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      isActive(route) {
        return route.path === currentRoute.path;
      },
      isAffix(tag) {
        return tag.meta && tag.meta.affix;
      },
      filterAffixTags(routes, basePath = "/") {
        let tags = [];
        routes.forEach((route) => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path);
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta },
            });
          }
          if (route.children) {
            const tempTags = state.filterAffixTags(route.children, route.path);
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags];
            }
          }
        });
        return tags;
      },
      initTags() {
        const affixTags = (state.affixTags = state.filterAffixTags(
          routes.value
        ));
        for (const tag of affixTags) {
          // Must have tag name
          if (tag.name) {
            store.dispatch("tagsView/addVisitedView", tag);
          }
        }
      },
      addTags() {
        const { name } = currentRoute;
        if (name) {
          store.dispatch("tagsView/addView", currentRoute);
        }
        return false;
      },
      moveToCurrentTag() {
        const tags = In.refs.tag;
        nextTick(() => {
          if (tags.to.path === currentRoute.path) {
            In.refs.scrollPane.moveToTarget(tags);
            // when query is different then update
            if (tags.to.fullPath !== currentRoute.fullPath) {
              store.dispatch("tagsView/updateVisitedView", currentRoute);
            }
          }
        });
      },
      refreshSelectedTag(view) {
        store.dispatch("tagsView/delCachedView", view).then(() => {
          const { fullPath } = view;
          nextTick(() => {
            router.replace({
              path: "/redirect" + fullPath,
            });
          });
        });
      },
      closeSelectedTag(view) {
        store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
          if (state.isActive(view)) {
            state.toLastView(visitedViews, view);
          }
        });
      },
      closeOthersTags() {
        router.push(state.selectedTag);
        store
          .dispatch("tagsView/delOthersViews", state.selectedTag)
          .then(() => {
            state.moveToCurrentTag();
          });
      },
      closeAllTags(view) {
        store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
          if (state.affixTags.some((tag) => tag.path === view.path)) {
            return;
          }
          state.toLastView(visitedViews, view);
        });
      },
      toLastView(visitedViews, view) {
        const latestView = visitedViews.slice(-1)[0];
        if (latestView) {
          router.push(latestView.fullPath);
        } else {
          // now the default is to redirect to the home page if there is no tags-view,
          // you can adjust it according to your needs.
          if (view.name === "Dashboard") {
            // to reload home page
            router.replace({ path: "/redirect" + view.fullPath });
          } else {
            router.push("/");
          }
        }
      },
      openMenu(tag, e) {
        const menuMinWidth = 105;
        const offsetLeft = In.vnode.el.getBoundingClientRect().left; // container margin left
        const offsetWidth = In.vnode.el.offsetWidth; // container width
        const maxLeft = offsetWidth - menuMinWidth; // left boundary
        const left = e.clientX - offsetLeft + 15; // 15: margin right

        if (left > maxLeft) {
          state.left = maxLeft;
        } else {
          state.left = left;
        }

        state.top = e.clientY;
        state.visible = true;
        state.selectedTag = tag;
      },
      closeMenu() {
        state.visible = false;
      },
      handleScroll() {
        state.closeMenu();
      },
    });

    watch(() => {
      currentRoute.name,
        () => {
          state.addTags();
          state.moveToCurrentTag();
        };
    });
    watch(() => {
      state.visible,
        (value) => {
          if (value) {
            document.body.addEventListener("click", this.closeMenu);
          } else {
            document.body.removeEventListener("click", this.closeMenu);
          }
        };
    });
    onMounted(() => {
      state.initTags();
      state.addTags();
    });
    return {
      ...toRefs(state),
      visitedViews,
      routes,
    };
  },
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
