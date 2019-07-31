import test from 'ava';
import TextArea from '../../src/forms/TextArea/TextArea.svelte';

test('textarea creation', t => {
    const target = document.createElement('div');
    const app = new TextArea({
        target,
        props: {
            id: 'textarea'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'textarea');
});
