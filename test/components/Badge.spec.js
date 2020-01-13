import { render } from '@testing-library/svelte';

import Badge from '../../src/components/Badge/Badge.svelte';

test('badge creation', () => {
    const { container, getByText } = render(Badge, { id: 'badge' });

    expect(container.querySelector('#badge')).toBeInTheDocument();
});
