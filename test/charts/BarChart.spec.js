import { render } from '@testing-library/svelte';

import BarChart from '../../src/charts/BarChart/BarChart.svelte';

test('barchart creation', () => {
    const { container, getByText } = render(BarChart, { id: 'barchart' });

    expect(container.querySelector('#barchart')).toBeInTheDocument();
});
