/*
 * @Author: 陈诚
 * @Date: 2021-09-06 16:37:35
 * @LastEditTime: 2021-09-07 10:38:22
 * @LastEditors: 陈诚
 * @Description:
 */

import defaultSettings from "@/setting";

const title = defaultSettings.title;

export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
