import { render } from '@testing-library/svelte';

import File from '../../src/forms/File/File.svelte';

test('file creation', () => {
    const { container, getByText } = render(File, { id: 'file' });

    expect(container.querySelector('#file')).toBeInTheDocument();
});
