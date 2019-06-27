
export default class Validator {

    constructor(start) {
        this.active = !!start;
        this.valid = false;
        this.elements = [];
        this.messageElements = [];
        this.checks = [
            this.checkRequired,
            this.checkLength,
            this.checkRegex,
            this.checkCompareTo
        ];
        this.messages = [];
    }

    register(name, getValue, setValid, options, friendlyName) {
        this.elements.push({ name, getValue, setValid, options, friendlyName });
    }

    validate() {
        if (this.active) {
            this.messages = [];
            for (let i = 0; i < this.elements.length; i++) {
                const el = this.elements[i];
                const value = el.getValue();
                let valid = true;
                let message = "";
                for (let j = 0; j < this.checks.length; j++) {
                    const result = this.checks[j].call(this, el, value);
                    valid = result.valid;
                    message = result.message;
                    if (message) {
                        this.messages.push(message);
                    }
                    if (!valid) {
                        break;
                    }
                }
                if (el.setValid) {
                    el.setValid(valid, message);
                }
            }
            this.valid = !this.messages.length;

            // HACK: I feel this should be possible to do with stores or context, but can't figure out how
            if (this.setValid) {
                this.setValid();
            }
        }
    }

    addMessage(message) {
        this.valid = false;
        this.messages.push(message);
        this.setValid();
    }

    // TODO: Custom validation?
    // TODO: Custom error messages
    checkRequired(el, value) {
        if (el.options.required && !value) {
            const message = `${el.friendlyName || el.name} is required`;
            return { valid: false, message };
        }
        return { valid: true };
    }

    checkLength(el, value) {
        if (el.options.minlength && !el.options.maxlength && value.length < el.options.minlength) {
            const message = `${el.friendlyName || el.name} must be at least ${el.options.minlength} characters`;
            return { valid: false, message };
        } else if (el.options.maxlength && !el.options.minlength && value.length > el.options.maxlength) {
            const message = `${el.friendlyName || el.name} cannot be more than ${el.options.minlength} characters`;
            return { valid: false, message };
        } else if (el.options.minlength && el.options.maxlength && (value.length < el.options.minlength || value.length > el.options.maxlength)) {
            const message = `${el.friendlyName || el.name} must be between ${el.options.minlength} and ${el.options.maxlength} characters`;
            return { valid: false, message };
        }
        return { valid: true };
    }

    checkRegex(el, value) {
        if (el.options.regex && !el.options.regex.test(value)) {
            const message = `${el.friendlyName || el.name} is not valid`;
            return { valid: false, message };
        }
        return { valid: true };
    }

    checkCompareTo(el, value) {
        if (el.options.compareTo) {
            const otherEl = this.elements.find((item) => item.name === el.options.compareTo);
            if (value !== otherEl.getValue()) {
                const message = `${el.friendlyName || el.name} must be the same as ${otherEl.friendlyName || otherEl.name}`;
                return { valid: false, message };
            }
        }
        return { valid: true };
    }
}