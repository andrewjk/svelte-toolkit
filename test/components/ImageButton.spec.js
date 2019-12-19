import test from 'ava';
import ImageButton from '../../src/components/ImageButton/ImageButton.svelte';

test('imagebutton creation', t => {
    const target = document.createElement('div');
    const app = new ImageButton({
        target,
        props: {
            id: 'imagebutton'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'imagebutton');
});
