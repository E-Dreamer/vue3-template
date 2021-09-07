<!--
 * @Author: 陈诚
 * @Date: 2021-09-06 17:07:18
 * @LastEditTime: 2021-09-07 11:16:54
 * @LastEditors: 陈诚
 * @Description: 
-->
<template>
  <div>首页没有显示呢</div>
</template>
<script>
export default {
  name: "home",
  setup() {},
  created() {
    console.log("缓存的页面 应该只加载一次");
  },
};
</script>
