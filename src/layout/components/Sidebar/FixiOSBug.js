import { onMounted, computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";

/*
 * @Author: 陈诚
 * @Date: 2021-09-06 09:22:06
 * @LastEditTime: 2021-09-09 16:07:29
 * @LastEditors: E-Dreamer
 * @Description:
 */
export default {
  setup() {
    const store = useStore();
    const state = reactive({
      device: computed(() => {
        return store.getters.device;
      }),
      fixBugIniOS: () => {
        console.log(this.$refs);
        const $subMenu = this.$refs.subMenu;
        if ($subMenu) {
          const handleMouseleave = $subMenu.handleMouseleave;
          $subMenu.handleMouseleave = (e) => {
            if (this.device === "mobile") {
              return;
            }
            handleMouseleave(e);
          };
        }
      },
    });
    onMounted(() => {
      state.fixBugIniOS();
    });
    return {
      ...toRefs(state),
    };
  },
};
