import { render } from '@testing-library/svelte';

import TagInput from '../../src/components/TagInput/TagInput.svelte';
import TagInputItem from '../../src/components/TagInput/TagInputItem.svelte';

test('taginput creation', () => {
    const { container, getByText } = render(TagInput, { id: 'taginput' });

    expect(container.querySelector('#taginput')).toBeInTheDocument();
});
