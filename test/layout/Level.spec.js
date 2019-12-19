import test from 'ava';
import Level from '../../src/layout/Level/Level.svelte';

test('level creation', t => {
    const target = document.createElement('div');
    const app = new Level({
        target,
        props: {
            id: 'level'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'level');
});
