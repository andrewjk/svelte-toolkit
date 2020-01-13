import { render } from '@testing-library/svelte';

import DialogButton from '../../src/dialogs/DialogButton/DialogButton.svelte';

test('dialog button creation', () => {
    const { container, getByText } = render(DialogButton, { id: 'dialogbutton' });

    expect(container.querySelector('#dialogbutton')).toBeInTheDocument();
});
