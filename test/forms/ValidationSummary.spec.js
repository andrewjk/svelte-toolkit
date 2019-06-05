import test from 'ava';
import ValidationSummary from '../../src/forms/ValidationSummary/ValidationSummary.svelte';
import Validator from '../../src/forms/Validator.js';

test('validation summary creation', t => {
    const validator = new Validator();
    validator.messages = ['this is not ok'];

    const target = document.createElement('div');
    const app = new ValidationSummary({
        target,
        props: {
            id: 'validationsummary',
            validator
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'validationsummary');
});
