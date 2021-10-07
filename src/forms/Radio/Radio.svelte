<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };

  export let label = "";
  export let type = "";
  export let value = "";
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
    group = context.fieldGroup;
    setValue = context.fieldSetValue;
    validator = context.fieldValidator;
    context.registerInput(setValid, "group");
  }

  function setValid(newValid, newType) {
    if (newType) {
      type = newType;
    } else {
      type = newValid ? originalType : "danger";
    }
  }

  function handleChange(e) {
    // For a radio, the value (which is used for validation, etc) is the value of its group
    if (setValue) {
      setValue(group);
    }
    dispatch("change", group);
  }

  function handleBlur(e) {
    if (validator) {
      validator.validate();
    }
    dispatch("onblur", e);
  }
</script>

<label {id} class={["radio", type, className].filter(Boolean).join(" ")}>
  <input
    class="radio-input"
    {name}
    type="radio"
    {value}
    bind:group
    bind:this={input}
    on:change={handleChange}
    on:blur={handleBlur}
  />
  <span>
    <slot>{label}</slot>
  </span>
</label>

<style>
  /* These styles were automatically generated from Radio.scss */
  .radio:hover .radio-input + span:before {
    border-color: var(--select-color, #3396ff);
  }

  .radio-input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  .radio-input + span:before {
    background-color: white;
    border: 1px solid var(--light-border-color, #aaa);
    border-radius: 50%;
    content: "\00a0";
    display: inline-block;
    height: 1.5rem;
    line-height: 1.5rem;
    margin-right: 0.6rem;
    padding: 0 1px;
    width: 1.5rem;
  }

  .radio-input:checked + span:before {
    content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g><circle cx="50" cy="50" r="30" fill="%23222" /></g></svg>');
  }

  .radio-input:focus + span:before {
    border-color: var(--focus-color, #8fc5ff);
    box-shadow: 0px 0px 1px var(--select-color, #3396ff);
  }

  .radio.primary .radio-input:checked + span:before,
  .radio.info .radio-input:checked + span:before,
  .radio.success .radio-input:checked + span:before,
  .radio.warning .radio-input:checked + span:before,
  .radio.danger .radio-input:checked + span:before {
    border: 1px solid rgba(0, 0, 0, 0.06);
    content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g><circle cx="50" cy="50" r="30" fill="white" /></g></svg>');
  }

  .radio.primary {
    color: var(--primary-color, #fd3f92);
  }

  .radio.primary .radio-input + span:before {
    border-color: var(--primary-color, #fd3f92);
  }

  .radio.primary .radio-input:checked + span:before {
    background-color: var(--primary-color, #fd3f92);
  }

  .radio.primary .radio-input:focus + span:before {
    box-shadow: 0px 0px 2px var(--primary-color, #fd3f92);
  }

  .radio.info {
    color: var(--info-color, #4d90fe);
  }

  .radio.info .radio-input + span:before {
    border-color: var(--info-color, #4d90fe);
  }

  .radio.info .radio-input:checked + span:before {
    background-color: var(--info-color, #4d90fe);
  }

  .radio.info .radio-input:focus + span:before {
    box-shadow: 0px 0px 2px var(--info-color, #4d90fe);
  }

  .radio.success {
    color: var(--success-color, #00a852);
  }

  .radio.success .radio-input + span:before {
    border-color: var(--success-color, #00a852);
  }

  .radio.success .radio-input:checked + span:before {
    background-color: var(--success-color, #00a852);
  }

  .radio.success .radio-input:focus + span:before {
    box-shadow: 0px 0px 2px var(--success-color, #00a852);
  }

  .radio.warning {
    color: var(--warning-color, #f3c42e);
  }

  .radio.warning .radio-input + span:before {
    border-color: var(--warning-color, #f3c42e);
  }

  .radio.warning .radio-input:checked + span:before {
    background-color: var(--warning-color, #f3c42e);
  }

  .radio.warning .radio-input:focus + span:before {
    box-shadow: 0px 0px 2px var(--warning-color, #f3c42e);
  }

  .radio.danger {
    color: var(--danger-color, #ee2e24);
  }

  .radio.danger .radio-input + span:before {
    border-color: var(--danger-color, #ee2e24);
  }

  .radio.danger .radio-input:checked + span:before {
    background-color: var(--danger-color, #ee2e24);
  }

  .radio.danger .radio-input:focus + span:before {
    box-shadow: 0px 0px 2px var(--danger-color, #ee2e24);
  }
</style>
