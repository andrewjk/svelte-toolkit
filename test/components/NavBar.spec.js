import test from 'ava';
import NavBar from '../../src/components/NavBar/NavBar.svelte';
import NavMenu from '../../src/components/NavBar/NavMenu.svelte';

test('navbar creation', t => {
    const target = document.createElement('div');
    const app = new NavBar({
        target,
        props: {
            id: 'navbar'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'navbar');
});
