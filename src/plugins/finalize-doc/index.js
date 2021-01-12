/*
 * Copyright 2021 Zeppelin Bend Pty Ltd
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const { exec } = require('child_process');
const fs = require("fs");
const fse = require('fs-extra');

module.exports = function () {
    return {
        name: 'finalize-doc-plugin',
        extendCli(cli) {
            cli
                .description("finalize documentation by providing version number")
                .command('finalize-doc <ver>')
                .action(async (version) => {
                    await exec(`npm run docusaurus docs:version ${version}`);
                    fs.stat("./static/spec/next", (err) => {
                        if (!err) {
                            fse.copySync("./static/spec/next", `./static/spec/${version}`);
                        }
                    });
                });
        },
    };
};