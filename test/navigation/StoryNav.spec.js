import { render } from '@testing-library/svelte';

import StoryNav from '../../src/navigation/StoryNav/StoryNav.svelte';

test('story nav creation', () => {
    const { container, getByText } = render(StoryNav, {
        id: 'storynav',
        itemCount: 10
    });

    expect(container.querySelector('#storynav')).toBeInTheDocument();
});
