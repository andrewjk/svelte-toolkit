import { render } from '@testing-library/svelte';

import ScatterChart from '../../src/charts/ScatterChart/ScatterChart.svelte';

test('scatterchart creation', () => {
    const { container, getByText } = render(ScatterChart, { id: 'scatterchart' });

    expect(container.querySelector('#scatterchart')).toBeInTheDocument();
});
