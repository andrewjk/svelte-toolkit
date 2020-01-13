import { render } from '@testing-library/svelte';

import Pagination from '../../src/navigation/Pagination/Pagination.svelte';

test('pagination creation', () => {
    const { container, getByText } = render(Pagination, {
        id: 'pagination',
        itemCount: 100
    });

    expect(container.querySelector('#pagination')).toBeInTheDocument();
});
