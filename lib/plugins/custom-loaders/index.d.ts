declare function _exports(context: any, options: any): {
    name: string;
    configureWebpack(config: any, isServer: any): {
        module: {
            rules: {
                test: RegExp;
                use: string;
                type: string;
            }[];
        };
    };
};
export = _exports;
