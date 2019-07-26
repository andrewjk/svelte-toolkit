<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let contentType = "text";

  export let type = "";
  export let value = "";
  export let placeholder = "";
  export let autofocus = false;

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
    setValue = context.fieldSetValue;
    name = context.fieldName;
    validator = context.fieldValidator;
    maxlength = context.fieldMaxlength;
    context.registerInput(setValid);
  }

  function setValid(valid) {
    type = valid ? originalType : "danger";
  }

  function handleInput(e) {
    if (setValue) {
      setValue(value);
    }
    dispatch("change", e.target.value);
  }

  function handleBlur(e) {
    if (validator) {
      validator.validate();
    }
    dispatch("onblur", e);
  }
</script>

<!-- HACK: Can't use a dynamic type attribute so we have to make sure these all stay in sync! -->
{#if contentType === 'text'}
  <input
    {id}
    class={[type, className]
      .concat(classNames)
      .filter(Boolean)
      .join(' ')}
    {name}
    bind:this={input}
    bind:value
    type="text"
    {placeholder}
    maxlength={maxlength > 0 ? maxlength : 50000}
    on:keydown
    on:keyup
    on:keypress
    on:input={handleInput}
    on:blur={handleBlur} />
{:else if contentType === 'password'}
  <input
    {id}
    class={[type, className]
      .concat(classNames)
      .filter(Boolean)
      .join(' ')}
    {name}
    bind:this={input}
    bind:value
    type="password"
    {placeholder}
    maxlength={maxlength > 0 ? maxlength : 50000}
    on:keydown
    on:keyup
    on:keypress
    on:input={handleInput}
    on:blur={handleBlur} />
{:else if contentType === 'email'}
  <input
    {id}
    class={[type, className]
      .concat(classNames)
      .filter(Boolean)
      .join(' ')}
    {name}
    bind:this={input}
    bind:value
    type="email"
    {placeholder}
    maxlength={maxlength > 0 ? maxlength : 50000}
    on:keydown
    on:keyup
    on:keypress
    on:input={handleInput}
    on:blur={handleBlur} />
{:else if contentType === 'url'}
  <input
    {id}
    class={[type, className]
      .concat(classNames)
      .filter(Boolean)
      .join(' ')}
    {name}
    bind:this={input}
    bind:value
    type="url"
    {placeholder}
    maxlength={maxlength > 0 ? maxlength : 50000}
    on:keydown
    on:keyup
    on:keypress
    on:input={handleInput}
    on:blur={handleBlur} />
{:else if contentType === 'tel'}
  <input
    {id}
    class={[type, className]
      .concat(classNames)
      .filter(Boolean)
      .join(' ')}
    {name}
    bind:this={input}
    bind:value
    type="tel"
    {placeholder}
    maxlength={maxlength > 0 ? maxlength : 50000}
    on:keydown
    on:keyup
    on:keypress
    on:input={handleInput}
    on:blur={handleBlur} />
{/if}
