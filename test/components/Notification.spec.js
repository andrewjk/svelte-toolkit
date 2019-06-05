import test from 'ava';
import Notification from '../../src/components/Notification/Notification.svelte';

test('notification creation', t => {
    const target = document.createElement('div');
    const app = new Notification({
        target,
        props: {
            id: 'notification'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'notification');
});
