import test from 'ava';
import Calendar from '../../src/components/Calendar/Calendar.svelte';

test('calendar creation', t => {
    const target = document.createElement('div');
    const app = new Calendar({
        target,
        props: {
            id: 'calendar'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'calendar');
});
