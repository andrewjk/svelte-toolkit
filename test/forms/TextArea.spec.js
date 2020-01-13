import { render } from '@testing-library/svelte';

import TextArea from '../../src/forms/TextArea/TextArea.svelte';

test('textarea creation', () => {
    const { container, getByText } = render(TextArea, { id: 'textarea' });

    expect(container.querySelector('#textarea')).toBeInTheDocument();
});
