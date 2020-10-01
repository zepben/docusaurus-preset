module.exports = function preset(context, opts = {}) {
  const { siteConfig = {} } = context;
  const { themeConfig } = siteConfig;
  const { algolia, googleAnalytics } = themeConfig;
  const isProd = process.env.NODE_ENV === "production";

  const debug =
    typeof opts.debug !== "undefined" ? Boolean(opts.debug) : !isProd;

  return {
    themes: [
      [require.resolve("@docusaurus/theme-classic"), opts.theme],
      algolia && require.resolve("@docusaurus/theme-search-algolia"),
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
      isProd &&
        googleAnalytics &&
        require.resolve("@docusaurus/plugin-google-analytics"),
      debug && require.resolve("@docusaurus/plugin-debug"),
      isProd &&
        opts.sitemap !== false && [
          require.resolve("@docusaurus/plugin-sitemap"),
          opts.sitemap,
        ],
    ],
  };
};
