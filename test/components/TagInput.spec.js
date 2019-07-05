import test from 'ava';
import TagInput from '../../src/components/TagInput/TagInput.svelte';
import TagInputItem from '../../src/components/TagInput/TagInputItem.svelte';

test('taginput creation', t => {
    const target = document.createElement('div');
    const app = new TagInput({
        target,
        props: {
            id: 'taginput'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'taginput');
});
