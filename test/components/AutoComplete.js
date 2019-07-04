import test from 'ava';
import AutoComplete from '../../src/components/AutoComplete/AutoComplete.svelte';
import AutoCompleteItem from '../../src/components/AutoComplete/AutoCompleteItem.svelte';

test('autocomplete creation', t => {
    const target = document.createElement('div');
    const app = new AutoComplete({
        target,
        props: {
            id: 'autocomplete'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'autocomplete');
});
