<script>
  import { getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };

  export let label = "";
  export let type = "";
  export let checked = false;

  export let validator = null;

  let setValue = null;

  const dispatch = createEventDispatcher();

  // Register this item with the parent Field (if applicable), which will let us know when we are invalid
  const context = getContext("field");
  if (context) {
    setValue = context.fieldSetValue;
    name = context.fieldName;
    validator = context.fieldValidator;
    context.registerInput(setValid);
  }

  function setValid(valid) {
    type = valid ? "" : "danger";
  }

  function handleChange(e) {
    if (setValue) {
      setValue(value);
    }
    dispatch("change", e);
  }

  function handleBlur(e) {
    if (validator) {
      validator.validate();
    }
    dispatch("onblur", e);
  }
</script>

<label {id} class={['checkbox', type, className].filter(Boolean).join(' ')}>
  <input {name} bind:checked type="checkbox" on:change={handleChange} on:blur={handleBlur} />
  <span>{label}</span>
</label>
