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

<style src="Radio.scss">
</style>
