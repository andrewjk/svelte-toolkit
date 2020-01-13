import { render } from '@testing-library/svelte';

import Table from '../../src/layout/Table/Table.svelte';

test('table creation', () => {
    const { container, getByText } = render(Table, { id: 'table' });

    expect(container.querySelector('#table')).toBeInTheDocument();
});
