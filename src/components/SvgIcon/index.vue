<!--
 * @Author: 陈诚
 * @Date: 2021-09-06 09:14:53
 * @LastEditTime: 2021-09-07 14:54:55
 * @LastEditors: E-Dreamer
 * @Description:
-->
<template>
  <svg :class="svgClass" aria-hidden="true" @click="$emit('click')">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  inheritAttrs: false,
  emits: ["click"],
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
