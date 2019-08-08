<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";
  import Minus from "../../icons/Minus.svelte";
  import Plus from "../../icons/Plus.svelte";

  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let type = "";
  export let value = 0;
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
    value = context.fieldValue;
    setValue = context.fieldSetValue;
    name = context.fieldName;
    validator = context.fieldValidator;
    context.registerInput(setValid);
  }

  function setValid(valid) {
    type = valid ? originalType : "danger";
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

<div
  {id}
  class={['number-input-container', type, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  class:focus>
  <input
    {name}
    class="number-input"
    bind:value
    type="number"
    bind:this={input}
    {min}
    {max}
    {readonly}
    on:change={e => handleChange(0)}
    on:keydown={handleInputKey}
    on:focus={handleInputFocus}
    on:blur={handleInputBlur} />
  {#if !readonly}
    <div class="number-button" on:click={e => handleChange(-1)}>
      <Minus />
    </div>
    <div class="number-button" on:click={e => handleChange(1)}>
      <Plus />
    </div>
  {/if}
</div>
