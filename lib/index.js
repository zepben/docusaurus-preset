"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = preset;
const path = require("path");
function makePluginConfig(source, options) {
    if (options) {
        return [require.resolve(source), options];
    }
    return require.resolve(source);
}
function preset(context, opts = {}) {
    const { siteConfig } = context;
    const { themeConfig } = siteConfig;
    const { algolia } = themeConfig;
    const isProd = process.env.NODE_ENV === 'production';
    const { debug, docs, blog, pages, sitemap, theme, gtag, ...rest } = opts;
    const themes = [];
    themes.push(makePluginConfig('@docusaurus/theme-classic', theme));
    if (algolia) {
        themes.push(require.resolve('@docusaurus/theme-search-algolia'));
    }
    if ('gtag' in themeConfig) {
        throw new Error('The "gtag" field in themeConfig should now be specified as option for plugin-google-gtag. For preset-classic, simply move themeConfig.gtag to preset options. More information at https://github.com/facebook/docusaurus/pull/5832.');
    }
    if ('googleAnalytics' in themeConfig) {
        throw new Error('The "googleAnalytics" field in themeConfig should now be specified as option for plugin-google-analytics. For preset-classic, simply move themeConfig.googleAnalytics to preset options. More information at https://github.com/facebook/docusaurus/pull/5832.');
    }
    const plugins = [];
    if (docs !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-content-docs', docs));
    }
    if (blog !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-content-blog', blog));
    }
    if (pages !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-content-pages', pages));
    }
    if (debug || (debug === undefined && !isProd)) {
        plugins.push(require.resolve('@docusaurus/plugin-debug'));
    }
    if (gtag) {
        plugins.push(makePluginConfig('@docusaurus/plugin-google-gtag', gtag));
    }
    if (isProd && sitemap !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-sitemap', sitemap));
    }
    if (Object.keys(rest).length > 0) {
        throw new Error(`Unrecognized keys ${Object.keys(rest).join(', ')} found in preset-classic configuration. The allowed keys are debug, docs, blog, pages, sitemap, theme, googleAnalytics, gtag. Check the documentation: https://docusaurus.io/docs/using-presets#docusauruspreset-classic for more information on how to configure individual plugins.`);
    }
    plugins.push(path.resolve(__dirname, "plugins", "custom-loaders"));
    return { themes, plugins };
}
module.exports.defaultThemeConfig = {
    algolia: {
        apiKey: "b5ec32dcc5109c1a14d773fd21604bce",
        indexName: "zepben-docs",
        appId: "3K6D3DR52K",
        contextualSearch: true,
    },
    gtag: {
        trackingID: "G-JG9JB2RSST",
        anonymizeIP: false,
    },
};
//# sourceMappingURL=index.js.map