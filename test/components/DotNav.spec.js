import test from 'ava';
import DotNav from '../../src/components/DotNav/DotNav.svelte';

test('dot nav creation', t => {
    const target = document.createElement('div');
    const app = new DotNav({
        target,
        props: {
            id: 'dotnav',
            itemCount: 10
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'dotnav');
});
