<!--
 * @Author: E-Dreamer
 * @Date: 2021-09-06 09:21:52
 * @LastEditTime: 2021-09-09 15:45:48
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div class="navbar">
    <Hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <div class="right-menu-item hover-effect">
          <el-tooltip content="Global Size" effect="dark" placement="bottom">
            <size-select id="size-select" />
          </el-tooltip>
        </div>

        <div class="right-menu-item hover-effect">
          <el-dropdown trigger="click">
            <div>
              <svg-icon
                class-name="international-icon"
                icon-class="international"
              />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <router-link to="/profile/index">
                  <el-dropdown-item>Profile</el-dropdown-item>
                </router-link>
                <router-link to="/">
                  <el-dropdown-item>Dashboard</el-dropdown-item>
                </router-link>
                <el-dropdown-item divided @click="logout">
                  <span style="display: block">Log Out</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>

      <el-dropdown
        trigger="click"
        class="avatar-container right-menu-item hover-effect"
      >
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <el-icon>
            <caret-bottom />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/profile/index">
              <el-dropdown-item>Profile</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import { CaretBottom } from "@element-plus/icons";
import { toRefs, reactive, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Navbar",
  components: { Hamburger, Breadcrumb, Screenfull, SizeSelect, CaretBottom },
  setup() {
    const store = useStore();
    const state = reactive({
      sidebar: computed(() => {
        return store.getters.sidebar;
      }),
      avatar: computed(() => {
        return store.getters.avatar;
      }),
      device: computed(() => {
        return store.getters.device;
      }),
      toggleSideBar: () => {
        store.dispatch("app/toggleSideBar");
      },
      logout: () => {
        console.log("退出登录");
      },
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
