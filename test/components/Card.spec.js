import test from 'ava';
import Card from '../../src/components/Card/Card.svelte';

test('card creation', t => {
    const target = document.createElement('div');
    const app = new Card({
        target,
        props: {
            id: 'card'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'card');
});
