import { render } from '@testing-library/svelte';

import Notification from '../../src/components/Notification/Notification.svelte';

test('notification creation', () => {
    const { container, getByText } = render(Notification, { id: 'notification' });

    expect(container.querySelector('#notification')).toBeInTheDocument();
});
