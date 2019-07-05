import test from 'ava';
import ColorPicker from '../../src/components/ColorPicker/ColorPicker.svelte';

test('colorpicker creation', t => {
    const target = document.createElement('div');
    const app = new ColorPicker({
        target,
        props: {
            id: 'colorpicker'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'colorpicker');
});
