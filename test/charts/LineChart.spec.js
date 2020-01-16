import { render } from '@testing-library/svelte';

import LineChart from '../../src/charts/LineChart/LineChart.svelte';

test('linechart creation', () => {
    const { container, getByText } = render(LineChart, { id: 'linechart' });

    expect(container.querySelector('#linechart')).toBeInTheDocument();
});
