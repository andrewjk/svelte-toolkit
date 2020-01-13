import { render } from '@testing-library/svelte';

import Accordion from '../../src/components/Accordion/Accordion.svelte';
import AccordionItem from '../../src/components/Accordion/AccordionItem.svelte';

test('accordion creation', () => {
    const { container, getByText } = render(Accordion, { id: 'accordion' });

    expect(container.querySelector('#accordion')).toBeInTheDocument();
});
