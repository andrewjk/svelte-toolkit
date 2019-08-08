import test from 'ava';
import ArrowDown from '../../src/icons/ArrowDown.svelte';

test('icon: arrow down creation', t => {
    const target = document.createElement('div');
    const app = new ArrowDown({
        target,
        props: {
            id: 'arrow-down'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'arrow-down');
});
