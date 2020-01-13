import { render } from '@testing-library/svelte';

import DropDown from '../../src/components/DropDown/DropDown.svelte';

test('dropdown creation', () => {
    const { container, getByText } = render(DropDown, { id: 'dropdown' });

    expect(container.querySelector('#dropdown')).toBeInTheDocument();
});
