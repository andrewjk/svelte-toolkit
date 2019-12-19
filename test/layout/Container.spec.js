import test from 'ava';
import Container from '../../src/layout/Container/Container.svelte';

test('container creation', t => {
    const target = document.createElement('div');
    const app = new Container({
        target,
        props: {
            id: 'container'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'container');
});
