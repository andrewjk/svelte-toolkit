import test from 'ava';
import Badge from '../../src/components/Badge/Badge.svelte';

test('badge creation', t => {
    const target = document.createElement('div');
    const app = new Badge({
        target,
        props: {
            id: 'badge'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'badge');
});
