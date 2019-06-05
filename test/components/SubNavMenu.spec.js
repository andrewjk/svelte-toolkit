import test from 'ava';
import SubNavMenu from '../../src/components/SubNavMenu/SubNavMenu.svelte';
import SubNavMenuItem from '../../src/components/SubNavMenu/SubNavMenuItem.svelte';

test('subnav creation', t => {
    const target = document.createElement('div');
    const app = new SubNavMenu({
        target,
        props: {
            id: 'subnav'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'subnav');
});
