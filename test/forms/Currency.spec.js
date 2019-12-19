import test from 'ava';
import Currency from '../../src/forms/Currency/Currency.svelte';

test('currency creation', t => {
    const target = document.createElement('div');
    const app = new Currency({
        target,
        props: {
            id: 'currency'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'currency');
});
