
export default class Validator {

    constructor(start) {
        this.active = !!start;
        this.elements = [];
        this.messages = [];
    }

    register(name, getValue, options, friendlyName) {
        this.elements.push({ name, getValue, options, friendlyName });
    }

    validate() {
        if (this.active) {
            this.messages = [];
            this.elements.forEach((el) => {
                const value = el.getValue();
                // Short circuit checking so that we only get one error message per element
                this.checkRequired(el, value) &&
                    this.checkLength(el, value) &&
                    this.checkRegex(el, value) &&
                    this.checkCompareTo(el, value);
            });
        }
    }

    // TODO: Custom validation?
    // TODO: Custom error messages
    checkRequired(el, value) {
        if (el.options.required && !value) {
            const message = `${el.friendlyName || el.name} is required`;
            this.messages.push(message);
            return false;
        }
        return true;
    }

    checkLength(el, value) {
        if (el.options.minlength && !el.options.maxlength && value.length < el.options.minlength) {
            const message = `${el.friendlyName || el.name} must be at least ${el.options.minlength} characters`;
            this.messages.push(message);
            return false;
        } else if (el.options.maxlength && !el.options.minlength && value.length > el.options.maxlength) {
            const message = `${el.friendlyName || el.name} cannot be more than ${el.options.minlength} characters`;
            this.messages.push(message);
            return false;
        } else if (el.options.minlength && el.options.maxlength && (value.length < el.options.minlength || value.length > el.options.maxlength)) {
            const message = `${el.friendlyName || el.name} must be between ${el.options.minlength} and ${el.options.maxlength} characters`;
            this.messages.push(message);
            return false;
        }
        return true;
    }

    checkRegex(el, value) {
        if (el.options.regex && value && !el.options.regex.test(value)) {
            const message = `${el.friendlyName || el.name} is not valid`;
            this.messages.push(message);
            return false;
        }
        return true;
    }

    checkCompareTo(el, value) {
        if (el.options.compareTo) {
            const otherEl = this.elements.find((item) => item.name === el.options.compareTo);
            if (value !== otherEl.getValue()) {
                const message = `${el.friendlyName || el.name} must be the same as ${otherEl.friendlyName || otherEl.name}`;
                this.messages.push(message);
                return false;
            }
        }
        return true;
    }
}