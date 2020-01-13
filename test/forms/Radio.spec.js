import { render } from '@testing-library/svelte';

import Radio from '../../src/forms/Radio/Radio.svelte';

test('radio creation', () => {
    const { container, getByText } = render(Radio, { id: 'radio' });

    expect(container.querySelector('#radio')).toBeInTheDocument();
});
