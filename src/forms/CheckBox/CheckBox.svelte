<script>
  import { getContext, createEventDispatcher } from "svelte";

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

  export let validator = null;

  let originalType = type;
  let setValue = null;

  const dispatch = createEventDispatcher();

  // Register this item with the parent Field (if applicable), which will let us know when we are invalid
  const context = getContext("field");
  if (context) {
    value = context.fieldValue;
    setValue = context.fieldSetValue;
    checked = context.fieldChecked;
    group = context.fieldGroup;
    name = context.fieldName;
    validator = context.fieldValidator;
    context.registerInput(setValid);
  }

  function setValid(valid) {
    type = valid ? originalType : "danger";
  }

  function handleChange(e) {
    if (setValue) {
      setValue(value);
    }
    dispatch("change", e.target.checked);
  }

  function handleBlur(e) {
    if (validator) {
      validator.validate();
    }
    dispatch("onblur", e);
  }
</script>

<label {id} class={['checkbox', type, className].concat(classNames).filter(Boolean).join(' ')}>
  <input {name} type="checkbox" {value} bind:group bind:checked on:change={handleChange} on:blur={handleBlur} />
  <span>{label}</span>
</label>
