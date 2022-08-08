const { defineConfig } = require("@vue/cli-service");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  runtimeCompiler: true,
  publicPath: "/",
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: false,

  devServer: {
    // port: 8088,
    // open: true,
    // 本地 Easymock
    proxy: {
      "/api": {
        target: "https://mock.feup.cn/mock/62f0804d0c348726503f88c0",
        ws: true,
        changeOrigin: true,
      },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    devtool: "source-map",
  },

  chainWebpack(config) {
    // svg设置
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

    if (process.env.NODE_ENV === "production") {
      if (process.env.npm_config_report) {
        config
          .plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
          .end();
      }
    } else {
    }
  },

});

