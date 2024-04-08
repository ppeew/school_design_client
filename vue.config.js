module.exports = {
    // devServer:{
    //     proxy:{
    //         '/api/v1':{
    //             target:"http://localhost:8000/",
    //             // target:"http://139.159.234.134:8099/",
    //             port: 8080,
    //         },
    //     }
    // },
    configureWebpack: {
        resolve: {
            alias: {
                'components': '@/components',
                'content': 'components/content',
                'common': 'components/common',
                'assets': '@/assets',
                'network': '@/network',
                'views': '@/views',
                'api':"@/api"
            }
        },
        externals: {
            'AMap': 'AMap' // 高德地图配置
        }
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'link-color': 'rgba(0,0,0,0.65)',
                    'border-radius-base': '2px',
                },
                javascriptEnabled: true,
            },
        },
    },

}
