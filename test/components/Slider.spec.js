import { render } from '@testing-library/svelte';

import Slider from '../../src/components/Slider/Slider.svelte';

test('slider creation', () => {
    const { container, getByText } = render(Slider, { id: 'slider' });

    expect(container.querySelector('#slider')).toBeInTheDocument();
});
