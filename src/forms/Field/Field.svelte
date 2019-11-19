<script>
  import { onMount, setContext, createEventDispatcher } from "svelte";
  import FieldMessage from "./FieldMessage";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let label = "";
  export let name = null;
  export let value = "";
  export let checked = false;
  export let group = null;

  export let validator = null;
  export let required = false;
  export let minlength = 0;
  export let maxlength = 0;
  export let regex = null;
  export let compareTo = "";
  export let maxsize = 0;
  export let friendlyName = label || name;

  let errorMessage = false;
  let setInputValid = null;
  let inputValueProp = null;

  const dispatch = createEventDispatcher();

  // HACK: This seems like bad code, but I don't know how to pass props to items in slots
  setContext("field", {
    fieldValue: value,
    fieldChecked: checked,
    fieldGroup: group,
    fieldSetValue: setValue,
    fieldName: name,
    fieldValidator: validator,
    fieldRequired: required,
    fieldMinlength: minlength,
    fieldMaxlength: maxlength,
    fieldMaxSize: maxlength,
    fieldRegex: regex,
    fieldCompareTo: compareTo,
    registerInput: (setValid, valueProp) => {
      setInputValid = setValid;
      inputValueProp = valueProp;
    }
  });

  onMount(() => {
    // Make sure we have a validator if required
    const validate = required || minlength || maxlength || regex || compareTo || maxsize;
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
        { required, minlength, maxlength, regex, compareTo, maxsize },
        friendlyName
      );
    }
  });

  function setValue(inputValue) {
    switch (inputValueProp) {
      case "checked": {
        checked = inputValue;
        break;
      }
      case "group": {
        group = inputValue;
        break;
      }
      default: {
        value = inputValue;
        break;
      }
    }
  }

  function getValue() {
    switch (inputValueProp) {
      case "checked": {
        return checked;
        break;
      }
      case "group": {
        return group;
        break;
      }
      default: {
        return value;
        break;
      }
    }
  }

  function setValid(valid, message) {
    errorMessage = message;
    setInputValid(valid);
  }
</script>

<style src="Field.scss">

</style>

<div {id} class={['field', className].concat(classNames).filter(Boolean).join(' ')}>
  <slot name="label">
    <label for={name}>{label}</label>
  </slot>
  <slot />
  {#if errorMessage}
    <FieldMessage content={errorMessage} type="danger" />
  {/if}
</div>
