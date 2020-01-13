import { render } from '@testing-library/svelte';

import Currency from '../../src/forms/Currency/Currency.svelte';

test('currency creation', () => {
    const { container, getByText } = render(Currency, { id: 'currency' });

    expect(container.querySelector('#currency')).toBeInTheDocument();
});
