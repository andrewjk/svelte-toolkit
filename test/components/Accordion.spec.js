import test from 'ava';
import Accordion from '../../src/components/Accordion/Accordion.svelte';
import AccordionItem from '../../src/components/Accordion/AccordionItem.svelte';

test('accordion creation', t => {
    const target = document.createElement('div');
    const app = new Accordion({
        target,
        props: {
            id: 'accordion'
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'accordion');
});
