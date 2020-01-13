import { render } from '@testing-library/svelte';

import CheckBox from '../../src/forms/CheckBox/CheckBox.svelte';

test('checkbox creation', () => {
    const { container, getByText } = render(CheckBox, { id: 'checkbox' });

    expect(container.querySelector('#checkbox')).toBeInTheDocument();
});
