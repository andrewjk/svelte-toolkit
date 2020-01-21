import { render } from '@testing-library/svelte';

import BarChart from '../../src/charts/BarChart/BarChart.svelte';

beforeEach(() => {
    window.SVGElement.prototype.getBBox = () => ({
        x: 0,
        y: 0,
        width: 10,
        height: 10,
    });
});

afterEach(() => {
    delete window.SVGElement.prototype.getBBox;
});

test('barchart creation', () => {
    const { container, getByText } = render(BarChart, { id: 'barchart' });

    expect(container.querySelector('#barchart')).toBeInTheDocument();
});
