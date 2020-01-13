import { render } from '@testing-library/svelte';

import Switcher from '../../src/navigation/Switcher/Switcher.svelte';
import SwitcherItem from '../../src/navigation/Switcher/SwitcherItem.svelte';

test('switcher creation', () => {
    const { container, getByText } = render(Switcher, { id: 'switcher' });

    expect(container.querySelector('#switcher')).toBeInTheDocument();
});
