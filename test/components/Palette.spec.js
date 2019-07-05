import test from 'ava';
import Palette from '../../src/components/Palette/Palette.svelte';

test('palette creation', t => {
    const target = document.createElement('div');
    const app = new Palette({
        target,
        props: {
            id: 'palette'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'palette');
});
