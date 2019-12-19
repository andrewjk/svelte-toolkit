import test from 'ava';
import Panel from '../../src/layout/Panel/Panel.svelte';

test('panel creation', t => {
    const target = document.createElement('div');
    const app = new Panel({
        target,
        props: {
            id: 'panel'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'panel');
});
