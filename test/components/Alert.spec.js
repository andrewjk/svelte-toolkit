import { render } from '@testing-library/svelte';

import Alert from '../../src/components/Alert/Alert.svelte';

test('alert creation', () => {
    const { container, getByText } = render(Alert, { id: 'alert' });

    expect(container.querySelector('#alert')).toBeInTheDocument();
});
