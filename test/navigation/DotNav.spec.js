import { render } from '@testing-library/svelte';

import DotNav from '../../src/navigation/DotNav/DotNav.svelte';

test('dot nav creation', () => {
    const { container, getByText } = render(DotNav, {
        id: 'dotnav',
        itemCount: 10
    });

    expect(container.querySelector('#dotnav')).toBeInTheDocument();
});
