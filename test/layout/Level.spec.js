import { render } from '@testing-library/svelte';

import Level from '../../src/layout/Level/Level.svelte';

test('level creation', () => {
    const { container, getByText } = render(Level, { id: 'level' });

    expect(container.querySelector('#level')).toBeInTheDocument();
});
