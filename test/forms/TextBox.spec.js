import test from 'ava';
import TextBox from '../../src/forms/TextBox/TextBox.svelte';

test('textbox creation', t => {
    const target = document.createElement('div');
    const app = new TextBox({
        target,
        props: {
            id: 'textbox'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'textbox');
});
