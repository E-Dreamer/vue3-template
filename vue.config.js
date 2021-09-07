/*
 * @Author: 陈诚
 * @Date: 2021-07-28 14:07:18
 * @LastEditTime: 2021-09-06 16:29:51
 * @LastEditors: 陈诚
 * @Description:
 */
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const config = require("./src/config");
const CompressionPlugin = require("compression-webpack-plugin");
// const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
module.exports = {
  publicPath: "./",
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       autoprefixer: {
  //         browsers: ["Android >= 4.0", "iOS >=7"],
  //       },
  //       plugins: [
  //         require("postcss-pxtorem")({
  //           // 把px单位换算成rem单位
  //           rootValue: 75, // 换算的基数(设计图750的根字体为75)
  //           // selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
  //           propList: ["*"],
  //         }),
  //       ],
  //     },
  //   },
  // },
  chainWebpack(config) {
    if (process.env.NODE.ENV === "production") {
      console.log(config);
      // config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
    }
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    config.plugin("html").tap((args) => {
      args[0].title = "你想设置的title名字";
      return args;
    });

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-plus(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },
  configureWebpack: (config) => {
    console.log(config);
    return {
      resolve: {
        alias: {
          "@": resolve("src"),
        },
      },
      plugins: [
        new CompressionPlugin({
          algorithm: "gzip",
          test: /\.(js|css)$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8, // 压缩比
        }),
      ],
    };
  },
  devServer: {
    proxy: {
      "/": {
        target: config.proxyURL, // 目标地址
        ws: false, // / / 是否启用websockets
        changeOrigin: false, // 开启代理
        pathRewrite: { "^": "/" }, // 这里重写路径
      },
    },
  },
};
