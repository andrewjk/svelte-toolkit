import { render } from '@testing-library/svelte';

import Button from '../../src/components/Button/Button.svelte';

test('button creation', () => {
    const { container, getByText } = render(Button, { id: 'button' });

    expect(container.querySelector('#button')).toBeInTheDocument();
});
