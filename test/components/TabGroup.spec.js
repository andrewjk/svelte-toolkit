import test from 'ava';
import TabGroup from '../../src/components/TabGroup/TabGroup.svelte';
import TabItem from '../../src/components/TabGroup/TabItem.svelte';

test('tab group creation', t => {
    const target = document.createElement('div');
    const app = new TabGroup({
        target,
        props: {
            id: 'tabgroup'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'tabgroup');
});
