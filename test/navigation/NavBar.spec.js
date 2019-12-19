import test from 'ava';
import NavBar from '../../src/navigation/NavBar/NavBar.svelte';
import NavMenu from '../../src/navigation/NavBar/NavMenu.svelte';

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
