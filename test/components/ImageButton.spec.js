import { render } from '@testing-library/svelte';

import ImageButton from '../../src/components/ImageButton/ImageButton.svelte';

test('imagebutton creation', () => {
    const { container, getByText } = render(ImageButton, { id: 'imagebutton' });

    expect(container.querySelector('#imagebutton')).toBeInTheDocument();
});
