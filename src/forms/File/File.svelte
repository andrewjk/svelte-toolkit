<script>
  import { getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let value = null;
  export let type = "";
  export let placeholder = "";
  export let accept = "";

  export let validator = null;

  let originalType = type;
  let setValue = null;

  const dispatch = createEventDispatcher();

  // Register this item with the parent Field (if applicable), which will let us know when we are invalid
  const context = getContext("field");
  if (context) {
    value = context.fieldValue;
    setValue = context.fieldSetValue;
    validator = context.fieldValidator;
    context.registerInput(setValid);
  }

  function setValid(valid) {
    type = valid ? originalType : "danger";
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
    // And make sure it's not too big
    value = files[0];
    if (setValue) {
      setValue(value);
    }
    dispatch("change", value);
  }
</script>

<style src="File.scss">

</style>

<label
  {id}
  class={['file', type, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  on:dragenter|stopPropagation|preventDefault={e => null}
  on:dragover|stopPropagation|preventDefault={e => null}
  on:drop|stopPropagation|preventDefault={e => handleDrop(e)}>
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
    on:blur />
  <span>
    <slot>
      {#if value}{value.name}{:else}{placeholder}{/if}
    </slot>
  </span>
</label>
