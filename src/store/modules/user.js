/*
 * @Author: 陈诚
 * @Date: 2021-09-06 15:43:27
 * @LastEditTime: 2021-09-06 15:47:03
 * @LastEditors: 陈诚
 * @Description:
 */
const user = {
  namespaced: true,
  state: {
    name: "admin",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
  },
};
export default user;
