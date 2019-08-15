import test from 'ava';
import Table from '../../src/components/Table/Table.svelte';
import TableColumn from '../../src/components/Table/TableColumn.svelte';

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
