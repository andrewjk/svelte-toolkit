import test from 'ava';
import DropDown from '../../src/components/DropDown/DropDown.svelte';

test('dropdown creation', t => {
    const target = document.createElement('div');
    const app = new DropDown({
        target,
        props: {
            id: 'dropdown'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'dropdown');
});
