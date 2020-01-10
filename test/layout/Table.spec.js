import test from 'ava';
import Table from '../../src/layout/Table/Table.svelte';

test('table creation', t => {
    const target = document.createElement('div');
    const app = new Table({
        target,
        props: {
            id: 'table'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'table');
});
