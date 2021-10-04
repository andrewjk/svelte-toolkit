<script>
  import { getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };

  export let value = null;
  export let type = "";
  export let placeholder = "";
  export let accept = "";

  export let validator = null;

  let originalType = type;
  let setValue = null;

  let enteredValue = null;

  $: maybeClearValue(value);

  const dispatch = createEventDispatcher();

  // Register this item with the parent Field (if applicable), which will let us know when we are invalid
  const context = getContext("field");
  if (context) {
    value = context.fieldValue;
    enteredValue = value;
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

  function handleDrop(e) {
    const files = e.dataTransfer.files;
    handleFiles(files);
  }

  function handleInput(e) {
    const files = e.target.files;
    handleFiles(files);
  }

  function handleFiles(files) {
    // TODO: Handle multiple files, if we can be bothered
    // And background upload, per the bottom of https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
    value = files[0];
    enteredValue = value;
    if (setValue) {
      setValue(value);
    }
    if (validator) {
      validator.validate();
    }
    dispatch("change", value);
  }

  function maybeClearValue(newValue) {
    // If the image has been cleared by setting value = null, re-run validation to clear any size errors
    if (!newValue && enteredValue) {
      enteredValue = value;
      if (setValue) {
        setValue(value);
      }
      if (validator) {
        validator.validate();
      }
    }
  }
</script>

<label
  {id}
  class={["file", type, className].filter(Boolean).join(" ")}
  on:dragenter|stopPropagation|preventDefault={(e) => null}
  on:dragover|stopPropagation|preventDefault={(e) => null}
  on:drop|stopPropagation|preventDefault={(e) => handleDrop(e)}
>
  <input
    class="file-input"
    {name}
    type="file"
    {accept}
    on:keydown
    on:keyup
    on:keypress
    on:input={handleInput}
    on:focus
    on:blur
  />
  <span>
    <slot>
      {#if value}{value.name}{:else}{placeholder}{/if}
    </slot>
  </span>
</label>

<style src="File.scss">
</style>
