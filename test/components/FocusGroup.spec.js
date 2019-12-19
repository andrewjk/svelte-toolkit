import test from 'ava';
import FocusGroup from '../../src/components/FocusGroup/FocusGroup.svelte';

test('focusgroup creation', t => {
    const target = document.createElement('div');
    const app = new FocusGroup({
        target,
        props: {
            id: 'focusgroup'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'focusgroup');
});
