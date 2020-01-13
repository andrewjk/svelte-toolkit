import { render } from '@testing-library/svelte';

import Grid from '../../src/layout/Grid/Grid.svelte';

test('grid creation', () => {
    const { container, getByText } = render(Grid, { id: 'grid' });

    expect(container.querySelector('#grid')).toBeInTheDocument();
});
