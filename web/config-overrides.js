const rewireLess = require('react-app-rewire-less');
const rewireSvgReactLoader = require('react-app-rewire-svg-react-loader');

module.exports = {
    webpack(config, env) {
        config = rewireLess(config, env);
        config = rewireSvgReactLoader(config, env);
        return config;
    },
    jest(config) {
        return config;
    },
    devServer(configFunction) {
        return (proxy, allowedHost) => {
            const config = configFunction(proxy, allowedHost);
            config.proxy = {
                "/api/": {
                    target: "http://127.0.0.1:7001/",
                    // target: "https://service.qiliao.tech/",
                    secure: false,
                    changeOrigin: true,
                    pathRewrite: {"^/api/": ""}

                }
            };
            return config;
        };
    }
};