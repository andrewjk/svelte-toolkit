import test from 'ava';
import StoryNav from '../../src/components/StoryNav/StoryNav.svelte';

test('story nav creation', t => {
    const target = document.createElement('div');
    const app = new StoryNav({
        target,
        props: {
            id: 'storynav',
            itemCount: 10
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'storynav');
});
