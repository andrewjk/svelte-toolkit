<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };

  export let label = "";
  export let type = "";
  export let checked = false;
  export let value = true;
  export let group = null;
  export let autofocus = false;

  export let validator = null;

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
    checked = context.fieldChecked;
    group = context.fieldGroup;
    setValue = context.fieldSetValue;
    validator = context.fieldValidator;
    context.registerInput(setValid, "checked");
  }

  function setValid(newValid, newType) {
    if (newType) {
      type = newType;
    } else {
      type = newValid ? originalType : "danger";
    }
  }

  function handleChange(e) {
    // For a checkbox, the value (which is used for validation, etc) is whether it's checked or not
    if (setValue) {
      setValue(checked);
    }
    dispatch("change", checked);
  }

  function handleBlur(e) {
    if (validator) {
      validator.validate();
    }
    dispatch("onblur", e);
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label {id} class={["checkbox", type, className].filter(Boolean).join(" ")}>
  {#if group}
    <input
      class="checkbox-input"
      {name}
      type="checkbox"
      {value}
      bind:group
      bind:this={input}
      on:change={handleChange}
      on:blur={handleBlur}
    />
  {:else}
    <input
      class="checkbox-input"
      {name}
      type="checkbox"
      {value}
      bind:checked
      bind:this={input}
      on:change={handleChange}
      on:blur={handleBlur}
    />
  {/if}
  <span>
    <slot>{label}</slot>
  </span>
</label>

<style>
  /* These styles were automatically generated from CheckBox.scss */
  .checkbox:hover .checkbox-input + span:before {
    border-color: var(--select-color, #3396ff);
  }

  .checkbox-input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  .checkbox-input + span:before {
    background-color: white;
    border: 1px solid var(--light-border-color, #aaa);
    border-radius: var(--border-radius, 2px);
    content: "\00a0";
    display: inline-block;
    height: 1.5rem;
    line-height: 1.5rem;
    margin-right: 0.6rem;
    padding: 1px;
    width: 1.5rem;
  }

  .checkbox-input:checked + span:before {
    content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g><path d="M10,40 L35,65 L90,10" fill="none" stroke="%23222" stroke-width="15" /></g></svg>');
  }

  .checkbox-input:focus + span:before {
    border-color: var(--focus-color, #8fc5ff);
    box-shadow: 0px 0px 1px var(--select-color, #3396ff);
  }

  .checkbox.primary .checkbox-input:checked + span:before,
  .checkbox.info .checkbox-input:checked + span:before,
  .checkbox.success .checkbox-input:checked + span:before,
  .checkbox.warning .checkbox-input:checked + span:before,
  .checkbox.danger .checkbox-input:checked + span:before {
    border: 1px solid rgba(0, 0, 0, 0.06);
    content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g><path d="M10,40 L35,65 L90,10" fill="none" stroke="white" stroke-width="15" /></g></svg>');
  }

  .checkbox.primary {
    color: var(--primary-color, #fd3f92);
  }

  .checkbox.primary .checkbox-input + span:before {
    border-color: var(--primary-color, #fd3f92);
  }

  .checkbox.primary .checkbox-input:checked + span:before {
    background-color: var(--primary-color, #fd3f92);
  }

  .checkbox.primary .checkbox-input:focus + span:before {
    box-shadow: 0px 0px 2px var(--primary-color, #fd3f92);
  }

  .checkbox.info {
    color: var(--info-color, #4d90fe);
  }

  .checkbox.info .checkbox-input + span:before {
    border-color: var(--info-color, #4d90fe);
  }

  .checkbox.info .checkbox-input:checked + span:before {
    background-color: var(--info-color, #4d90fe);
  }

  .checkbox.info .checkbox-input:focus + span:before {
    box-shadow: 0px 0px 2px var(--info-color, #4d90fe);
  }

  .checkbox.success {
    color: var(--success-color, #00a852);
  }

  .checkbox.success .checkbox-input + span:before {
    border-color: var(--success-color, #00a852);
  }

  .checkbox.success .checkbox-input:checked + span:before {
    background-color: var(--success-color, #00a852);
  }

  .checkbox.success .checkbox-input:focus + span:before {
    box-shadow: 0px 0px 2px var(--success-color, #00a852);
  }

  .checkbox.warning {
    color: var(--warning-color, #f3c42e);
  }

  .checkbox.warning .checkbox-input + span:before {
    border-color: var(--warning-color, #f3c42e);
  }

  .checkbox.warning .checkbox-input:checked + span:before {
    background-color: var(--warning-color, #f3c42e);
  }

  .checkbox.warning .checkbox-input:focus + span:before {
    box-shadow: 0px 0px 2px var(--warning-color, #f3c42e);
  }

  .checkbox.danger {
    color: var(--danger-color, #ee2e24);
  }

  .checkbox.danger .checkbox-input + span:before {
    border-color: var(--danger-color, #ee2e24);
  }

  .checkbox.danger .checkbox-input:checked + span:before {
    background-color: var(--danger-color, #ee2e24);
  }

  .checkbox.danger .checkbox-input:focus + span:before {
    box-shadow: 0px 0px 2px var(--danger-color, #ee2e24);
  }
</style>
