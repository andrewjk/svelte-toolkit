<script>
  import { getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  export let className = null;
  export let contentType = "text";

  export let type = "";
  export let value = "";

  export let validator = null;
  export let maxlength = 0;

  let originalType = type;

  const dispatch = createEventDispatcher();

  // Register this item with the parent Field (if applicable), which will let us know when we are invalid
  const context = getContext("field");
  if (context) {
    name = context.fieldName;
    validator = context.fieldValidator;
    maxlength = context.fieldMaxlength;
    context.registerInput(setValid);
  }

  function setValid(valid) {
    type = valid ? originalType : "danger";
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
    class={[type, className].filter(Boolean).join(' ')}
    {name}
    bind:value
    type="text"
    maxlength={maxlength > 0 ? maxlength : 50000}
    on:blur={handleBlur} />
{:else if contentType === 'password'}
  <input
    {id}
    class={[type, className].filter(Boolean).join(' ')}
    {name}
    bind:value
    type="password"
    maxlength={maxlength > 0 ? maxlength : 50000}
    on:blur={handleBlur} />
{:else if contentType === 'email'}
  <input
    {id}
    class={[type, className].filter(Boolean).join(' ')}
    {name}
    bind:value
    type="email"
    maxlength={maxlength > 0 ? maxlength : 50000}
    on:blur={handleBlur} />
{:else if contentType === 'url'}
  <input
    {id}
    class={[type, className].filter(Boolean).join(' ')}
    {name}
    bind:value
    type="url"
    maxlength={maxlength > 0 ? maxlength : 50000}
    on:blur={handleBlur} />
{:else if contentType === 'tel'}
  <input
    {id}
    class={[type, className].filter(Boolean).join(' ')}
    {name}
    bind:value
    type="tel"
    maxlength={maxlength > 0 ? maxlength : 50000}
    on:blur={handleBlur} />
{/if}
