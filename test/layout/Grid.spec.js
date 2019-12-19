import test from 'ava';
import Grid from '../../src/layout/Grid/Grid.svelte';

test('grid creation', t => {
    const target = document.createElement('div');
    const app = new Grid({
        target,
        props: {
            id: 'grid'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'grid');
});
