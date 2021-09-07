/*
 * @Author: 陈诚
 * @Date: 2021-09-06 10:30:05
 * @LastEditTime: 2021-09-07 11:05:06
 * @LastEditors: 陈诚
 * @Description:
 */
const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  routes: (state) => state.permission.routes,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
};
export default getters;
