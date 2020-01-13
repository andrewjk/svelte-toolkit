import { render } from '@testing-library/svelte';

import Field from '../../src/forms/Field/Field.svelte';

test('field creation', () => {
    const { container, getByText } = render(Field, { id: 'field' });

    expect(container.querySelector('#field')).toBeInTheDocument();
});
