import test from 'ava';
import LineChart from '../../src/charts/LineChart/LineChart.svelte';
import LineChartSeries from '../../src/charts/LineChart/LineChartSeries.svelte';

test('barchart creation', t => {
    const target = document.createElement('div');
    const app = new LineChart({
        target,
        props: {
            id: 'barchart'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'barchart');
});
