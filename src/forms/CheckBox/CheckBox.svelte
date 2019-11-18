<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };
  export let classNames = [];

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
    value = context.fieldValue;
    setValue = context.fieldSetValue;
    checked = context.fieldChecked;
    group = context.fieldGroup;
    name = context.fieldName;
    validator = context.fieldValidator;
    context.registerInput(setValid, "checked");
  }

  function setValid(valid) {
    type = valid ? originalType : "danger";
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

<style src="CheckBox.scss" global>

</style>

<label
  {id}
  class={['checkbox', type, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  {#if group}
    <input
      class="checkbox-input"
      {name}
      type="checkbox"
      {value}
      bind:group
      bind:this={input}
      on:change={handleChange}
      on:blur={handleBlur} />
  {:else}
    <input
      class="checkbox-input"
      {name}
      type="checkbox"
      {value}
      bind:checked
      bind:this={input}
      on:change={handleChange}
      on:blur={handleBlur} />
  {/if}
  <span>
    <slot>{label}</slot>
  </span>
</label>
