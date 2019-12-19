import test from 'ava';
import Page from '../../src/layout/Page/Page.svelte';

test('page creation', t => {
    const target = document.createElement('div');
    const app = new Page({
        target,
        props: {
            id: 'page'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'page');
});
