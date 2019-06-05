import test from 'ava';
import Info from '../../src/dialogs/Info/Info.svelte';

test('info creation', t => {
    const target = document.createElement('div');
    const app = new Info({
        target,
        props: {
            id: 'info'
        },
    });

    const background = target.firstChild;
    const el = background.firstChild;
    t.is(el.id, 'info');
});
