// 为 vercel serve跨域处理
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  let target = "";

  // 代理目标地址
  if (req.url.startsWith("/api")) {
    target = "https://mock.feup.cn/mock/62f0804d0c348726503f88c0";
  }

  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    // pathRewrite: {
    //   // 通过路径重写，去除请求路径中的 `/api`
    //   "^/api/": "/",
    // },
  })(req, res);
};
