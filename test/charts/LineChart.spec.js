import { render } from '@testing-library/svelte';

import LineChart from '../../src/charts/LineChart/LineChart.svelte';
import LineChartSeries from '../../src/charts/LineChart/LineChartSeries.svelte';

test('barchart creation', () => {
    const { container, getByText } = render(LineChart, { id: 'barchart' });

    expect(container.querySelector('#barchart')).toBeInTheDocument();
});
