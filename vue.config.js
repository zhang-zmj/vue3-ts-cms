// const path = require("path")

module.exports = {
  // outputDir: "./build",
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'ttp://152.136.185.210:4000',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // },
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components"
      }
    }
  }
}
