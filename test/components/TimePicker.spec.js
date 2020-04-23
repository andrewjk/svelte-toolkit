import { render } from '@testing-library/svelte';

import TimePicker from '../../src/components/TimePicker/TimePicker.svelte';

test('timepicker creation', () => {
    const { container, getByText } = render(TimePicker, { id: 'timepicker' });

    expect(container.querySelector('#timepicker')).toBeInTheDocument();
});
