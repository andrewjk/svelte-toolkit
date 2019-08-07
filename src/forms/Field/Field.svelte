<script>
  import { onMount, setContext, createEventDispatcher } from "svelte";
  import FieldMessage from "./FieldMessage.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let label = "";
  export let name = null;
  export let value = "";

  export let validator = null;
  export let required = false;
  export let minlength = 0;
  export let maxlength = 0;
  export let regex = null;
  export let compareTo = "";
  export let friendlyName = label || name;

  let errorMessage = false;
  let setInputValid = null;

  const dispatch = createEventDispatcher();

  // HACK: This seems like bad code, but I don't know how to pass props to items in slots
  setContext("field", {
    fieldSetValue: setValue,
    fieldName: name,
    fieldValidator: validator,
    fieldRequired: required,
    fieldMinlength: minlength,
    fieldMaxlength: maxlength,
    fieldRegex: regex,
    fieldCompareTo: compareTo,
    registerInput: setValid => {
      setInputValid = setValid;
    }
  });

  onMount(() => {
    // Make sure we have a validator if required
    const validate = required || minlength || maxlength || regex || compareTo;
    if (validate) {
      if (!name) {
        throw `Name required for input`;
      }
      if (!validator) {
        throw `Validator required for input '${name}'`;
      }
    }
    // Register all fields with the validator (to handle e.g. when they are being used to compare)
    if (validator) {
      validator.register(
        name,
        getValue,
        setValid,
        { required, minlength, maxlength, regex, compareTo },
        friendlyName
      );
    }
  });

  function setValue(inputValue) {
    value = inputValue;
  }

  function setValid(valid, message) {
    errorMessage = message;
    setInputValid(valid);
  }

  function getValue() {
    return value;
  }
</script>

<div {id} class={['field', className].concat(classNames).filter(Boolean).join(' ')}>
  <slot name="label">
    <label for={name}>{label}</label>
  </slot>
  <slot />
  {#if errorMessage}
    <FieldMessage content={errorMessage} type="danger" />
  {/if}
</div>
