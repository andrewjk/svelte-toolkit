import test from 'ava';
import Prompt from '../../src/dialogs/Prompt/Prompt.svelte';

test('prompt creation', t => {
    const target = document.createElement('div');
    const app = new Prompt({
        target,
        props: {
            id: 'prompt'
        },
    });

    const background = target.firstChild;
    const el = background.firstChild;
    t.is(el.id, 'prompt');
});
