import test from 'ava';
import DialogButton from '../../src/dialogs/DialogButton/DialogButton.svelte';

test('dialog button creation', t => {
    const target = document.createElement('div');
    const app = new DialogButton({
        target,
        props: {
            id: 'dialogbutton'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'dialogbutton');
});
