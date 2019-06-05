import test from 'ava';
import Field from '../../src/forms/Field/Field.svelte';

test('field creation', t => {
    const target = document.createElement('div');
    const app = new Field({
        target,
        props: {
            id: 'field'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'field');
});
