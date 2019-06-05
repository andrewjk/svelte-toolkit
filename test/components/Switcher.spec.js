import test from 'ava';
import Switcher from '../../src/components/Switcher/Switcher.svelte';
import SwitcherItem from '../../src/components/Switcher/SwitcherItem.svelte';

test('switcher creation', t => {
    const target = document.createElement('div');
    const app = new Switcher({
        target,
        props: {
            id: 'switcher'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'switcher');
});
