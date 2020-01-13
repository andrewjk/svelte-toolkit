import { render } from '@testing-library/svelte';

import Number from '../../src/forms/Number/Number.svelte';

test('number creation', () => {
    const { container, getByText } = render(Number, { id: 'number' });

    expect(container.querySelector('#number')).toBeInTheDocument();
});
