import test from 'ava';
import Confirm from '../../src/dialogs/Confirm/Confirm.svelte';

test('confirm creation', t => {
    const target = document.createElement('div');
    const app = new Confirm({
        target,
        props: {
            id: 'confirm'
        },
    });

    const background = target.firstChild;
    const el = background.firstChild;
    t.is(el.id, 'confirm');
});
