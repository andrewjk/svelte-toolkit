import test from 'ava';
import Alert from '../../src/components/Alert/Alert.svelte';

test('alert creation', t => {
    const target = document.createElement('div');
    const app = new Alert({
        target,
        props: {
            id: 'alert'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'alert');
});
