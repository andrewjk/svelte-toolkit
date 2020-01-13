import { render } from '@testing-library/svelte';

import Validator from '../../src/forms/Validator.js';

// REQUIRED
// ========================================================

test('validator check required ok', () => {
    const validator = new Validator();
    const result = validator.checkRequired({ options: { required: true } }, 'ok');
    expect(result.valid).toBe(true);
});

test('validator check required empty string', () => {
    const validator = new Validator();
    const result = validator.checkRequired({ options: { required: true } }, '');
    expect(result.valid).toBe(false);
});

test('validator check required empty null', () => {
    const validator = new Validator();
    const result = validator.checkRequired({ options: { required: true } }, null);
    expect(result.valid).toBe(false);
});

test('validator check required undefined', () => {
    const validator = new Validator();
    const result = validator.checkRequired({ options: { required: true } }, undefined);
    expect(result.valid).toBe(false);
});
