<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };

  export let type = "";
  export let value = "";
  export let rows = 4;
  export let placeholder = "";
  export let autofocus = false;
  export let readonly = false;

  export let validator = null;
  export let maxlength = 0;

  let input = null;
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
    maxlength = context.fieldMaxlength;
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
    if (setValue) {
      setValue(value);
    }
    dispatch("change", e.target.value);
    dispatch("input", e);
  }

  function handleBlur(e) {
    if (validator) {
      validator.validate();
    }
    dispatch("onblur", e);
  }
</script>

<textarea
  {id}
  class={[type, className].filter(Boolean).join(" ")}
  {name}
  bind:this={input}
  bind:value
  {rows}
  {placeholder}
  {readonly}
  maxlength={maxlength > 0 ? maxlength : null}
  on:keydown
  on:keyup
  on:keypress
  on:input={handleInput}
  on:focus
  on:blur={handleBlur}
/>
