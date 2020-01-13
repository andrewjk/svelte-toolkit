import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/svelte';

import Accordion from '../../../src/components/Accordion/Accordion.svelte';
import AccordionSpec from './AccordionSpec.svelte';

test('accordion creation', async () => {
    const { container, getByText } = render(Accordion, { id: 'accordion' });

    expect(container.querySelector('#accordion')).toBeInTheDocument();
});

test('accordion expanding', async () => {
    const { container, getByText, queryByText } = render(AccordionSpec);

    expect(queryByText('Body 1')).not.toBeInTheDocument();
    expect(queryByText('Body 2')).not.toBeInTheDocument();
    expect(queryByText('Body 3')).not.toBeInTheDocument();

    // Clicking header 1 should reveal body 1
    await fireEvent.click(getByText('Header 1'));
    expect(queryByText('Body 1')).toBeInTheDocument();

    // Clicking header 2 should hide body 1 and reveal body 2
    await fireEvent.click(getByText('Header 2'));
    await waitForElementToBeRemoved(() => queryByText('Body 1'))
    expect(queryByText('Body 1')).not.toBeInTheDocument();
    expect(queryByText('Body 2')).toBeInTheDocument();

    // Clicking header 2 again should hide body 2
    await fireEvent.click(getByText('Header 2'));
    await waitForElementToBeRemoved(() => queryByText('Body 2'))
    expect(queryByText('Body 2')).not.toBeInTheDocument();
});
