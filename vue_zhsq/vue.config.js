module.exports = {
    chainWebpack: config => {

        config.module

            .rule('less')

            .oneOf('vue')

            .use('px2rem-loader')

            .loader('px2rem-loader')

            .before('postcss-loader') // this makes it work.

            .options({ remUnit: 192, remPrecision: 8 }) // remUnit: 192代表以1920px为整体，如果设计稿的尺寸是750px，这里的值为75

            .end()

    },
    devServer: {
        proxy: {
            // '/admin': {//代理api
            //     target: "http://192.168.1.248:8096",// 代理接口
            //     changeOrigin: true,//是否跨域
            //     ws: true, // proxy websockets
            //     pathRewrite: {//重写路径
            //         "^/admin": ''//代理路径
            //     }
            // }
        }
    }
}