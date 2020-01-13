import { render } from '@testing-library/svelte';

import AutoComplete from '../../src/components/AutoComplete/AutoComplete.svelte';
import AutoCompleteItem from '../../src/components/AutoComplete/AutoCompleteItem.svelte';

test('autocomplete creation', () => {
    const { container, getByText } = render(AutoComplete, { id: 'autocomplete' });

    expect(container.querySelector('#autocomplete')).toBeInTheDocument();
});
