import { render } from '@testing-library/svelte';

import Prompt from '../../src/dialogs/Prompt/Prompt.svelte';

test('prompt creation', () => {
    const { container, getByText } = render(Prompt, { id: 'prompt' });

    expect(container.querySelector('#prompt')).toBeInTheDocument();
});
