import test from 'ava';
import Tag from '../../src/components/Tag/Tag.svelte';

test('tag creation', t => {
    const target = document.createElement('div');
    const app = new Tag({
        target,
        props: {
            id: 'tag'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'tag');
});
