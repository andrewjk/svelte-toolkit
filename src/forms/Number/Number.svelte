<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";
  import Minus from "../../icons/Minus";
  import Plus from "../../icons/Plus";

  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };

  export let type = "";
  export let value = null;
  export let placeholder = "";
  export let min = null;
  export let max = null;
  export let autofocus = false;
  export let readonly = false;

  export let validator = null;

  let focus = false;
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
    context.registerInput(setValid);
  }

  function setValid(newValid, newType) {
    if (newType) {
      type = newType;
    } else {
      type = newValid ? originalType : "danger";
    }
  }

  function handleChange(change) {
    if (readonly) {
      return;
    }

    value = value + change;
    if (setValue) {
      setValue(value);
    }
    dispatch("change", value);
  }

  function handleInputFocus(e) {
    focus = true;
  }

  function handleInputBlur(e) {
    focus = false;
    if (validator) {
      validator.validate();
    }
    dispatch("onblur", e);
  }

  function handleInputKey(e) {
    switch (e.keyCode) {
      case keyCodes.up: {
        e.preventDefault();
        handleChange(1);
        break;
      }
      case keyCodes.down: {
        e.preventDefault();
        handleChange(-1);
        break;
      }
    }
  }
</script>

<style src="Number.scss">

</style>

<div
  {id}
  class={['number-input-container', type, className].filter(Boolean).join(' ')}
  class:focus>
  <input
    type="number"
    {name}
    class="number-input"
    bind:this={input}
    bind:value
    {placeholder}
    {min}
    {max}
    {readonly}
    on:change={e => handleChange(0)}
    on:keydown={handleInputKey}
    on:focus={handleInputFocus}
    on:blur={handleInputBlur} />
  {#if !readonly}
    <div class="input-button" on:click={e => handleChange(-1)}>
      <slot name="down-button">
        <Minus />
      </slot>
    </div>
    <div class="input-button" on:click={e => handleChange(1)}>
      <slot name="up-button">
        <Plus />
      </slot>
    </div>
  {/if}
</div>
