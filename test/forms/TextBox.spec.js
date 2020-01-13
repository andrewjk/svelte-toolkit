import { render } from '@testing-library/svelte';

import TextBox from '../../src/forms/TextBox/TextBox.svelte';

test('textbox creation', () => {
    const { container, getByText } = render(TextBox, { id: 'textbox' });

    expect(container.querySelector('#textbox')).toBeInTheDocument();
});
