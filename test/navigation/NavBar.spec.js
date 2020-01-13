import { render } from '@testing-library/svelte';

import NavBar from '../../src/navigation/NavBar/NavBar.svelte';
import NavMenu from '../../src/navigation/NavBar/NavMenu.svelte';

test('navbar creation', () => {
    const { container, getByText } = render(NavBar, { id: 'navbar' });

    expect(container.querySelector('#navbar')).toBeInTheDocument();
});
