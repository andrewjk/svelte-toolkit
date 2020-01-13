import { render } from '@testing-library/svelte';

import Tag from '../../src/components/Tag/Tag.svelte';

test('tag creation', () => {
    const { container, getByText } = render(Tag, { id: 'tag' });

    expect(container.querySelector('#tag')).toBeInTheDocument();
});
