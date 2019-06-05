import test from 'ava';
import Button from '../../src/components/Button/Button.svelte';

test('button creation', t => {
    const target = document.createElement('div');
    const app = new Button({
        target,
        props: {
            id: 'button'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'button');
});
