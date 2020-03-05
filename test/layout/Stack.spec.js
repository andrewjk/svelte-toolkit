import { render } from '@testing-library/svelte';

import Stack from '../../src/layout/Stack/Stack.svelte';

test('stack creation', () => {
    const { container, getByText } = render(Stack, { id: 'stack' });

    expect(container.querySelector('#stack')).toBeInTheDocument();
});
