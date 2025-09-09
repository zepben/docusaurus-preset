/**
 * Copyright (c) Zeppelin Bend Pty ltd. 
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Originally taken from Docusaurus documentaion at https://docusaurus.io/docs/api/plugin-methods
 */
export default async function docsSymlink(context, opts) {
  return {
    name: "docs-symlink",
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          symlinks: false
        }
      };
    }
  };
};
