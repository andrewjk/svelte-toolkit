import test from 'ava';
import CheckBox from '../../src/forms/CheckBox/CheckBox.svelte';

test('checkbox creation', t => {
    const target = document.createElement('div');
    const app = new CheckBox({
        target,
        props: {
            id: 'checkbox'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'checkbox');
});
