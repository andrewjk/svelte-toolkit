import test from 'ava';
import DatePicker from '../../src/components/DatePicker/DatePicker.svelte';

test('datepicker creation', t => {
    const target = document.createElement('div');
    const app = new DatePicker({
        target,
        props: {
            id: 'datepicker'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'datepicker');
});
