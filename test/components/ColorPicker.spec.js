import { render } from '@testing-library/svelte';

import ColorPicker from '../../src/components/ColorPicker/ColorPicker.svelte';

test('colorpicker creation', () => {
    const { container, getByText } = render(ColorPicker, { id: 'colorpicker' });

    expect(container.querySelector('#colorpicker')).toBeInTheDocument();
});
