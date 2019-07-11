import test from 'ava';
import Select from '../../src/forms/Select/Select.svelte';

test('select creation', t => {
    const target = document.createElement('div');
    const app = new Select({
        target,
        props: {
            id: 'select'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'select');
});
