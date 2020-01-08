import test from 'ava';
import DataTable from '../../src/components/DataTable/DataTable.svelte';
import DataTableColumn from '../../src/components/DataTable/DataTableColumn.svelte';

test('table creation', t => {
    const target = document.createElement('div');
    const app = new DataTable({
        target,
        props: {
            id: 'table',
            items: [
                { name: 'a' },
                { name: 'b' },
                { name: 'c' }
            ]
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'table');
});
