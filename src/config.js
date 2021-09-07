/*
 * @Author: 陈诚
 * @Date: 2021-07-28 14:03:51
 * @LastEditTime: 2021-09-06 14:39:42
 * @LastEditors: 陈诚
 * @Description:
 */
let env = "";
if (process.NODE_ENV === "development") {
  env = "dev"; // 本地开发
} else if (process.VUE_APP_CURRENTMODE === "development") {
  env = "dev";
} else if (process.VUE_APP_CURRENTMODE === "test") {
  env = "test";
} else if (process.VUE_APP_CURRENTMODE === "production") {
  env = "production";
}

// axios基准地址
const baseURL = {
  dev: "http://www.dev.com",
  test: "http://www.test.com",
  production: "http://www.production.com",
};

const proxyURL = {
  dev: "http://www.dev.com",
  test: "http://www.test.com",
  production: "http://www.production.com",
};

const config = {
  env,
  baseURL: baseURL[env],
  proxyURL: proxyURL[env],
};

// export default config;
module.exports = config;
