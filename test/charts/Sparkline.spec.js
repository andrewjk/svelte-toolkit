import { render } from '@testing-library/svelte';

import Sparkline from '../../src/charts/Sparkline/Sparkline.svelte';

test('sparkline creation', () => {
    const { container, getByText } = render(Sparkline, { id: 'sparkline' });

    expect(container.querySelector('#sparkline')).toBeInTheDocument();
});
