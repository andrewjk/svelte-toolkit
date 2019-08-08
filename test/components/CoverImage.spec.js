import test from 'ava';
import CoverImage from '../../src/components/CoverImage/CoverImage.svelte';

test('coverimage creation', t => {
    const target = document.createElement('div');
    const app = new CoverImage({
        target,
        props: {
            id: 'coverimage'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'coverimage');
});
