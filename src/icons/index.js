/*
 * @Author: 陈诚
 * @Date: 2021-09-06 09:32:46
 * @LastEditTime: 2021-09-07 11:27:17
 * @LastEditors: 陈诚
 * @Description:
 */
const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
