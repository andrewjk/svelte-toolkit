import { render } from '@testing-library/svelte';

import Page from '../../src/layout/Page/Page.svelte';

test('page creation', () => {
    const { container, getByText } = render(Page, { id: 'page' });

    expect(container.querySelector('#page')).toBeInTheDocument();
});
