import { render } from '@testing-library/svelte';

import OffScreen from '../../src/components/OffScreen/OffScreen.svelte';

test('offscreen creation', () => {
    const { container, getByText } = render(OffScreen, {
        id: 'offscreen',
        visible: true
    });

    expect(container.querySelector('#offscreen')).toBeInTheDocument();
});
