import { render } from '@testing-library/svelte';

import DropDownLink from '../../src/components/DropDownLink/DropDownLink.svelte';

test('dropdownlink creation', () => {
    const { container, getByText } = render(DropDownLink, { id: 'dropdownlink' });

    expect(container.querySelector('#dropdownlink')).toBeInTheDocument();
});
