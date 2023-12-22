const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/news",
    createProxyMiddleware({
      target: "https://final-project-group-o.cyclic.app",
      changeOrigin: true,
    })
  );


  app.use(
    "/nutrition",
    createProxyMiddleware({
      target: "https://final-project-group-o.cyclic.app",
      changeOrigin: true,
    })
  );
};
