import { render } from '@testing-library/svelte';

import FocusGroup from '../../src/components/FocusGroup/FocusGroup.svelte';

test('focusgroup creation', () => {
    const { container, getByText } = render(FocusGroup, { id: 'focusgroup' });

    expect(container.querySelector('#focusgroup')).toBeInTheDocument();
});
