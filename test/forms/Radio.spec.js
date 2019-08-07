import test from 'ava';
import Radio from '../../src/forms/Radio/Radio.svelte';

test('radio creation', t => {
    const target = document.createElement('div');
    const app = new Radio({
        target,
        props: {
            id: 'radio'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'radio');
});
