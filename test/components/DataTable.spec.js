import { render } from '@testing-library/svelte';

import DataTable from '../../src/components/DataTable/DataTable.svelte';
import DataTableColumn from '../../src/components/DataTable/DataTableColumn.svelte';

test('table creation', () => {
    const { container, getByText } = render(DataTable, {
        id: 'table',
        items: [
            { name: 'a' },
            { name: 'b' },
            { name: 'c' }
        ]
    });

    expect(container.querySelector('#table')).toBeInTheDocument();
});
