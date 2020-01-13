import { render } from '@testing-library/svelte';

import Container from '../../src/layout/Container/Container.svelte';

test('container creation', () => {
    const { container, getByText } = render(Container, { id: 'container' });

    expect(container.querySelector('#container')).toBeInTheDocument();
});
