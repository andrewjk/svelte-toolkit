import test from 'ava';
import Slider from '../../src/components/Slider/Slider.svelte';

test('slider creation', t => {
    const target = document.createElement('div');
    const app = new Slider({
        target,
        props: {
            id: 'slider'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'slider');
});
