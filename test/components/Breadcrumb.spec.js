import test from 'ava';
import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb.svelte';
import BreadcrumbItem from '../../src/components/Breadcrumb/BreadcrumbItem.svelte';

test('breadcrumb creation', t => {
    const target = document.createElement('div');
    const app = new Breadcrumb({
        target,
        props: {
            id: 'breadcrumb'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'breadcrumb');
});
