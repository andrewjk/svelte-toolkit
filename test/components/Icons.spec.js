import { render } from '@testing-library/svelte';

import ArrowDown from '../../src/icons/ArrowDown.svelte';

test('icon: arrow down creation', () => {
    const { container, getByText } = render(ArrowDown, { id: 'arrow-down' });

    expect(container.querySelector('#arrow-down')).toBeInTheDocument();
});
