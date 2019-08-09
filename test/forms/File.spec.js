import test from 'ava';
import File from '../../src/components/File/File.svelte';

test('file creation', t => {
    const target = document.createElement('div');
    const app = new File({
        target,
        props: {
            id: 'file'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'file');
});
