import { render } from '@testing-library/svelte';

import Info from '../../src/dialogs/Info/Info.svelte';

test('info creation', () => {
    const { container, getByText } = render(Info, { id: 'info' });

    expect(container.querySelector('#info')).toBeInTheDocument();
});
