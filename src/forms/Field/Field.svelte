<script>
  import { onMount, setContext, createEventDispatcher } from "svelte";
  import FieldMessage from "./FieldMessage";

  export let id = null;
  export let name = null;
  export let className = null;

  export let label = "";
  export let value = "";

  export let validator = null;
  export let required = false;
  export let minlength = 0;
  export let maxlength = 0;
  export let regex = null;
  export let compareTo = "";
  export let friendlyName = "";

  let errorMessage = false;
  let setInputValid = null;

  const dispatch = createEventDispatcher();

  // HACK: This seems like bad code, but I don't know how to pass props to items in slots
  setContext("field", {
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
    if (required || minlength || maxlength) {
      if (!name) {
        throw `Name required for input`;
      }
      if (!validator) {
        throw `Validator required for input '${name}'`;
      }
    }
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

  function setValid(valid, message) {
    errorMessage = message;
    setInputValid(valid);
  }

  function getValue() {
    return value;
  }
</script>

<div class="field">
  <slot name="label">
    <label for={name}>{label}</label>
  </slot>
  <slot />
  {#if errorMessage}
    <FieldMessage content={errorMessage} type="danger" />
  {/if}
</div>
