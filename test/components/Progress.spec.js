import test from 'ava';
import Progress from '../../src/components/Progress/Progress.svelte';

test('progress creation', t => {
    const target = document.createElement('div');
    const app = new Progress({
        target,
        props: {
            id: 'progress'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'progress');
});
