/**
 * Copyright (c) Zeppelin Bend Pty ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Originally taken from Facebook Docusaurus at https://github.com/facebook/docusaurus/blob/v2.0.1/packages/docusaurus-preset-classic/src/index.ts
 */
import type {
  Preset,
  LoadContext,
  PluginConfig,
  PluginOptions,
} from '@docusaurus/types';
import type {Options, ThemeConfig} from './options';

const path = require("path");

function makePluginConfig(
  source: string,
  options?: PluginOptions,
): string | [string, PluginOptions] {
  if (options) {
    return [require.resolve(source), options];
  }
  return require.resolve(source);
}

export default function preset(
  context: LoadContext,
  opts: Options = {},
): Preset {
  const {siteConfig} = context;
  const {themeConfig} = siteConfig;
  const {algolia} = themeConfig as Partial<ThemeConfig>;
  const isProd = process.env.NODE_ENV === 'production';
  const {
    debug,
    docs,
    blog,
    pages,
    sitemap,
    theme,
    gtag,
    ...rest
  } = opts;

  const themes: PluginConfig[] = [];
  themes.push(makePluginConfig('@docusaurus/theme-classic', theme));
  if (algolia) {
    themes.push(require.resolve('@docusaurus/theme-search-algolia'));
  }
  if ('gtag' in themeConfig) {
    throw new Error(
      'The "gtag" field in themeConfig should now be specified as option for plugin-google-gtag. For preset-classic, simply move themeConfig.gtag to preset options. More information at https://github.com/facebook/docusaurus/pull/5832.',
    );
  }
  if ('googleAnalytics' in themeConfig) {
    throw new Error(
      'The "googleAnalytics" field in themeConfig should now be specified as option for plugin-google-analytics. For preset-classic, simply move themeConfig.googleAnalytics to preset options. More information at https://github.com/facebook/docusaurus/pull/5832.',
    );
  }

  const plugins: PluginConfig[] = [];
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
    throw new Error(
      `Unrecognized keys ${Object.keys(rest).join(
        ', ',
      )} found in preset-classic configuration. The allowed keys are debug, docs, blog, pages, sitemap, theme, googleAnalytics, gtag. Check the documentation: https://docusaurus.io/docs/using-presets#docusauruspreset-classic for more information on how to configure individual plugins.`,
    );
  }

  plugins.push(path.resolve(__dirname, "plugins", "custom-loaders"));
  return {themes, plugins};
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
