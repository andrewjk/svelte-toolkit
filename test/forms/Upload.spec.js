import test from 'ava';
import Upload from '../../src/components/Upload/Upload.svelte';

test('upload creation', t => {
    const target = document.createElement('div');
    const app = new Upload({
        target,
        props: {
            id: 'upload'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'upload');
});
