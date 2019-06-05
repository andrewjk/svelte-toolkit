import test from 'ava';
import Validator from '../../src/forms/Validator.js';

// REQUIRED
// ========================================================

test('validator check required ok', t => {
    const validator = new Validator();
    const result = validator.checkRequired({ options: { required: true } }, 'ok');
    t.is(result.valid, true);
});

test('validator check required empty string', t => {
    const validator = new Validator();
    const result = validator.checkRequired({ options: { required: true } }, '');
    t.is(result.valid, false);
});

test('validator check required empty null', t => {
    const validator = new Validator();
    const result = validator.checkRequired({ options: { required: true } }, null);
    t.is(result.valid, false);
});

test('validator check required undefined', t => {
    const validator = new Validator();
    const result = validator.checkRequired({ options: { required: true } }, undefined);
    t.is(result.valid, false);
});
