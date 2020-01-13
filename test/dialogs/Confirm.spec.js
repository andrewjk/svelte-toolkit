import { render } from '@testing-library/svelte';

import Confirm from '../../src/dialogs/Confirm/Confirm.svelte';

test('confirm creation', () => {
    const { container, getByText } = render(Confirm, { id: 'confirm' });

    expect(container.querySelector('#confirm')).toBeInTheDocument();
});
