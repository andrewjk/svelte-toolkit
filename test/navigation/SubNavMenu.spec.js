import { render } from '@testing-library/svelte';

import SubNavMenu from '../../src/navigation/SubNavMenu/SubNavMenu.svelte';
import SubNavMenuItem from '../../src/navigation/SubNavMenu/SubNavMenuItem.svelte';

test('subnav creation', () => {
    const { container, getByText } = render(SubNavMenu, { id: 'subnav' });

    expect(container.querySelector('#subnav')).toBeInTheDocument();
});
