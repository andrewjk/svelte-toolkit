import { render } from '@testing-library/svelte';

import Progress from '../../src/components/Progress/Progress.svelte';

test('progress creation', () => {
    const { container, getByText } = render(Progress, { id: 'progress' });

    expect(container.querySelector('#progress')).toBeInTheDocument();
});
