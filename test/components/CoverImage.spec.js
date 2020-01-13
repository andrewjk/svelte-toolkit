import { render } from '@testing-library/svelte';

import CoverImage from '../../src/components/CoverImage/CoverImage.svelte';

test('coverimage creation', () => {
    const { container, getByText } = render(CoverImage, { id: 'coverimage' });

    expect(container.querySelector('#coverimage')).toBeInTheDocument();
});
