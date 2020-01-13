import { render } from '@testing-library/svelte';

import Calendar from '../../src/components/Calendar/Calendar.svelte';

test('calendar creation', () => {
    const { container, getByText } = render(Calendar, { id: 'calendar' });

    expect(container.querySelector('#calendar')).toBeInTheDocument();
});
