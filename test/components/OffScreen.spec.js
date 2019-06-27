import test from 'ava';
import OffScreen from '../../src/components/OffScreen/OffScreen.svelte';

test('offscreen creation', t => {
    const target = document.createElement('div');
    const app = new OffScreen({
        target,
        props: {
            id: 'offscreen',
            visible: true
        },
    });

    const background = target.firstChild
    const el = background.firstChild

    t.is(el.id, 'offscreen');
});
