import { render } from '@testing-library/svelte';

import DatePicker from '../../src/components/DatePicker/DatePicker.svelte';

test('datepicker creation', () => {
    const { container, getByText } = render(DatePicker, { id: 'datepicker' });

    expect(container.querySelector('#datepicker')).toBeInTheDocument();
});
