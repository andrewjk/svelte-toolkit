import { render } from '@testing-library/svelte';

import Panel from '../../src/layout/Panel/Panel.svelte';

test('panel creation', () => {
    const { container, getByText } = render(Panel, { id: 'panel' });

    expect(container.querySelector('#panel')).toBeInTheDocument();
});
