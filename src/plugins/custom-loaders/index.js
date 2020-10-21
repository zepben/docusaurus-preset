module.exports = function (context, options) {
    return {
      name: "loaders",
      configureWebpack(config, isServer) {
        return {
          module: {
            rules: [
              {
                test: /\.ya?ml$/,
                use: "yaml-loader",
                type: "json",
              },
            ],
          },
        };
      },
    };
  };