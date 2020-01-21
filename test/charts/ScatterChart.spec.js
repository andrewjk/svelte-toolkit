import { render } from '@testing-library/svelte';

import ScatterChart from '../../src/charts/ScatterChart/ScatterChart.svelte';

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

test('scatterchart creation', () => {
    const { container, getByText } = render(ScatterChart, { id: 'scatterchart' });

    expect(container.querySelector('#scatterchart')).toBeInTheDocument();
});
