const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://serpapi.com/search.json?api_key=2ffbdeece16890cede961a52533c8bddc5038b05b08f8a525a7bf89793907da5&engine=google_jobs&q=software developer',
      changeOrigin: true,
    })
  );
};