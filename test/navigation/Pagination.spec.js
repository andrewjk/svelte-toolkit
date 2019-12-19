import test from 'ava';
import Pagination from '../../src/navigation/Pagination/Pagination.svelte';

test('pagination creation', t => {
    const target = document.createElement('div');
    const app = new Pagination({
        target,
        props: {
            id: 'pagination',
            itemCount: 100
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'pagination');
});
