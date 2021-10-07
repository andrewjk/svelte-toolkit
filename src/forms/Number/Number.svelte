<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";
  import Minus from "../../icons/Minus/Minus.svelte";
  import Plus from "../../icons/Plus/Plus.svelte";

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

<div
  {id}
  class={["number-input-container", type, className].filter(Boolean).join(" ")}
  class:focus
>
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
    on:change={(e) => handleChange(0)}
    on:keydown={handleInputKey}
    on:focus={handleInputFocus}
    on:blur={handleInputBlur}
  />
  {#if !readonly}
    <div class="input-button" on:click={(e) => handleChange(-1)}>
      <slot name="down-button">
        <Minus />
      </slot>
    </div>
    <div class="input-button" on:click={(e) => handleChange(1)}>
      <slot name="up-button">
        <Plus />
      </slot>
    </div>
  {/if}
</div>

<style>
  /* These styles were automatically generated from Number.scss */
  .input-button {
    color: var(--label-text-color, #777);
    cursor: pointer;
    line-height: var(--input-height, 3.2rem);
    width: 2.6rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .input-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .number-input-container {
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    display: flex;
  }

  .number-input-container.focus {
    border: 1px solid var(--focus-color, #8fc5ff);
    box-shadow: 0px 0px 1px var(--select-color, #3396ff);
  }

  .number-input-container.primary {
    border-color: var(--primary-color, #fd3f92);
  }

  .number-input-container.primary.focus {
    box-shadow: 0px 0px 2px var(--primary-color, #fd3f92);
  }

  .number-input-container.info {
    border-color: var(--info-color, #4d90fe);
  }

  .number-input-container.info.focus {
    box-shadow: 0px 0px 2px var(--info-color, #4d90fe);
  }

  .number-input-container.success {
    border-color: var(--success-color, #00a852);
  }

  .number-input-container.success.focus {
    box-shadow: 0px 0px 2px var(--success-color, #00a852);
  }

  .number-input-container.warning {
    border-color: var(--warning-color, #f3c42e);
  }

  .number-input-container.warning.focus {
    box-shadow: 0px 0px 2px var(--warning-color, #f3c42e);
  }

  .number-input-container.danger {
    border-color: var(--danger-color, #ee2e24);
  }

  .number-input-container.danger.focus {
    box-shadow: 0px 0px 2px var(--danger-color, #ee2e24);
  }

  input.number-input {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    border: 0;
    height: var(--input-height, 3.2rem);
    margin: 0;
    padding: 0 4px;
    width: 100%;
  }

  input.number-input::-webkit-inner-spin-button,
  input.number-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input.number-input:focus {
    box-shadow: none;
    border: 0;
  }
</style>
