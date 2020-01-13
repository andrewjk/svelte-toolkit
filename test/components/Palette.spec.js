import { render } from '@testing-library/svelte';

import Palette from '../../src/components/Palette/Palette.svelte';

test('palette creation', () => {
    const { container, getByText } = render(Palette, { id: 'palette' });

    expect(container.querySelector('#palette')).toBeInTheDocument();
});
