/* eslint-disable import/no-commonjs */
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }),
  )
}
