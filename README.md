# docusaurus-preset
Docusaurus preset to include default plugins and themes for Zepben documentation

This preset is responsible for pulling in all docusaurus dependencies for all our docs "repos".

This means that versions should be updated here first, and all `package.json` files referencing
`@zepben/docusaurus-preset` should also be updated with the new version.

Note there is also a docusaurus-components repo that needs to be updated and kept in sync with
this repo.

This repo was essentially forked from [docusaurus-preset-classic](https://github.com/facebook/docusaurus/tree/main/packages/docusaurus-preset-classic), and essentially should have the same code in its index, however with some additions to enable the yaml plugin and some global configuration that is used throughout all the docusaurus sites.

This global configuration is used to avoid repeating config in the docusaurus.config.js files, and notably includes our gtag trackingID (formerly googleAnalytics).
