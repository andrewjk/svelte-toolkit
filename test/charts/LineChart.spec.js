import { render } from '@testing-library/svelte';

import LineChart from '../../src/charts/LineChart/LineChart.svelte';

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

test('linechart creation', () => {
    const { container, getByText } = render(LineChart, { id: 'linechart' });

    expect(container.querySelector('#linechart')).toBeInTheDocument();
});
