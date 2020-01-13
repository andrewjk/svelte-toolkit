import { render } from '@testing-library/svelte';

import ValidationSummary from '../../src/forms/ValidationSummary/ValidationSummary.svelte';
import Validator from '../../src/forms/Validator.js';

test('validation summary creation', () => {
    const validator = new Validator();
    validator.messages = ['this is not ok'];

    const { container, getByText } = render(ValidationSummary, {
        id: 'validationsummary',
        validator
    });

    expect(container.querySelector('#validationsummary')).toBeInTheDocument();
});
