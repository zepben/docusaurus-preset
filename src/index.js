const path = require("path");

module.exports = function preset(context, opts = {}) {
  const isProd = process.env.NODE_ENV === "production";

  const debug =
    typeof opts.debug !== "undefined" ? Boolean(opts.debug) : !isProd;

  return {
    themes: [
      [require.resolve("@docusaurus/theme-classic"), opts.theme],
      require.resolve("@docusaurus/theme-search-algolia"),
    ],
    plugins: [
      opts.docs !== false && [
        require.resolve("@docusaurus/plugin-content-docs"),
        opts.docs,
      ],
      opts.blog !== false && [
        require.resolve("@docusaurus/plugin-content-blog"),
        opts.blog,
      ],
      opts.pages !== false && [
        require.resolve("@docusaurus/plugin-content-pages"),
        opts.pages,
      ],
      isProd && require.resolve("@docusaurus/plugin-google-gtag"),
      debug && require.resolve("@docusaurus/plugin-debug"),
      isProd &&
        opts.sitemap !== false && [
          require.resolve("@docusaurus/plugin-sitemap"),
          opts.sitemap,
        ],
      path.resolve(__dirname, "plugins", "custom-loaders"),
      path.resolve(__dirname, "plugins", "finalize-doc")
  ]};
};

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
