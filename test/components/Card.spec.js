import { render } from '@testing-library/svelte';

import Card from '../../src/components/Card/Card.svelte';

test('card creation', () => {
    const { container, getByText } = render(Card, { id: 'card' });

    expect(container.querySelector('#card')).toBeInTheDocument();
});
