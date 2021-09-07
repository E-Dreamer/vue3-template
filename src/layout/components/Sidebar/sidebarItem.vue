<!--
 * @Author: 陈诚
 * @Date: 2021-09-06 17:17:18
 * @LastEditTime: 2021-09-07 11:02:34
 * @LastEditors: 陈诚
 * @Description: 
-->
<template>
  <div>
    <template v-if="!item.children">
      <router-link :to="{ path: `${item.path}` }">
        <el-menu-item :index="item.path">
          <i :class="item.meta.icon"></i>
          <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
      </router-link>
    </template>
    <el-sub-menu v-else>
      <template #title>
        <i :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="item in item.children"
        :key="item.path"
        :item="item"
      ></sidebar-item>
    </el-sub-menu>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
      required: true,
    },
  },
  setup() {},
};
</script>
