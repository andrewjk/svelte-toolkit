<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };

  export let type = "";
  export let value = null;
  // https://www.currency-iso.org/dam/downloads/lists/list_one.xml
  export let format = "USD";
  export let placeholder = "";
  export let min = null;
  export let max = null;
  export let autofocus = false;
  export let readonly = false;

  export let validator = null;

  let input = null;
  let editing = false;
  let text = valueToCurrency(value);
  let originalType = type;
  let setValue = null;

  const dispatch = createEventDispatcher();

  onMount(() => {
    // We're manually focussing in onMount for two reasons:
    // 1. to avoid an overly-broad accessibility warning (there are instances where autofocus is desirable)
    // 2. to enable autofocus when an item is dynamically added to a page (e.g. adding a new item at the bottom of a list)
    if (autofocus) {
      input.focus();
    }
  });

  // Register this item with the parent Field (if applicable), which will let us know when we are invalid
  const context = getContext("field");
  if (context) {
    name = context.fieldName;
    type = context.fieldType;
    value = context.fieldValue;
    setValue = context.fieldSetValue;
    validator = context.fieldValidator;
    context.registerInput(setValid);
  }

  function setValid(newValid, newType) {
    if (newType) {
      type = newType;
    } else {
      type = newValid ? originalType : "danger";
    }
  }

  function handleInput(e) {
    value = stringToNumber(text);
    if (setValue) {
      setValue(value);
    }
    dispatch("change", e.target.value);
    dispatch("input", e);
  }

  let changingType = false;

  function handleFocus(e) {
    changingType = true;
    input.type = "number";
    text = value;
    dispatch("onfocus", e);
  }

  function handleBlur(e) {
    if (changingType) {
      input.focus();
      // HACK: Selecting all text is good when tabbing, but is a bit weird when clicking
      input.select();
      changingType = false;
    } else {
      text = valueToCurrency(text);
      input.type = "text";
    }
    if (validator) {
      validator.validate();
    }
    dispatch("onblur", e);
  }

  // Adapted from https://stackoverflow.com/a/54534797
  function stringToNumber(s) {
    return Number(String(s).replace(/[^0-9.-]+/g, ""));
  }

  function valueToCurrency(v) {
    const options = {
      maximumFractionDigits: 2,
      currency: format,
      style: "currency",
      currencyDisplay: "symbol",
    };
    return v ? stringToNumber(v).toLocaleString(undefined, options) : "";
  }
</script>

<input
  type="text"
  {id}
  class={["currency-input", type, className].filter(Boolean).join(" ")}
  {name}
  bind:this={input}
  bind:value={text}
  {placeholder}
  {min}
  {max}
  {readonly}
  on:keydown
  on:keyup
  on:keypress
  on:input={handleInput}
  on:focus={handleFocus}
  on:blur={handleBlur}
/>

<style src="Currency.scss">
</style>
