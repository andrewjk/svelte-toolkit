import { render } from '@testing-library/svelte';

import DropDownButton from '../../src/components/DropDownButton/DropDownButton.svelte';

test('dropdownbutton creation', () => {
    const { container, getByText } = render(DropDownButton, { id: 'dropdownbutton' });

    expect(container.querySelector('#dropdownbutton')).toBeInTheDocument();
});
