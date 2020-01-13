import { render } from '@testing-library/svelte';

import BarChart from '../../src/charts/BarChart/BarChart.svelte';
import BarChartItem from '../../src/charts/BarChart/BarChartItem.svelte';

test('barchart creation', () => {
    const { container, getByText } = render(BarChart, { id: 'barchart' });

    expect(container.querySelector('#barchart')).toBeInTheDocument();
});
