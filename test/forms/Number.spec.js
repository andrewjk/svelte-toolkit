import test from 'ava';
import Number from '../../src/forms/Number/Number.svelte';

test('number creation', t => {
    const target = document.createElement('div');
    const app = new Number({
        target,
        props: {
            id: 'number'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'number');
});
