// Setup browser environment
require('raf').polyfill()
require('browser-env')();

import hooks from 'require-extension-hooks';
import { compile } from 'svelte/compiler';

// Setup svelte files to be processed by `require-extension-hooks-svelte`
hooks('svelte').push(({ content, filename }) => {
    const result = compile(content, {
        filename,
        dev: true,
        css: false,
    });
    return {
        filename,
        content: result.js.code,
        sourceMap: result.js.map,
    };
});

// Setup svelte and js files to be processed by `require-extension-hooks-babel`
hooks(['svelte', 'js']).exclude(({ filename }) => filename.match(/\/node_modules\//)).plugin('babel').push();
