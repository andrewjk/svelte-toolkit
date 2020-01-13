import { render } from '@testing-library/svelte';

import TabGroup from '../../src/components/TabGroup/TabGroup.svelte';
import TabItem from '../../src/components/TabGroup/TabItem.svelte';

test('tab group creation', () => {
    const { container, getByText } = render(TabGroup, { id: 'tabgroup' });

    expect(container.querySelector('#tabgroup')).toBeInTheDocument();
});
