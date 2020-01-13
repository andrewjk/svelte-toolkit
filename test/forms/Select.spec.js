import { render } from '@testing-library/svelte';

import Select from '../../src/forms/Select/Select.svelte';

test('select creation', () => {
    const { container, getByText } = render(Select, { id: 'select' });

    expect(container.querySelector('#select')).toBeInTheDocument();
});
