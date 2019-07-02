import test from 'ava';
import PieChart from '../../src/charts/PieChart/PieChart.svelte';
import PieChartItem from '../../src/charts/PieChart/PieChartItem.svelte';

test('piechart creation', t => {
    const target = document.createElement('div');
    const app = new PieChart({
        target,
        props: {
            id: 'piechart'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'piechart');
});
