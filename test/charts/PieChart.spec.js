import { render } from '@testing-library/svelte';

import PieChart from '../../src/charts/PieChart/PieChart.svelte';
import PieChartItem from '../../src/charts/PieChart/PieChartItem.svelte';

test('piechart creation', () => {
    const { container, getByText } = render(PieChart, { id: 'piechart' });

    expect(container.querySelector('#piechart')).toBeInTheDocument();
});
