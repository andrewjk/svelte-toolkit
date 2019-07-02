import test from 'ava';
import BarChart from '../../src/charts/BarChart/BarChart.svelte';
import BarChartItem from '../../src/charts/BarChart/BarChartItem.svelte';

test('barchart creation', t => {
    const target = document.createElement('div');
    const app = new BarChart({
        target,
        props: {
            id: 'barchart'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'barchart');
});
