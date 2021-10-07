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

<style>
  /* These styles were automatically generated from File.scss */
  .file {
    background-color: var(--light-back-color, #fafafa);
    border: 1px dashed var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    padding: 0 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .file:hover {
    cursor: pointer;
  }

  .file.primary :global(a),
  .file.primary :global(a:hover),
  .file.info :global(a),
  .file.info :global(a:hover),
  .file.success :global(a),
  .file.success :global(a:hover),
  .file.warning :global(a),
  .file.warning :global(a:hover),
  .file.danger :global(a),
  .file.danger :global(a:hover) {
    color: var(--info-color, #4d90fe);
    text-decoration: underline;
  }

  .file.primary {
    color: var(--light-primary-text-color, #f4036c);
    border: 1px dashed var(--light-primary-border-color, #fd3f92);
    background-color: var(--light-primary-color, #fff5fa);
  }

  .file.info {
    color: var(--light-info-text-color, #0563fe);
    border: 1px dashed var(--light-info-border-color, #4d90fe);
    background-color: var(--light-info-color, #f6f9ff);
  }

  .file.success {
    color: var(--light-success-text-color, #008340);
    border: 1px dashed var(--light-success-border-color, #00a852);
    background-color: var(--light-success-color, #eefff6);
  }

  .file.warning {
    color: var(--light-warning-text-color, #b28a0a);
    border: 1px dashed var(--light-warning-border-color, #f3c42e);
    background-color: var(--light-warning-color, #fefcf5);
  }

  .file.danger {
    color: var(--light-danger-text-color, #c6180f);
    border: 1px dashed var(--light-danger-border-color, #ee2e24);
    background-color: var(--light-danger-color, #fef5f4);
  }

  .file-input {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute !important;
    white-space: nowrap;
    width: 1px;
  }

  .file-input:focus + span {
    text-decoration: underline;
  }
</style>
