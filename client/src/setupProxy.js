const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google", "/auth/signup", "/auth/login"],
    createProxyMiddleware({
      target: "http://localhost:5001",
    })
  );
};